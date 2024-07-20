import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    theme: "light"
}

const ThemSlice = createSlice({
    name : "theme",
    initialState,
    reducers: {
        toggleTheme : (state) => {
            state.theme = state.theme === "light" ? "dark": "light"
        }
    }
})

export const {toggleTheme} = ThemSlice.actions;

export default ThemSlice.reducer