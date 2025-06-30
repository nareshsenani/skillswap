import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

function Register() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const existingUser = JSON.parse(localStorage.getItem("users")) || []

    const emailExist = existingUser.some(user => user.email === data.email)

    if (emailExist) {
      alert("User already registered. Please login.")
      return
    }

    const updatedUsers = [...existingUser, { ...data, skills: [] }]
    
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    alert("Registered successfully! Now you can login.")

    navigate("/login")

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkbg text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-6 rounded w-full max-w-sm">
        <h2 className="text-2xl mb-4">Register</h2>

        <input
          {...register("username", { required: "Username is required" })}
          placeholder="Username"
          className="w-full p-2 mb-2 rounded bg-gray-700"
        />
        {errors.username && <p className="text-red-500 text-sm mb-2">{errors.username.message}</p>}

        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          placeholder="Email"
          className="w-full p-2 mb-2 rounded bg-gray-700"
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

        <input
          type="password"
          {...register("password", { required: "Password is required", minLength: 6 })}
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-700"
        />
        {errors.password && <p className="text-red-500 text-sm mb-2">Password must be at least 6 characters</p>}

        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 p-2 rounded">
          Register
        </button>
      </form>
    </div>
  )
}

export default Register

