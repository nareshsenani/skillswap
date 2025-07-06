import { useSelector, useDispatch } from "react-redux"
import { logout, updateUserSkills } from "../features/auth/authSlice"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import EditSkillModal from "../components/EditSkillModel"
import  {Trash} from "lucide-react"
function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, user } = useSelector((state) => state.auth)

  const [editIndex, setEditIndex] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleEdit = (index) => {
    setEditIndex(index)
    setShowModal(true)
  }

  const handleSave = (index, updatedSkill) => {
    const updatedSkills = [...user.skills]
    updatedSkills[index] = updatedSkill
    dispatch(updateUserSkills(updatedSkills))

    const updatedUser = { ...user, skills: updatedSkills }
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser))

    const allUsers = JSON.parse(localStorage.getItem("users")) || []
    const updatedUsers = allUsers.map(u =>
      u.username === user.username ? updatedUser : u
    )
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    setShowModal(false)
  }

  const handleDelete = (index) => {
    const updatedSkills = [...user.skills]
    updatedSkills.splice(index, 1)
    dispatch(updateUserSkills(updatedSkills))

    const updatedUser = { ...user, skills: updatedSkills }
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser))

    const allUsers = JSON.parse(localStorage.getItem("users")) || []
    const updatedUsers = allUsers.map(u =>
      u.username === user.username ? updatedUser : u
    )
    localStorage.setItem("users", JSON.stringify(updatedUsers))
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-darkbg text-white">
        <p className="text-xl">Please log in to view your profile.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-darkbg text-white p-4 py-10">
      {showModal && (
        <EditSkillModal
          skill={user.skills[editIndex]}
          index={editIndex}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

      <div className="bg-gray-800 p-6 rounded w-full max-w-4xl mx-auto">
        <h2 className="text-2xl mb-2">👋 Welcome, {user.username}</h2>
        <p className="mb-4"><strong>Email:</strong> {user.email || "Not Provided"}</p>

        <div className="mt-4">
          <h3 className="text-xl mb-4">Your Skills</h3>

          {(!user.skills || user.skills.length === 0) ? (
            <p className="text-gray-400">No skills added yet.</p>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
              {user.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-4 rounded-lg shadow-md flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-white">{skill.title.toUpperCase()}</h4>
                    <p className="text-gray-300">{skill.description}</p>
                  </div>
                  <div className="flex mt-4 space-x-4">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-yellow-400 hover:text-yellow-300"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-400 hover:text-red-300"
                      title="Delete"
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mt-8">
          <Link
            to="/add-skill"
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
          >
            ➕ Go to Add Skill
          </Link>

          <Link
            to="/dashboard"
            className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded text-white"
          >
            📊 Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Profile
