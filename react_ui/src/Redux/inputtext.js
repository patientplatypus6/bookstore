import { createSlice } from '@reduxjs/toolkit'

export const inputtextSlice = createSlice({
  name: 'inputtext',
  initialState: {
    texts: [], 
    titles: [],
  },
  reducers: {
    modify: (state, action) => {
      let {titleindex, title, text} = action.payload
      if(titleindex==-1){
        state.texts.push(text)
        state.titles.push(title)
        if(title=="isbn"){
          var uniqueid = text + Date.now().toString()
          state.texts.push(uniqueid)
          state.titles.push("uniqueid")
        }
      }else{
        state.texts[titleindex]=text; 
      }
    },
    clear: (state, action) =>{
      let {titleindex, title} = action.payload 
      if(titleindex!=-1){
        state.texts[titleindex] = ""
      }
    }
  },
})

export const { modify, clear } = inputtextSlice.actions

export default inputtextSlice.reducer

