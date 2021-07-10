import { configureStore } from '@reduxjs/toolkit'
import buttonReducer from '../Redux/button'
import inputtextReducer from './inputtext'
import revenuecostReducer from './revenuecost'
import booklistdbReducer from './booklistDB'
import uploadpicdataReducer from './uploadpicdata'
import downloadpicdataReducer from './downloadpicdata'


export default configureStore({
  reducer: {
    button: buttonReducer,
    inputtext: inputtextReducer, 
    revenuecost: revenuecostReducer,
    booklistdb: booklistdbReducer,
    uploadpicdata: uploadpicdataReducer, 
    downloadpicdata: downloadpicdataReducer
  },
})