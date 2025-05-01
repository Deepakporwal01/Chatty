 import Login from "./Pages/Login";
 import Signup from "./Pages/Signup";
 import Home from "./Pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
// import {VideoCall} from "./Components/VideoCall/VideoCall";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
function App() {
 const {authUser} = useAuthContext();

  return (
    <>
     <div className="   max-h-screen max-w-screen overflow-hidden flex  items-center justify-center">
    
      <Routes>
<Route path="/" element={authUser ? <Home/> : <Navigate to="/login"/>}/>
<Route path="/login" element={ authUser ? <Navigate to = "/" />:<Login/>}/> 
<Route path="/signup" element={authUser ? <Navigate to = "/" />: <Signup/>}/>
      </Routes>
      {/* <VideoCall/> */}
      <Toaster/>
     </div>
   

   
    </>
  )
}

export default App
