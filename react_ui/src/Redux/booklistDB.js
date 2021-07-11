import { createSlice } from '@reduxjs/toolkit'

export const booklistdbSlice = createSlice({
  name: 'booklistdb',
  initialState: {
    booklist: [],
    booklistupdated: 0
  },
  reducers: {
    modifybooklistdb: (state, action) => {
      console.log('value of payload in modifybooklistdb; ', action.payload  )
      state.booklist = action.payload
      state.booklistupdated = Date.now()
    },
    clearbooklistdb: (state, action) =>{
      state.booklist = []
    }
  },
})

export const { modifybooklistdb, clearbooklistdb } = booklistdbSlice.actions

export default booklistdbSlice.reducer

