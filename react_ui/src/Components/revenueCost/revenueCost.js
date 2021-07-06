import React, {Component, useState, useEffect} from 'react';
import './revenueCost.css'
// import { observer} from "mobx-react-lite";
// import { toJS } from "mobx"
import InputBox from '../../Components/SubComponents/InputBox/InputBox'
import Button from '../../Components/SubComponents/Button/Button'

import{
  addrc,
  removerc,
  modifyrc
} from '../../Redux/revenuecost'
import { useDispatch, useSelector } from 'react-redux';

const RevenueCost = ({indexval, rcname}) => {

  const dispatch = useDispatch()

  const indexvals = useSelector((state)=>state.revenuecost.indexvals)
  const rcnames = useSelector((state)=>state.revenuecost.rcnames)
  const rcdescriptions = useSelector((state)=>state.revenuecost.rcdescriptions)
  const rcvalues = useSelector((state)=>state.revenuecost.rcvalues)
  const rcdates = useSelector((state)=>state.revenuecost.rcdates)


  useEffect(()=>{

  })

  const inputHandler = (name, value) => {
    var indexvalindex = indexvals.findIndex(element=>element==indexval)
    var payload = {
      name, 
      index: indexvalindex,
      value
    }
    dispatch(modifyrc(payload))
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
        Revenue/Cost 
        <br/>
        <span
          style={{fontWeight:'lighter', fontSize: '1rem'}}
        >
          #{indexval}
        </span>
      </div>
      <br/>
      <div>
        Revenue Cost Name
        <br/>
        <input 
          className='inputBox'
          value={rcnames[indexvals.findIndex(element=>element==indexval)]}
          onChange={(e)=>{
            inputHandler('rcnames', e.target.value)
          }}
        />
      </div>
      <br/>
      <div>
        Revenue Cost Description
        <br/>
        <input 
          className='inputBox'
          value={rcdescriptions[indexvals.findIndex(element=>element==indexval)]}
          onChange={(e)=>{
            inputHandler('rcdescriptions', e.target.value)
          }}
        />
      </div>
      <br/>
      <div>
        Revenue Cost Value
        <br/>
        <input 
          className='inputBox'
          value={rcvalues[indexvals.findIndex(element=>element==indexval)]}
          onChange={(e)=>{
            inputHandler('rcvalues', e.target.value)
          }}
        />
      </div>
      <br/>
      <div>
        Revenue Cost Date
        <br/>
        <input 
          className='inputBox'
          value={rcdates[indexvals.findIndex(element=>element==indexval)]}
          onChange={(e)=>{
            inputHandler('rcdates', e.target.value)
          }}
        />
      </div>  
      <br/>
      <div>
        <Button 
          buttonName={"deleterevenuecost"+indexval.toString()} 
          displayName='Delete Revenue Cost Entry'
        />
      </div>
      <br/>
    </div>
  )
}

export default RevenueCost;