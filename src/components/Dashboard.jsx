import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function Dashboard() {
  const { user } = useSelector((state) => state.auth)
  const skills = user?.skills || []
  const recentSkill = skills.length > 0 ? skills[skills.length - 1] : null

  return (
    <div className="min-h-screen bg-darkbg text-white p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">📊 Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Total Skills Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">🧠 Total Skills</h3>
          <p className="text-3xl">{skills.length}</p>
        </div>

        {/* Recent Skill Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">🕒 Recent Added Skill</h3>
          {recentSkill ? (
            <p>
              <span className="font-bold">{recentSkill.title}</span> - {recentSkill.description}
            </p>
          ) : (
            <p>No skills added yet.</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Link
          to="/add-skill"
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded text-center"
        >
          ➕ Add New Skill
        </Link>
        <Link
          to="/profile"
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded text-center"
        >
          👤 Go to Profile
        </Link>
      </div>
    </div>
  )
}

export default Dashboard

