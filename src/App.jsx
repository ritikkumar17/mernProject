import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import SignUp from "./pages/Signup"
import { Routes ,Route } from "react-router-dom"
import Task from "./pages/Task"



function App() {
 

  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path= "/dashboard" element={<Dashboard/>}/>
      <Route path="/tasks/:id" element={<Task/>}/>
    </Routes>
    {/* <Login/>
    <SignUp/> */}
    </>
  )
}

export default App
