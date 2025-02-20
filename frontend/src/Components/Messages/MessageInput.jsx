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
            console.log(input);
            setInput(""); // ✅ Clear input after sending
        }
    };

    return (
        <form className="px-4 my-7" onSubmit={submitHandler}>
            <div className="w-full relative">
                <input
                    type="text"
                    className="border text-sm rounded-lg block w-full p-3 bg-gray-700 border-gray-600 text-white"
                    placeholder="Send a message"
                    onChange={inputHandler}
                    value={input}
                />
                <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
                    <BsSend />
                </button>
            </div>
        </form>
    );
};

export default MessageInput;
