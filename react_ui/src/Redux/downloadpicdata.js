import { createSlice } from '@reduxjs/toolkit'

export const downloadpicdataSlice = createSlice({
  name: 'downloadpicdata',
  initialState: {
    //download filenames here
    bookshelfdownloadmax: 5,
    bookshelfcovers: [],
    bookshelfbook: [],
    newbooks: [],
    updatednewbooks: false,
    base64book: []
  },
  reducers: {
    setuniquebooks: (state, actions) =>{  
      console.log('in setuniquebooks and value of actions: ', actions)
      state.bookshelfbook = actions.payload.bookshelfbook
      state.newbooks = actions.payload.newbooks
      console.log('value of state.bookshelfbook: ', state.bookshelfbook)
      console.log('value of state.newbooks: ', state.newbooks)
      state.updatednewbooks = true
    }, 
    setupdatednewbooks: (state, actions) => {
      state.updatednewbooks = actions.payload.updatednewbooks
    }, 
    updatebookshelfcovers: (state, actions) => {
      actions.payload.bookshelfcovers.forEach(cover=>{
        state.bookshelfcovers.push(cover)
      })
    }
  },
})

export const { setuniquebooks, updatebookshelfcovers, setupdatednewbooks } = downloadpicdataSlice.actions

export default downloadpicdataSlice.reducer

