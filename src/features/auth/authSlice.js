import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = JSON.parse(localStorage.getItem("loggedInUser"))

const initialState = {
    user: userFromStorage || null,
    isLoggedIn: !!userFromStorage,
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true
            state.user = action.payload
        },
        logout: (state) => {
            state.isLoggedIn = false
            state.user = null
            localStorage.removeItem("loggedInUser")
        },
        addSkill: (state, action) => {
            const newSkill = action.payload
            if (state.user) {
                if (!state.user.skills) {
                    state.user.skills = []
                }
            }

            state.user.skills.push(newSkill)

            localStorage.setItem("loggedInUser", JSON.stringify(state.user))

            const users = JSON.parse(localStorage.getItem("users")) || []

            const updatedUsers = users.map((u) =>
                u.username === state.user.username ? state.user : u
            )
            localStorage.setItem("users", JSON.stringify(updatedUsers))
        },
        updateUserSkills: (state, action) => {
            state.user.skills = action.payload
        }
    }
})

export const { login, logout, addSkill , updateUserSkills} = authSlice.actions

export default authSlice.reducer