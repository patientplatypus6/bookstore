import { createSlice } from '@reduxjs/toolkit'

export const downloadpicdataSlice = createSlice({
  name: 'downloadpicdata',
  initialState: {
    bookshelfdownloadmax: 3,
    bookshelfcovers: [],
    bookshelfbook: [],
    newbooks: [],
    base64book: [], 
    coversupdatedtime: 0
  },
  reducers: {
    setuniquebooks: (state, actions) =>{  
      state.bookshelfbook = actions.payload.bookshelfbook
      state.newbooks = actions.payload.newbooks
    }, 
    updatebookshelfcovers: (state, actions) => {
      for(var i = 0; i < actions.payload.bookshelfcovers.length; i++){
        state.bookshelfcovers.push(actions.payload.bookshelfcovers[i])
      }
    },
    cleanbookshelfcovers: (state, actions) => {
      state.bookshelfcovers = []
    }
  },
})

export const { setuniquebooks, updatebookshelfcovers, setupdatednewbooks, cleanbookshelfcovers } = downloadpicdataSlice.actions

export default downloadpicdataSlice.reducer

