import React, {Component, useState, useEffect} from 'react';
import './admin.css'
import {dateFormat} from '../../utility/utility'
import {fetchrequest, handlefetch} from '../../api/fetch'

import { useHistory } from "react-router-dom";

const AddRevenueCost = () => {

  let history = useHistory();

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
  const [uploadpicdata, setUploadpicdata] = useState([0])
  const [picfrontindex, setPicfrontindex] = useState(0)
  const [picbackindex, setPicbackindex] = useState(0)  

  useEffect(()=>{
  })

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
    setUploadpicdata([0])
    setPicfrontindex(0) 
    setPicbackindex(0)
  }

  const addrevenuecosthandler = () => {

    console.log("value of revenuecostitem: ", revenuecostitem)

    var payload = {
      body: {
        revenuecost: revenuecostitem
        // hello: "test"
      }, 
      requestType:"post",
      uri:"revenuecost/addrevenuecosts"
    }

    handlefetch(payload).then(result=>{
      console.log("**********************")
      console.log("**********************")
      console.log("**********************")

      console.log("value of results: ", result)
      
      console.log("**********************")
      console.log("**********************")
      console.log("**********************")
      history.push({
        pathname: '/admin/dashboard',
        dashmessage: `Revenue cost has been added to database`
      })
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
          <select
            onChange={(e)=>{
              console.log("value of e.target.value: ", e.target.value)
              var temprevenuecostitem = revenuecostitem
              temprevenuecostitem[itemindex]['rcname'] = e.target.value
              setRevenuecostitem([...temprevenuecostitem])
            }}
          >
            <option value={'COST - MONTHLY (HOSTING)'}>
              COST - MONTHLY (HOSTING)
            </option>
            <option value={'COST - STRIPE CHARGE NON-UNIT (PROJECTED)'}>
              COST - STRIPE CHARGE (PROJECTED)
            </option>
            <option value={'COST - STRIPE CHARGE NON-UNIT (SOLD)'}>
              COST - STRIPE CHARGE (SOLD)
            </option>
            <option value={'COST - OTHER FIXED'}>
              COST - OTHER FIXED
            </option>
            <option value={'COST - OTHER VARIABLE'}>
              COST - OTHER VARIABLE
            </option>
            <option value={'COST - OTHER FIXED (PROJECTED)'}>
              COST - OTHER FIXED (PROJECTED)
            </option>
            <option value={'COST - OTHER VARIABLE (PROJECTED)'}>
              COST - OTHER VARIABLE (PROJECTED)
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

              if(newcostindex.length==0){
                history.push({
                  pathname: '/admin/dashboard',
                  dashmessage: `No revenue costs have been added`
                })
              }

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

  const initrc = () => {

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
  }

  useEffect(()=>{
    initrc()
  }, [])

  return(
    <>
      <div
        style={{
          background: 'rgb(100,0,0)', 
          display: 'inline-block', 
          padding: '20px', 
          verticalAlign: 'top',
          marginBottom: '20px', 
          marginTop: '20px'
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
            Add Revenue Cost
          </div>
          <br/>
          <br/>
          {revenuecostHandler()}
          <div>
          <div className='button'
            onClick={()=>{
              initrc()
            }}
          >  
            Add Revenue Cost Item
          </div>
          </div>
          <br/>
          <div>
            <div className='button'
              onClick={()=>{
                addrevenuecosthandler()
              }}
            >  
              Add Revenue Costs
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddRevenueCost;