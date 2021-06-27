import React, {Component, useState, useEffect} from 'react';
import './revenueCost.css'
import { observer} from "mobx-react-lite";
import { toJS } from "mobx"
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

  useEffect(()=>{

  })

  return(
    <div>
      <div
        style={{
          fontWeight: 'bold', 
          fontSize: '1.5rem', 
          display: 'inline-block'
        }}
      >
        Revenue/Cost - {indexval} - {rcname}
      </div>
      <br/>
      <div>
        Revenue Cost Name
        <br/>
        <input 
          className='inputBox'
          value={rcnames[indexvals.findIndex(element=>element==indexval)]}
          onChange={(e)=>{
            console.log('value of e.target.value: ', e.target.value)
            console.log('rcnames[indexvals.findIndex(element=>element==indexval)]: ', 
            rcnames[indexvals.findIndex(element=>element==indexval)]
            )
            var indexvalindex = indexvals.findIndex(element=>element==indexval)
            var payload = 
            {
              name: 'rcnames',
              index: indexvalindex,
              value: e.target.value
            }
            dispatch(modifyrc(payload))
          }}
        />
      </div>
      <br/>
      <div>
        Revenue Cost Description
        <br/>
        <InputBox title='subtitle'/>
      </div>
      <br/>
      <div>
        Revenue Cost Value
        <br/>
        <InputBox title='publisher'/>
      </div>
      <br/>
      <div>
        Revenue Cost Date
        <br/>
        <InputBox title='currentcopyright'/>
      </div>
      <br/>
      <div>
        <Button buttonName='deleterevenuecost' displayName='Delete Revenue Cost Entry'/>
      </div>
      <br/>
    </div>
  )
}

export default RevenueCost;