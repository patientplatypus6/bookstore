import React, {Component, useState, useEffect} from 'react';
import './admin.css'
import fetchrequest from '../../api/fetch'
import { useHistory } from "react-router-dom";

import {arraybuffertobase64, sleep} from '../../utility/utility'

const EditBook = () => {

  let history = useHistory();


  const [isbn, setIsbn] = useState("NONE")
  const [title, setTitle] = useState("NONE")
  const [currentcopyright, setCurrentcopyright] = useState("NONE")
  const [bookedition, setBookedition] = useState("NONE")
  const [storyinfo, setStoryinfo] = useState("NONE")
  const [subtitle, setSubtitle] = useState("NONE")
  const [publisher, setPublisher] = useState("NONE")
  const [condition, setCondition] = useState("NONE")
  const [revenuecostindex, setRevenuecostindex] = useState([])
  const [revenuecostitem, setRevenuecostitem] = useState([])
  const [uploadpicdata, setUploadpicdata] = useState([0])
  const [picfrontindex, setPicfrontindex] = useState(0)
  const [picbackindex, setPicbackindex] = useState(0)  


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
    setStoryinfo("NONE")
    setSubtitle("NONE")
    setPublisher("NONE")
    setCondition("NONE")
    setRevenuecostindex([])
    setRevenuecostitem([])
  }

  const resetPicEntries = () => {
    setUploadpicdata([0])
    setPicfrontindex(0) 
    setPicbackindex(0)
  }

  const editbookhandler = () => {

    var bookuniqueid = history.location.state.bookitem.uniqueid

    var temprevenuecostitem = revenuecostitem
    temprevenuecostitem.forEach(item=>{
      item.bookuniqueid = bookuniqueid
    })
    setRevenuecostitem([...revenuecostitem])

    var payload = {
      body: {
        book: {
          title, 
          subtitle,
          publisher,
          currentcopyright,
          bookedition, 
          uniqueid: bookuniqueid,  
          storyinfo, 
          condition, 
          isbn,
        },
        revenuecost: revenuecostitem
      }, 
      requestType:"post",
      uri:"book/updatebook"
    }
    var picturepayload = {
      body: {
        frontcoverindex: picfrontindex, 
        backcoverindex: picbackindex, 
        bookuniqueid, 
        files: uploadpicdata
      }, 
      requestType:"post",
      uri:"book/updatepics"
    }
    handlefetch(payload).then(result=>{
      console.log("value of results: ", result)
      resetBookEntries()
    })
    handlefetch(picturepayload).then(result=>{
      console.log("value of results: ", result)
      resetPicEntries()
    })
    history.push({
      pathname: '/admin/dashboard',
      dashmessage: `Book with title ${title} and unique id ${bookuniqueid} \n has been edited in the database...`
    })
  }

  const findrevenuecosts = (bookuniqueid) => {
    console.log('value of bookuniqueid: ', bookuniqueid)

    var payload = {
      requestType: 'post', 
      uri: 'book/findrevenuecosts', 
      body: {
        bookid: bookuniqueid
      }
    }
    handlefetch(payload).then(result=>{
      console.log('value of result from findrevenuecosts: ', result)
      var revenuecostindextemp = [...revenuecostindex]
      var revenuecostitemtemp = [...revenuecostitem]
      result.forEach(item=>{
        revenuecostindextemp.push(item.uniqueid)
        revenuecostitemtemp.push(item)
      })
      console.log("value of revenuecostitemtemp: ", revenuecostitemtemp)
      setRevenuecostindex([...revenuecostindextemp])
      setRevenuecostitem([...revenuecostitemtemp])
    })
  }

  const findimagesbybook = (bookuniqueid) => {
    var payload = {
      requestType: 'post', 
      uri: 'pic/findimagesbybook', 
      body: {
        bookid: bookuniqueid
      }
    }
    handlefetch(payload).then(result=>{
      console.log("result from findpics: ", result)
      var temppicdata = []
      for(var i = 0; i<result.length; i++){
        if(result[i]['frontcover']){
          setPicfrontindex(i)
        }
        if(result[i]['backcover']){
          setPicbackindex(i)
        }
        temppicdata.push(arraybuffertobase64(result[i]['picbyte']))
      }
      // console.log("tempicdata: ", temppicdata)
      setUploadpicdata([...temppicdata])
      console.log("value of picdata: ", uploadpicdata)
    })  
  }

  const setbook = (bookitem) => {
    console.log("value of bookitem in setbook: ", bookitem)
    setIsbn(bookitem.isbn)
    setTitle(bookitem.title)
    setCurrentcopyright(bookitem.currentcopyright)
    setBookedition(bookitem.bookedition)
    setStoryinfo(bookitem.storyinfo)
    setSubtitle(bookitem.subtitle)
    setPublisher(bookitem.publisher)
    setCondition(bookitem.condition)
  }

  useEffect(()=>{ 
    console.log("value of uploadpicdata: ", uploadpicdata)
  }, [])

  useEffect(()=>{
    if(history.location.state == null || history.location.state.bookitem==undefined){
      history.push({
        pathname: '/admin/dashboard',
      })
    }else{
      var bookitemuniqueid = history.location.state.bookitem.uniqueid
      findrevenuecosts(bookitemuniqueid)
      findimagesbybook(bookitemuniqueid)
      setbook(history.location.state.bookitem)
    }
  }, [])

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
                  <br/>
                  <br/>
                  <div className='button'
                    onClick={()=>{
                      if(key == picfrontindex){
                        setPicfrontindex(0)
                      }else if(key == picbackindex){
                        setPicbackindex(0)
                      }
                      if(uploadpicdata.length == 1){
                        setUploadpicdata([0])
                      }else{
                        var tempuploadpicdata = [...uploadpicdata]
                        var newpicdata = tempuploadpicdata.splice(key,1)
                        console.log("newpicdata: ", tempuploadpicdata)
                        setUploadpicdata(tempuploadpicdata)
                      }
                    }}
                  >
                    Delete Image
                  </div>
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

  const revenuecostrender = (uniqueid) => {
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
          <select
            value={revenuecostitem[itemindex]['rcname']}
            onChange={(e)=>{
              console.log("value of e.target.value: ", e.target.value)
              var temprevenuecostitem= revenuecostitem
              temprevenuecostitem[itemindex]['rcname'] = e.target.value
              setRevenuecostitem([...temprevenuecostitem])
            }}
          >
            <option value={'GENERIC'}>
              GENERIC
            </option>
            <option value={'COST - BOOK PRICE (BOUGHT)'}>
              COST - BOOK PRICE (BOUGHT)
            </option>
            <option value={'COST - BOOK SHIPPING (BOUGHT)'}>
              COST - BOOK SHIPPING (BOUGHT)
            </option>
            <option value={'COST - BOOK SHIPPING (SOLD)'}>
              COST - BOOK SHIPPING (SOLD)
            </option>
            <option value={'COST - MONTHLY (HOSTING)'}>
              COST - MONTHLY (HOSTING)
            </option>
            <option value={'COST - STRIPE CHARGE (PROJECTED)'}>
              COST - STRIPE CHARGE (PROJECTED)
            </option>
            <option value={'COST - STRIPE CHARGE (SOLD)'}>
              COST - STRIPE CHARGE (SOLD)
            </option>
            <option value={'COST - BOOK PACKAGING (SOLD)'}>
              COST - BOOK PACKAGING (SOLD)
            </option>
            <option value={'COST - OTHER FIXED (SOLD)'}>
              COST - OTHER FIXED (SOLD)
            </option>
            <option value={'COST - OTHER VARIABLE (SOLD)'}>
              COST - OTHER VARIABLE (SOLD)
            </option>
            <option value={'REVENUE - BOOK SHIPPING (SOLD)'}>
              REVENUE - BOOK SHIPPING (SOLD)
            </option>
            <option value={'REVENUE - BOOK PRICE (SOLD)'}>
              REVENUE - BOOK PRICE (SOLD)
            </option>
            <option value={'REVENUE - BOOK SHIPPING (PROSPECTIVE)'}>
              REVENUE - BOOK SHIPPING (SOLD)
            </option>
            <option value={'REVENUE - BOOK PRICE (PROSPECTIVE)'}>
              REVENUE - BOOK PRICE (SOLD)
            </option>
          </select>
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
            <span style={{fontWeight: 'bold'}}> ISO-8601 calendar system - format:
            <br/>
            YYYY-MM-DDTHH:MI:SS</span>
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
            Edit Book
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
            Story Info
            <br/>
            <textarea 
              className='textbox'
              rows="4" cols="30" 
              value={storyinfo}
              onChange={(e)=>{
                setStoryinfo(e.target.value)
              }}
            />
          </div>
          <br/>
          <div>
            Condition
            <br/>
            <textarea 
              className='textbox'
              rows="4" cols="30" 
              value={condition}
              onChange={(e)=>{
                setCondition(e.target.value)
              }}
            />
          </div>
          <br/>
          <br/>
          {revenuecostHandler()}
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
                rcdate: new Date().toISOString()
                // dateFormat(new Date (), "%Y-%m-%d %H:%M:%S", true)
              })
              setRevenuecostitem(temprevenuecostitem)
              console.log("value of revenuecostitem : ", revenuecostitem)
            }}
          >  
            Add Revenue Cost
          </div>
          <br/>
          <br/>
          <div>
            <div className='button'
              onClick={()=>{
                editbookhandler()
              }}
            >  
              Edit Book
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
            Edit Book Images
          </div>
          <br/><br/>
          <input type='file' multiple
            onChange={(e)=>{
              const fileList = e.target.files
              if (uploadpicdata[0] == 0){
                base64List = []
              }else{
                var base64List = [...uploadpicdata]
              }
              console.log("value of base64List: ", base64List)
              const readerHandler = (i) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                  base64List.push(e.target.result)
                  if(i<fileList.length - 1){
                    i++
                    readerHandler(i)
                  }else if (i == fileList.length - 1){
                    setUploadpicdata([...base64List])
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

export default EditBook;