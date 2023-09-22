import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
   category: {}
}

export const {reducer, actions} = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setToCategory: (state, action) => {
            state.category = action.payload
        }
    },
   
      
})