import { configureStore } from '@reduxjs/toolkit'
import buttonReducer from '../Redux/button'
import inputtextReducer from './inputtext'
import revenuecostReducer from './revenuecost'


export default configureStore({
  reducer: {
    button: buttonReducer,
    inputtext: inputtextReducer, 
    revenuecost: revenuecostReducer
  },
})