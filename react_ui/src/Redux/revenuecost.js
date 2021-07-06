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
      state.rcnames = actions.payload.rcnames
      state.rcdescriptions = actions.payload.rcdescriptions
      state.rcvalues = actions.payload.rcvalues
      state.rcdates = actions.payload.rcdates
      state.indexvals = actions.payload.indexvals
    }, 
    modifyrc: (state, actions) => {
      console.log('value of actions.payload: ', actions.payload)
      state[actions.payload.name][actions.payload.index]=actions.payload.value
    }
  },
})

export const { addrc, removerc, modifyrc } = revenuecostSlice.actions

export default revenuecostSlice.reducer

