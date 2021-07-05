import React, {Component, useState, useEffect} from 'react';
import './admin.css'
// import { observer} from "mobx-react-lite";
// import { toJS } from "mobx"
import InputBox from '../../Components/SubComponents/InputBox/InputBox'
import Button from '../../Components/SubComponents/Button/Button'
import { useSelector } from 'react-redux';
import RevenueCost from '../../Components/revenueCost/revenueCost';


const AddBook = () => {

  const rcnames = useSelector((state)=>state.revenuecost.rcnames)
  const indexvals = useSelector((state)=>state.revenuecost.indexvals)

  useEffect(()=>{
    console.log('value of rcnames: ', rcnames)
  })

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
    <div>
      <div
        style={{
          fontWeight: 'bold', 
          fontSize: '1.5rem', 
          display: 'inline-block'
        }}
      >
        AddBook
      </div>
      <br/>
      <div>
        ISBN
        <br/>
        <InputBox title='isbn'/>
      </div>
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
        <InputBox title='authorbio'/>
      </div>
      <br/>
      <div>
        Synopsis
        <br/>
        <InputBox title='synopsis'/>
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
  )
}

export default AddBook;