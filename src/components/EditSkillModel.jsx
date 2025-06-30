
import { useState, useEffect } from "react"

function EditSkillModal({ skill, index, onClose, onSave }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (skill) {
      setTitle(skill.title)
      setDescription(skill.description)
    }
  }, [skill])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !description) return alert("Fields cannot be empty")
    onSave(index, { title, description })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 text-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl mb-4">✏️ Edit Skill</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-3 p-2 rounded bg-gray-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full mb-3 p-2 rounded bg-gray-700 h-28"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditSkillModal
