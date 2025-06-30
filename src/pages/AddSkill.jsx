import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addSkill } from "../features/auth/authSlice"

function AddSkill() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [success, setSuccess] = useState(false)

  const dispatch = useDispatch() 
  const user = useSelector((state) => state.auth.user)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !description) {
      alert("Please fill in all fields")
      return
    }

    // 👇 Ye data future me backend ya Redux me bheja jaa sakta hai
    const newSkill = { title, description }

    dispatch(addSkill(newSkill))

    const updatedUser = {
      ...user,
      skills: [...(user.skills || []), newSkill],
    }

    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser))

    setSuccess(true)
    setTitle("")
    setDescription("")
  }

  return (
    <div className="min-h-screen bg-darkbg text-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded w-full max-w-lg"
      >
        <h2 className="text-2xl mb-4">➕ Add New Skill</h2>

        <input
          type="text"
          placeholder="Skill Title"
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Skill Description"
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white h-32"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded"
        >
          Submit
        </button>

        {success && (
          <p className="text-green-400 mt-4">Skill added successfully!</p>
        )}
      </form>
    </div>
  )
}

export default AddSkill
