import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="bg-darkbg min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl mb-6">Welcome to SkillSwap</h1>
      <div className="space-x-4">
        <Link to="/login">
          <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded">Login</button>
        </Link>
        <Link to="/register">
          <button className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded">Register</button>
        </Link>
      </div>
    </div>
  )
}

export default Home
