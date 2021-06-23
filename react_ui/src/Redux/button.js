import { createSlice } from '@reduxjs/toolkit'

export const buttonSlice = createSlice({
  name: 'counter',
  initialState: {
    buttons: [], 
    toggles: []
  },
  reducers: {
    toggle: (state, action) => {
      let {buttonName, buttons} = action.payload
      var elementIndex = buttons.findIndex(element=>element==buttonName)
      if(elementIndex==-1){
        state.buttons.push(buttonName)
        state.toggles.push(true)
      }else{
        state.toggles[elementIndex] = !state.toggles[elementIndex]
      }
    },
  },
})

export const { toggle, buttonCount } = buttonSlice.actions

export default buttonSlice.reducer

