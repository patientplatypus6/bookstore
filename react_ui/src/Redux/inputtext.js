import { createSlice } from '@reduxjs/toolkit'

export const inputtextSlice = createSlice({
  name: 'counter',
  initialState: {
    texts: [], 
    titles: []
  },
  reducers: {
    modify: (state, action) => {
      let {titleindex, title, text} = action.payload
      if(titleindex==-1){
        state.texts.push(text)
        state.titles.push(title)

      }else{
        state.texts[titleindex]=text; 
      }
    },
  },
})

export const { modify } = inputtextSlice.actions

export default inputtextSlice.reducer

