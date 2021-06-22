import { createSlice } from '@reduxjs/toolkit'

export const buttonSlice = createSlice({
  name: 'counter',
  initialState: {
    buttons: [], 
    clicks: [], 
    value: 0
  },
  reducers: {
    click: (state, action) => {
      let buttonName = action.payload['buttonName']
      let buttons = action.payload['buttons']
      var elementIndex = buttons.findIndex(element=>element==buttonName)
      console.log('value of elementIndex: ', elementIndex)
      console.log(elementIndex)
      if(elementIndex==-1){
        state.buttons.push(buttonName)
        state.clicks.push(1)
      }else{
        state.clicks[elementIndex]++
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { click, buttonCount } = buttonSlice.actions

export default buttonSlice.reducer

