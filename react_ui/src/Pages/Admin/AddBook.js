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
import {dateFormat} from '../../utility/utility'
import fetchrequest from '../../api/fetch'

const AddBook = () => {

  const [isbn, setIsbn] = useState("NONE")
  const [title, setTitle] = useState("NONE")
  const [currentcopyright, setCurrentcopyright] = useState("NONE")
  const [bookedition, setBookedition] = useState("NONE")
  const [authorbio, setAuthorbio] = useState("NONE")
  const [subtitle, setSubtitle] = useState("NONE")
  const [publisher, setPublisher] = useState("NONE")
  const [synopsis, setSynopsis] = useState("NONE")
  const [revenuecostindex, setRevenuecostindex] = useState([])
  const [revenuecostitem, setRevenuecostitem] = useState([])
  const [uploadpicdata, setUploadpicdata] = useState([])
  const [picfrontindex, setPicfrontindex] = useState(0)
  const [picbackindex, setPicbackindex] = useState(0)  

  const dispatch = useDispatch()

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

  const resetBookEntries = () => {
    setIsbn("NONE")
    setTitle("NONE")
    setCurrentcopyright("NONE")
    setBookedition("NONE")
    setAuthorbio("NONE")
    setSubtitle("NONE")
    setPublisher("NONE")
    setSynopsis("NONE")
    setRevenuecostindex([])
    setRevenuecostitem([])
  }

  const resetPicEntries = () => {
    setUploadpicdata([])
    setPicfrontindex(0) 
    setPicbackindex(0)
  }

  const addbookhandler = () => {
    
    var bookuniqueid = isbn + Date.now()

    var payload = {
      body: {
        book: {
          title, 
          subtitle,
          publisher,
          currentcopyright,
          bookedition, 
          uniqueid: bookuniqueid,  
          authorbio, 
          synopsis, 
          isbn,
        },
        revenuecost: revenuecostitem
      }, 
      requestType:"post",
      uri:"book/addbook"
    }
    var picturepayload = {
      body: {
        frontcoverindex: picfrontindex, 
        backcoverindex: picbackindex, 
        bookuniqueid, 
        files: uploadpicdata
      }, 
      requestType:"post",
      uri:"book/addpics"
    }
    handlefetch(payload).then(result=>{
      console.log("value of results: ", result)
      resetBookEntries()
    })
    handlefetch(picturepayload).then(result=>{
      console.log("value of results: ", result)
      resetPicEntries()
    })
  }


  const imageDisplayHandler = () => {
    return(
      <div>
        {uploadpicdata[0]==0?
        <div
          style={{
            border: '2px solid black',
            padding: '5px', 
            margin: '2px'
          }}
        >
          <img 
          style={{height: 'auto', width: '10vw'}}
          src={process.env.PUBLIC_URL+'/No-Image-Placeholder.svg'}/>  
        </div>:
        uploadpicdata.map((image64, key)=>{
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
                  {key==picfrontindex?
                    <div style={{
                      display:'inline-block', 
                      marginBottom: '5px', 
                    }}>~ Front Cover ~</div>
                  :<div/>}
                  {key==picbackindex?
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
        
        {/* {files.length>1? */}
        <div style={{marginTop: '5px'}}>
          <span style={{marginRight: '5px'}}> Select Front Cover Image Index </span>
          <select
            onChange={(e)=>{
              console.log("value of e.target.value: ", e.target.value)
              setPicfrontindex(e.target.value)
            }}
          >
            {uploadpicdata.map((image64, key)=>{
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

          {/* :<div/>} */}

        {/* {files.length>1? */}
          <div style={{marginTop: '5px'}}>
            <span style={{marginRight: '5px'}}> Select Back Cover Image Index </span>
            <select
              onChange={(e)=>{
                console.log("value of e.target.value: ", e.target.value)
                setPicbackindex(e.target.value)
              }}
            >
              {uploadpicdata.map((image64, key)=>{
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
          {/* :<div/>} */}
      </div>
    )
  }

  const revenuecostrender = (uniqueid) => {
    console.log("inside revenuecostrender and indexval: ", uniqueid)
    console.log(revenuecostitem)
    var itemindex = revenuecostitem.findIndex(element=>element.uniqueid==uniqueid);
    console.log(itemindex)
    var temprevenuecostindex = revenuecostindex
    console.log(temprevenuecostindex[itemindex])
    return(
      <div>
        <div
          style={{
            fontWeight: 'bold', 
            fontSize: '1.5rem', 
            display: 'inline-block'
          }}
        >
          Revenue/Cost 
          <br/>
          <span
            style={{fontWeight:'lighter', fontSize: '1rem'}}
          >
            #{uniqueid}
          </span>
        </div>
        <br/>
        <div>
          Revenue Cost Name
          <br/>
          <input 
            className='inputBox'
            value={revenuecostitem[itemindex]['rcname']}
            onChange={(e)=>{
              console.log("value of e.target.value: ", e.target.value)
              var temprevenuecostitem= revenuecostitem
              temprevenuecostitem[itemindex]['rcname'] = e.target.value
              setRevenuecostitem([...temprevenuecostitem])
            }}
          />
        </div>
        <br/>
        <div>
          Revenue Cost Description
          <br/>
          <input 
            className='inputBox'
            value={revenuecostitem[itemindex]['rcdescription']}
            onChange={(e)=>{
              var temprevenuecostitem = revenuecostitem
              temprevenuecostitem[itemindex]['rcdescription'] = e.target.value
              setRevenuecostitem([...temprevenuecostitem])
            }}
          />
        </div>
        <br/>
        <div>
          Revenue Cost Value
          <br/>
          <input 
            className='inputBox'
            value={revenuecostitem[itemindex]['rcvalue']}
            onChange={(e)=>{
              var temprevenuecostitem = revenuecostitem
              temprevenuecostitem[itemindex]['rcvalue'] = e.target.value
              setRevenuecostitem([...temprevenuecostitem])
            }}
          />
        </div>
        <br/>
        <div>
          Revenue Cost Date
          <br/>
          <input 
            className='inputBox'
            value={revenuecostitem[itemindex]['rcdate']}
            onChange={(e)=>{
              var temprevenuecostitem = revenuecostitem
              temprevenuecostitem[itemindex]['rcdate'] = e.target.value
              setRevenuecostitem([...temprevenuecostitem])
            }}
          />
          <br/>
          <div style={{fontSize: '0.8rem'}}>
            Date format must conform to <br/>
            <span style={{fontWeight: 'bold'}}>DATETIME - format: YYYY-MM-DD HH:MI:SS</span>
          </div>
        </div>  
        <br/>
        <div>
          <div className='button'
            onClick={()=>{

              var temprevenuecostitem = [...revenuecostitem]
              var newcostitem = []
              temprevenuecostitem.forEach((ci, i) =>{
                if(ci.uniqueid!=uniqueid){
                  newcostitem.push(ci)
                }
              })

              console.log('value of newcostitem: ', newcostitem)

              setRevenuecostitem(newcostitem)              

              var temprevenuecostindex = [...revenuecostindex]
              var newcostindex = []
              temprevenuecostindex.forEach((ci, i) =>{
                if(i!=itemindex){
                  newcostindex.push(ci)
                }
              })
              setRevenuecostindex(newcostindex)
            }}
          >  
            Delete Revenue Cost Entry
          </div>
        </div>
        <br/>
      </div>
    )
  }

  const revenuecostHandler = () => {
    console.log("inside revenuecosthandler: ")
    console.log("value of revenuecostitem: ", revenuecostitem)
    return (
      <div>
        {revenuecostitem!=undefined?revenuecostitem.map((indexval, key)=>{
          console.log('value of indexval: ', indexval)
          return(
            <div key={key}>
              {revenuecostrender(indexval.uniqueid)}
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
          background: 'rgb(100,0,0)', 
          display: 'inline-block', 
          padding: '20px', 
          verticalAlign: 'top',
          marginBottom: '20px'
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
            <input 
              className='inputBox'
              value={isbn}
              onChange={(e)=>{
                setIsbn(e.target.value)
              }}
            />
          </div>
          <br/>
          <div>
            Title
            <br/>
            <input 
              className='inputBox'
              value={title}
              onChange={(e)=>{
                setTitle(e.target.value)
              }}
            />
          </div>
          <br/>
          <div>
            Sub Title
            <br/>
            <input 
              className='inputBox'
              value={subtitle}
              onChange={(e)=>{
                setSubtitle(e.target.value)
              }}
            />
          </div>
          <br/>
          <div>
            Publisher
            <br/>
            <input 
              className='inputBox'
              value={publisher}
              onChange={(e)=>{
                setPublisher(e.target.value)
              }}
            />
          </div>
          <br/>
          <div>
            Current Copyright
            <br/>
            <input 
              className='inputBox'
              value={currentcopyright}
              onChange={(e)=>{
                setCurrentcopyright(e.target.value)
              }}
            />
          </div>
          <br/>
          <div>
            Edition
            <br/>
            <input 
              className='inputBox'
              value={bookedition}
              onChange={(e)=>{
                setBookedition(e.target.value)
              }}
            />
          </div>
          <br/>
          <div>
            Author Biography
            <br/>
            <textarea 
              className='textbox'
              rows="4" cols="30" 
              value={authorbio}
              onChange={(e)=>{
                setAuthorbio(e.target.value)
              }}
            />
          </div>
          <br/>
          <div>
            Synopsis
            <br/>
            <textarea 
              className='textbox'
              rows="4" cols="30" 
              value={synopsis}
              onChange={(e)=>{
                setSynopsis(e.target.value)
              }}
            />
          </div>
          <br/>
          {revenuecostHandler()}
          <div>
          <div className='button'
            onClick={()=>{
              var datestring = Date.now()
              var tempindex = revenuecostindex
              tempindex.push(datestring)
              setRevenuecostindex(tempindex)
              var temprevenuecostitem = [...revenuecostitem]
              temprevenuecostitem.push({
                uniqueid: datestring,
                rcname: "NONE", 
                rcdescription: "NONE", 
                rcvalue: "NONE", 
                rcdate: dateFormat(new Date (), "%Y-%m-%d %H:%M:%S", true)
              })
              setRevenuecostitem(temprevenuecostitem)
              console.log("value of revenuecostitem : ", revenuecostitem)
            }}
          >  
            Add Revenue Cost
          </div>
          </div>
          <br/>
          <div>
            <div className='button'
              onClick={()=>{
                addbookhandler()
              }}
            >  
              Add Book
            </div>
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
                    setUploadpicdata(base64List)
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