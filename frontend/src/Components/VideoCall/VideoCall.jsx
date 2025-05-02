import React, { useEffect, useRef, useState } from "react";
import { useSocketContext } from "../../../context/SocketContext.jsx";
import ReactPlayer from "react-player";

const VideoCall = ({ currentUserId, receiverId }) => {
  const { socket } = useSocketContext();

  const [isCalling, setIsCalling] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    // Get user media on mount
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStreamRef.current = stream;
        setLocalStream(stream);
      });

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Incoming call
    socket.on("incomingCall", async ({ from, signal }) => {
      await setupPeer(false);
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(signal));

      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);

      socket.emit("acceptCall", { to: from, signal: answer });
    });

    socket.on("callAccepted", async (answer) => {
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("iceCandidate", async (candidate) => {
      if (peerConnectionRef.current) {
        try {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error("Error adding received ice candidate", err);
        }
      }
    });

    socket.on("callEnded", () => {
      endCall();
    });

    return () => {
      socket.off("incomingCall");
      socket.off("callAccepted");
      socket.off("iceCandidate");
      socket.off("callEnded");
    };
  }, [socket]);

  const setupPeer = async (isCaller) => {
    peerConnectionRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });

    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("iceCandidate", { to: receiverId, candidate: event.candidate });
      }
    };

    peerConnectionRef.current.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    localStreamRef.current.getTracks().forEach((track) => {
      peerConnectionRef.current.addTrack(track, localStreamRef.current);
    });

    if (isCaller) {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socket.emit("callUser", {
        from: currentUserId,
        to: receiverId,
        signal: offer,
      });
    }
  };

  const callUser = async () => {
    setIsCalling(true);
    await setupPeer(true);
  };

  const endCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    socket.emit("endCall", { to: receiverId });
    setIsCalling(false);
    setRemoteStream(null); // Clear remote stream
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Local video */}
      {localStream && (
        <ReactPlayer
          url={localStream}
          playing
          muted
          controls={false}
          width="300px"
          height="200px"
          pip={false}
          className="border"
        />
      )}

      {/* Remote video */}
      {remoteStream && (
        <ReactPlayer
          url={remoteStream}
          playing
          controls={false}
          width="300px"
          height="200px"
          pip={false}
          className="border"
        />
      )}

      {!isCalling ? (
        <button onClick={callUser} className="bg-blue-500 text-white px-4 py-2 rounded">
          Call
        </button>
      ) : (
        <button onClick={endCall} className="bg-red-500 text-white px-4 py-2 rounded">
          End Call
        </button>
      )}
    </div>
  );
};

export default VideoCall;
