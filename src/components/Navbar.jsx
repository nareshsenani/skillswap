import { Link, useNavigate, NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../features/auth/authSlice"

function Navbar() {
  const { isLoggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("loggedInUser")
    navigate("/login")
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center sticky top-0">
      <Link to="/" className="text-2xl font-bold text-blue-400">
        SkillSwap
      </Link>

      <div className="flex gap-4 items-center">
        <NavLink to="/" className={ ({isActive}) => isActive ? "text-blue-500 font-semibold" :"hover:text-blue-400" }>Home</NavLink>

        {!isLoggedIn && (
          <>
            <Link to="/login" className="hover:text-blue-400">Login</Link>
            <Link to="/register" className="hover:text-blue-400">Register</Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <NavLink to="/explore" className={({isActive}) => isActive ? "text-blue-500 font-semibold" : "hover:text-blue-400"}>Explore</NavLink>

            <NavLink to="/profile" className={({isActive}) => isActive? "text-blue-500 font-semibold" : "hover:text-blue-400"}>Profile</NavLink>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
