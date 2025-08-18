import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Forgotpassword from "./pages/Forgotpassword"
import Resetpassword from "./pages/Resetpassword"
import Dashboard from "./pages/Dashboard"


function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>}/> 
       <Route path="/register" element={<Signup/>}/> 
       <Route path="/forgotpass" element={<Forgotpassword/>}/>
       <Route path="/resetpass/:email" element={<Resetpassword/>}/>
       <Route path="/dashboard/:id" element={<Dashboard/>}/>
    </Routes>
    </>
  )
}

export default App
