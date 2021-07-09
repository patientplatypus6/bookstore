import { createSlice } from '@reduxjs/toolkit'

export const uploadpicdataSlice = createSlice({
  name: 'inputtext',
  initialState: {
    files: []
  },
  reducers: {
    modifyuploadpicdata: (state, action) => {
      console.log('value of action: ', action.payload.files)
      state.files = action.payload.files
    },
    clearuploadpicdata: (state, action) =>{
      state.files = []
    }
  },
})

export const { modifyuploadpicdata, clearuploadpicdata } = uploadpicdataSlice.actions

export default uploadpicdataSlice.reducer

