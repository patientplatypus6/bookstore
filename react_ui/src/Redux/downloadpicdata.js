import { createSlice } from '@reduxjs/toolkit'

export const downloadpicdataSlice = createSlice({
  name: 'downloadpicdata',
  initialState: {
    //download filenames here
    bookshelfdownloadmax: 5,
    base64bookshelf: [],
    bookshelfbook: [],
    newbooks: [],
    base64book: []
  },
  reducers: {
    setuniquebooks: (state, actions) =>{  
      console.log('in setuniquebooks and value of actions: ', actions)
      state.bookshelfbook = actions.payload.bookshelfbook
      state.newbooks = actions.payload.newbooks
      console.log('value of state.bookshelfbook: ', state.bookshelfbook)
      console.log('value of state.newbooks: ', state.newbooks)
    }
  },
})

export const { setuniquebooks } = downloadpicdataSlice.actions

export default downloadpicdataSlice.reducer

