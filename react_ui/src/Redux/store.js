import { configureStore } from '@reduxjs/toolkit'
import buttonReducer from '../Redux/button'
import inputtextReducer from './inputtext'


export default configureStore({
  reducer: {
    button: buttonReducer,
    inputtext: inputtextReducer
  },
})