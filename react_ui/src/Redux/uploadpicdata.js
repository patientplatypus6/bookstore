import { createSlice } from '@reduxjs/toolkit'

export const uploadpicdataSlice = createSlice({
  name: 'inputtext',
  initialState: {
    //upload filenames here
    files: [], 
    frontcoverindex: -1,
    backcoverindex: -1
  },
  reducers: {
    modifyuploadpicdata: (state, action) => {
      console.log('value of action: ', action.payload.files)
      state.files = action.payload.files
    },
    clearuploadpicdata: (state, action) =>{
      console.log('inside clearuploadpicdata')
      state.files = []
      state.frontcoverindex = -1 
      state.backcoverindex = -1 
    }
  },
})

export const { modifyuploadpicdata, clearuploadpicdata } = uploadpicdataSlice.actions

export default uploadpicdataSlice.reducer

