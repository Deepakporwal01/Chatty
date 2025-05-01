import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";

// ✅ Replace with your backend URL
const socket = io("http://localhost:4000");

const VideoCall = ({ myId, receiverId, closeCall }) => {
  const [stream, setStream] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const [caller, setCaller] = useState(null);
  const [callerSignal, setCallerSignal] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  const myVideo = useRef();
  const userVideo = useRef();

  useEffect(() => {
    // ✅ Get Camera & Mic Access
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) myVideo.current.srcObject = currentStream;

        // ✅ If User is the Caller, Initiate Call
        if (receiverId) {
          console.log("📞 Initiating Call to:", receiverId);
          startCall(receiverId, currentStream);
        }
      })
      .catch((err) => console.error("🚨 Error accessing media devices:", err));

    // ✅ Listen for Incoming Calls
    socket.on("incomingCall", ({ from, signal }) => {
      console.log("📞 Incoming Call from:", from);
      setIncomingCall(true);
      setCaller(from);
      setCallerSignal(signal);
    });

    socket.on("callEnded", () => {
      console.log("🔴 Call Ended by Other User");
      endCall();
    });

    return () => {
      socket.off("incomingCall");
      socket.off("callEnded");
    };
  }, []);

  // ✅ Start a Call as Caller
  const startCall = (receiverId, stream) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (signal) => {
      console.log("📡 Sending Call Offer to:", receiverId);
      socket.emit("callUser", { from: myId, to: receiverId, signal });
    });

    peer.on("stream", (userStream) => {
      if (userVideo.current) userVideo.current.srcObject = userStream;
    });

    setPeerConnection(peer);
  };

  // ✅ Accept the Incoming Call
  const acceptCall = () => {
    setCallAccepted(true);
    setIncomingCall(false);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (signal) => {
      console.log("✅ Accepting Call from:", caller);
      socket.emit("acceptCall", { to: caller, signal });
    });

    peer.on("stream", (userStream) => {
      if (userVideo.current) userVideo.current.srcObject = userStream;
    });

    peer.signal(callerSignal);
    setPeerConnection(peer);
  };

  // ❌ Reject the Incoming Call
  const rejectCall = () => {
    console.log("❌ Call Rejected");
    setIncomingCall(false);
    setCaller(null);
  };

  // 🔴 End the Call
  const endCall = () => {
    if (peerConnection) peerConnection.destroy();
    socket.emit("endCall", { to: receiverId || caller });
    closeCall(); // Close UI
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white p-4 rounded-lg">
      <h2 className="text-lg font-semibold">Video Call</h2>

      {/* 📞 Incoming Call UI */}
      {incomingCall && (
        <div className="absolute top-20 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
          <p>📞 Incoming Call...</p>
          <button className="bg-green-500 px-4 py-2 m-2 rounded" onClick={acceptCall}>
            Accept ✅
          </button>
          <button className="bg-red-500 px-4 py-2 m-2 rounded" onClick={rejectCall}>
            Reject ❌
          </button>
        </div>
      )}

      {/* 📷 Video Section */}
      <div className="flex gap-4 mt-4">
        {/* My Video */}
        <video ref={myVideo} playsInline autoPlay className="w-48 h-32 border border-white rounded" />

        {/* Other User's Video */}
        {callAccepted && <video ref={userVideo} playsInline autoPlay className="w-48 h-32 border border-white rounded" />}
      </div>

      {/* 🔴 End Call Button */}
      {callAccepted && (
        <button onClick={endCall} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
          End Call 🔴
        </button>
      )}
    </div>
  );
};

export default VideoCall;
