import { Routes, Route } from "react-router-dom"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Main from "./components/Main"
import Error from "./components/Error"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Dashboard from "./components/Dashboard"
import { useState } from "react"
import About from "./components/About"

function App() {
  const [login, setLogin] = useState("login");

  return (
    <>
      <Header login = {login} setLogin={setLogin}/>
    <Routes>
      <Route path="/signup" element = {<SignUp/>} />
      <Route path= "/login" element = {<Login/>} />
      <Route path= "/" element = {<Main login = {login} setLogin={setLogin}/>} />
      <Route path= "/dashboard" element= {<Dashboard/>}/>
      <Route path= "/about" element = {<About/>}/>
      <Route path="*" element = {<Error/>} />
    </Routes>
      <Footer />
    </>
  )
}

export default App
