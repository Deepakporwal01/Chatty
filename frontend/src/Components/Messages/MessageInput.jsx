import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage.js";

const MessageInput = () => {
    const { sendMessage } = useSendMessage();
    const [input, setInput] = useState("");

    const inputHandler = (e) => {
        setInput(e.target.value); 
    };  
 
    const submitHandler = (e) => {
        e.preventDefault(); // ✅ Prevent form refresh
        if (input.trim() !== "") {
            sendMessage(input);
            setInput(""); // ✅ Clear input after sending
        }
    };

    return (
     <form className="lg:px-2 lg:my-2 relative">
    <div className="relative">
        <input
            type="text"
            className=" bottom-0 z-10 border text-md rounded-lg w-full p-4 lg:p-3 mx-5  bg-gray-700 border-gray-600 text-white"
            placeholder="Send a message"
            onChange={inputHandler}
            value={input}
        />
        <button
            type="submit"
            className="absolute right-3 bottom-3 flex items-center text-white text-2xl"
            onClick={submitHandler}
        >
            <BsSend />
        </button>
    </div>
</form>

    );
};

export default MessageInput;
