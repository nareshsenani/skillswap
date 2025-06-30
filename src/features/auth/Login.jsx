import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "./authSlice"
import { useNavigate } from "react-router-dom"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const storedUsers = JSON.parse(localStorage.getItem("users")) || []
    

    const matchedUser = storedUsers.find(
      user => user.username === username && user.password === password
    )

    if (matchedUser) {
      dispatch(login(matchedUser))

      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser))

      navigate("/profile")
    } else {
      alert("Invalid credentials")
    }



  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkbg text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded w-full max-w-sm">
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
