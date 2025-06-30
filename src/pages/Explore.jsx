import { useEffect, useState } from "react"
import ContactModal from "../components/ContactModal"

function Explore() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("")

  const [contactUser, setContactUser] = useState(null)


  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || []
    setUsers(allUsers)
  }, [])

  const filteredUsers = users.filter(user => {
    const nameMatch = user.username.toLowerCase().includes(searchTerm.toLowerCase())

    const skillMatch = user.skills?.some(skill =>
      skill.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const dropdownMatch = selectedSkill === "" || user.skills?.some(skill => skill.title.toLowerCase() === selectedSkill)

    return (nameMatch || skillMatch) && dropdownMatch
  })

  const skillList = users.flatMap(user =>
  user.skills?.map(skill => skill.title.toLowerCase()) || []
)


  const uniqueSkills = [...new Set(skillList)]


  return (
    <div className="min-h-screen bg-darkbg text-white p-6">
      <h2 className="text-3xl mb-6 font-bold text-center">🔍 Explore Skills & Users</h2>

      <div className="max-w-xl mx-auto mb-8  space-y-4">
        <input
          type="text"
          placeholder="Search by username or skill..."
          className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-green-500"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedSkill}
          onChange={e => setSelectedSkill(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 rounded w-full"
        >
          <option value="">-- Filter by Skill --</option>
          {uniqueSkills.map((skill, i) => (
            <option key={i} value={skill}>{skill}</option>
          ))}
        </select>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-2">{user.username}</h3>
            <p className="mb-2 text-gray-400">📧 {user.email}</p>

            <h4 className="font-semibold mb-1">Skills:</h4>
            <ul className="list-disc list-inside text-gray-300">
              {user.skills && user.skills.length > 0 ? (
                user.skills.map((skill, i) => (
                  <li key={i}>
                    <strong>{skill.title}:</strong> {skill.description}
                  </li>
                ))
              ) : (
                <li>No skills added</li>
              )}
            </ul>

            {/* Optional Contact Button */}
            <button
              onClick={() => setContactUser(user)}
              className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              📩 Contact
            </button>

          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-400 mt-6">No users found.</p>
      )}

      {
        contactUser && (
          <ContactModal
          recipient={contactUser}
          onClose={() => setContactUser(null)}
          />
        )
      }
    </div>
  )
}

export default Explore
