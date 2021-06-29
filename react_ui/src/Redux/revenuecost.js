import { createSlice } from '@reduxjs/toolkit'

export const revenuecostSlice = createSlice({
  name: 'revenuecost',
  initialState: {
    rcnames: [], 
    rcdescriptions: [],
    rcvalues: [],
    rcdates: [], 
    indexvals: []
  },
  reducers: {
    addrc: (state, actions) => {
      console.log('inside addrc')
      console.log('value of state: ', state)
      state.rcdates.push("")
      state.rcnames.push("")
      state.rcvalues.push("")
      state.rcdescriptions.push("")
      state.indexvals.push(Date.now())
    }, 
    removerc: (state, actions) => {
      console.log('inside removerc')
    }, 
    modifyrc: (state, actions) => {
      console.log('value of actions.payload: ', actions.payload)
      state[actions.payload.name][actions.payload.index]=actions.payload.value
    },
    // modify: (state, action) => {
    //   let {titleindex, title, text} = action.payload
    //   if(titleindex==-1){
    //     state.texts.push(text)
    //     state.titles.push(title)
    //   }else{
    //     state.texts[titleindex]=text; 
    //   }
    // },
    // clear: (state, action) =>{
    //   let {titleindex, title} = action.payload 
    //   if(titleindex!=-1){
    //     state.texts[titleindex] = ""
    //   }
    // }
  },
})

export const { addrc, removerc, modifyrc } = revenuecostSlice.actions

export default revenuecostSlice.reducer

