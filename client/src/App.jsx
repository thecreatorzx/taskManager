import { Routes, Route } from "react-router-dom"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Main from "./components/Main"
import Error from "./components/Error"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Dashboard from "./components/Dashboard"
import { useState, useEffect } from "react"
import About from "./components/About"
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  const [login, setLogin] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/auth/me')
        setLogin(true)
      } catch {
        setLogin(false)
      } finally {
        setChecking(false)
      }
    }
    checkAuth()
  }, [])
  return (
    <>
      <Header login={login} setLogin={setLogin}/>
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login login={login} setLogin={setLogin}/>} />
        <Route path="/" element={<Main login={login} setLogin={setLogin}/>} />
        <Route path="/dashboard" element={
          <ProtectedRoute login={login}>
            <Dashboard/>
          </ProtectedRoute>
        }/>
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<Error/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
