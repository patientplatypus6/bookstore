import { createSlice } from '@reduxjs/toolkit'

export const downloadpicdataSlice = createSlice({
  name: 'downloadpicdata',
  initialState: {
    //download filenames here
    bookshelfdownloadmax: 3,
    bookshelfcovers: [],
    bookshelfbook: [],
    newbooks: [],
    // updatednewbooks: Date.now(),
    base64book: [], 
    coversupdatedtime: 0
  },
  reducers: {
    setuniquebooks: (state, actions) =>{  
      // console.log('in setuniquebooks and value of actions: ', actions)
      state.bookshelfbook = actions.payload.bookshelfbook
      state.newbooks = actions.payload.newbooks
      // console.log('value of state.bookshelfbook: ', state.bookshelfbook)
      // console.log('value of state.newbooks: ', state.newbooks)
      // state.updatednewbooks = Date.now()
    }, 
    // setupdatednewbooks: (state, actions) => {
    //   state.updatednewbooks = actions.payload.updatednewbooks
    // }, 
    updatebookshelfcovers: (state, actions) => {
      actions.payload.bookshelfcovers.forEach(cover=>{
        state.bookshelfcovers.push(cover)
      })
      state.coversupdatedtime = Date.now()
    },
    cleanbookshelfcovers: (state, actions) => {
      state.bookshelfcovers = []
    }
  },
})

export const { setuniquebooks, updatebookshelfcovers, setupdatednewbooks, cleanbookshelfcovers } = downloadpicdataSlice.actions

export default downloadpicdataSlice.reducer

