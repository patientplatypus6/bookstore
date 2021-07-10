import React, {Component, useState, useEffect} from 'react';
import './admin.css'
// import { observer} from "mobx-react-lite";
// import { toJS } from "mobx"
import InputBox from '../../Components/SubComponents/InputBox/InputBox'
import TextBox from '../../Components/SubComponents/TextBox/TextBox'
import Button from '../../Components/SubComponents/Button/Button'
import { useDispatch, useSelector } from 'react-redux';
import RevenueCost from '../../Components/revenueCost/revenueCost';
import {
  modifyuploadpicdata, 
  setcover
} from '../../Redux/uploadpicdata'


const AddBook = () => {

  const rcnames = useSelector((state)=>state.revenuecost.rcnames)
  const indexvals = useSelector((state)=>state.revenuecost.indexvals)
  const files = useSelector((state)=>state.uploadpicdata.files)
  const frontindex = useSelector((state)=>state.uploadpicdata.frontcoverindex)
  const backindex = useSelector((state)=>state.uploadpicdata.backcoverindex)
  

  const dispatch = useDispatch()

  // const [image64List, setImage64List] = useState([])
  

  useEffect(()=>{
    // console.log('value of rcnames: ', rcnames)
    // console.log('value of image64List: ', image64List)
  })

  const imageDisplayHandler = () => {
    return(
      <div>
        {files.map((image64, key)=>{
          return(
            <div key={key}>
              <div
                style={{
                  border: '2px solid black',
                  padding: '5px', 
                  margin: '2px'
                }}
              >
                <div>
                  {key==frontindex?
                    <div style={{
                      display:'inline-block', 
                      marginBottom: '5px', 
                    }}>~ Front Cover ~</div>
                  :<div/>}
                  {key==backindex?
                    <div style={{
                      display:'inline-block', 
                      marginBottom: '5px'
                    }}>~ Back Cover ~</div>
                  :<div/>}    
                </div>
                <div style={{
                  display:'inline-block', 
                  marginBottom: '5px'
                }}>
                  <img src={image64} style={{height: 'auto', width: '10vw'}}/>
                </div>
              </div>
            </div>
          )
        })}
        
        {files.length>1?
          <div style={{marginTop: '5px'}}>
            <span style={{marginRight: '5px'}}> Select Front Cover Image Index </span>
            <select
              onChange={(e)=>{
                console.log("value of e.target.value: ", e.target.value)
                let payload = {
                  index: e.target.value,
                  type: 'front'
                }
                dispatch(setcover(payload))
              }}
            >
              {files.map((image64, key)=>{
                return(  
                  <option
                    key={key}
                    style={{}}
                  >
                    {key}
                  </option>
                )
              })}
            </select>
          </div>
          :<div/>}

        {files.length>1?
          <div style={{marginTop: '5px'}}>
            <span style={{marginRight: '5px'}}> Select Back Cover Image Index </span>
            <select
              onChange={(e)=>{
                console.log("value of e.target.value: ", e.target.value)
                let payload = {
                  index: e.target.value,
                  type: 'back'
                }
                dispatch(setcover(payload))
              }}
            >
              {files.map((image64, key)=>{
                return(  
                  <option
                    key={key}
                    style={{}}
                  >
                    {key}
                  </option>
                )
              })}
            </select>
          </div>
          :<div/>}
      </div>
    )
  }

  const revenuecostHandler=()=>{
    console.log('inside revenuecostHandler  ')
    console.log('value of rcnames: ', rcnames)
    console.log('value of indexvals: ', indexvals)
    return (
      <div>
        {indexvals!=undefined?indexvals.map((indexval, key)=>{
          console.log('value of indexval: ', indexval)
          return(
            <div key={key}>
              <RevenueCost indexval={indexval} rcname={rcnames[key]}/>
            </div>
          )
        }):<div/>}
      </div>
    )
  }

  return(
    <>
      <div
        style={{
          background: 'grey', 
          display: 'inline-block', 
          padding: '20px', 
          verticalAlign: 'top', 
          marginRight: '20px'
        }}
      >
        <div
          style={{
            fontWeight: 'bold', 
            fontSize: '1.5rem', 
            display: 'inline-block'
          }}
        >
          Upload Book List JSON
        </div>
        <br/>
        <br/>
        <input type='file' multiple/>
      </div>
      <div
        style={{
          background: 'rgb(100,0,0)', 
          display: 'inline-block', 
          padding: '20px', 
          verticalAlign: 'top',
        }}    
      >
        <div
          style={{
            background: 'grey', 
            display: 'inline-block', 
            padding: '20px', 

          }}
        >
          <div
            style={{
              fontWeight: 'bold', 
              fontSize: '1.5rem', 
              display: 'inline-block'
            }}
          >
            Add Book
          </div>
          <br/>
          <br/>
          <div>
            ISBN
            <br/>
            <InputBox title='isbn'/>
          </div>
          <br/>
          <div>
            Title
            <br/>
            <InputBox title='title'/>
          </div>
          <br/>
          <div>
            Sub Title
            <br/>
            <InputBox title='subtitle'/>
          </div>
          <br/>
          <div>
            Publisher
            <br/>
            <InputBox title='publisher'/>
          </div>
          <br/>
          <div>
            Current Copyright
            <br/>
            <InputBox title='currentcopyright'/>
          </div>
          <br/>
          <div>
            Edition
            <br/>
            <InputBox title='bookedition'/>
          </div>
          <br/>
          <div>
            Author Biography
            <br/>
            <TextBox title='authorbio'/>
          </div>
          <br/>
          <div>
            Synopsis
            <br/>
            <TextBox title='synopsis'/>
          </div>
          <br/>
          {revenuecostHandler()}
          <div>
            <Button 
              buttonName='addrevenuecost'
              displayName="Add Revenue Cost"
            />
          </div>
          <br/>
          <div>
            <Button buttonName='addbook' displayName="Add Book"/>
          </div>
        </div>
        <div
          style={{
            background: 'grey', 
            display: 'inline-block', 
            padding: '20px', 
            marginLeft: '5px',
            verticalAlign: 'top',
          }}
        >
          <div
            style={{
              fontWeight: 'bold', 
              fontSize: '1.5rem', 
              display: 'inline-block'
            }}
          >
            Add Book Images
          </div>
          <br/><br/>
          <input type='file' multiple
            onChange={(e)=>{
              const fileList = e.target.files
              var base64List = []
              const readerHandler = (i) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                  base64List.push(e.target.result)
                  if(i<fileList.length - 1){
                    i++
                    readerHandler(i)
                  }else if (i == fileList.length - 1){
                    // setImage64List(base64List)
                    dispatch(modifyuploadpicdata({files:base64List}))
                  }
                } 
                reader.readAsDataURL(fileList[i])
              }
              readerHandler(0)
            }}
          />
          {imageDisplayHandler()}
        </div>
      </div>
    </>
  )
}

export default AddBook;