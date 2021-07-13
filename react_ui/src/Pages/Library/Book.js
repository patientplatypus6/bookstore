import React, {Component, useState, useEffect} from 'react';
import './library.css'
// import { observer} from "mobx-react-lite";
// import { toJS } from "mobx"
import fetchrequest from '../../api/fetch'
import './book.css'

const Book = () => {
  
  const [uploadpicdata, setUploadpicdata] = useState([])

  useEffect(()=>{

  })

  const handlefetch = (payload) => {
    console.log('inside handlefetch and value of payload: ', payload)
    const fetchasync = async () => {
      var fetchresult = await fetchrequest(payload)
      return fetchresult
    }
    return fetchasync();
  }

  const uploadimage = () => {
    console.log("value of uploadpicdata: ", uploadpicdata)
    var payload = {
      requestType: "post", 
      uri: "pic/uploadtest", 
      body: {pic64:uploadpicdata[0]}
    }
    handlefetch(payload).then(result=>{
      console.log("value of result: ", result)
    })
  }

  return(
    <div>
      <input type="file"
        onChange={(e)=>{
          const fileList = e.target.files
          console.log('fileList: ', fileList)
          const reader = new FileReader();
          reader.onload = function(e) {
            var templocalimage = []
            templocalimage.push(e.target.result)
            setUploadpicdata([...templocalimage])
          }
          reader.readAsDataURL(fileList[0])
        }}
      />
      <div className='button'
        onClick={()=>{
          uploadimage()
        }}
      >
        upload image
      </div><br/><br/>
      <img 
        src={uploadpicdata}
        style={{
          height: '20vh', 
          width: 'auto'
        }}
      />
      <br/>
      <img
        style={{
          height: '20vh', 
          width: 'auto'
        }} 
        src='http://localhost:8080/images/imagetest1.jpg'
      />
      <br/>
      <img
        style={{
          height: '20vh', 
          width: 'auto'
        }} 
        src='http://localhost:8080/images/soda.jpg'
      />
    </div>
  )
}

export default Book;