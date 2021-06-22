import { configureStore } from '@reduxjs/toolkit'
import buttonReducer from '../Redux/button'


export default configureStore({
  reducer: {
    button: buttonReducer,
  },
})