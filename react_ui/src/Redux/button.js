import { createSlice } from '@reduxjs/toolkit'

export const buttonSlice = createSlice({
  name: 'button',
  initialState: {
    buttons: [], 
    displays: [],
    toggles: []
  },
  reducers: {
    toggle: (state, action) => {
      let {buttonName, displayName, buttons} = action.payload
      var elementIndex = buttons.findIndex(element=>element==buttonName)
      if(elementIndex==-1){
        state.buttons.push(buttonName)
        state.displays.push(displayName)
        state.toggles.push(true)
      }else{
        state.toggles[elementIndex] = !state.toggles[elementIndex]
      }
    },
  },
})

export const { toggle } = buttonSlice.actions

export default buttonSlice.reducer

