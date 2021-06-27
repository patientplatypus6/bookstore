  import React, {Component,  useState, useEffect} from 'react';
import './button.css'
import { observer } from "mobx-react";
// import {ButtonState} from '../../../MobXDEP/StateDEP';
import {
  toggle
} from '../../../Redux/button.js'
import { useSelector, useDispatch } from 'react-redux'

const Button = ({buttonName, displayName}) => {

  const buttons = useSelector((state) => state.button.buttons)
  const toggles = useSelector((state) => state.button.toggles)
  const dispatch = useDispatch()

  useEffect(() => {});

  return(
    <>
    <div className='button'
      onClick={()=>{
        dispatch(toggle({buttonName, displayName, buttons}))
      }}
    >  
      {displayName}
    </div>
    </>
  )
}

export default Button;