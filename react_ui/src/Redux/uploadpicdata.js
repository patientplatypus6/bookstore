import { createSlice } from '@reduxjs/toolkit'

export const uploadpicdataSlice = createSlice({
  name: 'inputtext',
  initialState: {
    //upload filenames here
    files: [], 
    frontcoverindex: 0,
    backcoverindex: 0
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
    }, 
    setcover: (state, action) => {
      if(action.payload.type=='front'){
        state.frontcoverindex = action.payload.index
      }
      if(action.payload.type=='back'){
        state.backcoverindex = action.payload.index
      }
    }
  },
})

export const { modifyuploadpicdata, clearuploadpicdata, setcover } = uploadpicdataSlice.actions

export default uploadpicdataSlice.reducer

