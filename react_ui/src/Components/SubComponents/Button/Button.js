  import React, {Component,  useState, useEffect} from 'react';
import './button.css'
import { observer } from "mobx-react";
// import {ButtonState} from '../../../MobXDEP/StateDEP';
import {
  toggle
} from '../../../Redux/button.js'
import { useSelector, useDispatch } from 'react-redux'

const Button = ({buttonName}) => {
  const buttons = useSelector((state) => state.button.buttons)
  const toggles = useSelector((state) => state.button.toggles)
  const dispatch = useDispatch()

  useEffect(() => {
    // toggles.forEach((toggleTF, index)=>{
    //   if(toggleTF && buttons[index]==buttonName){
    //     dispatch(toggle({buttonName, buttons}))
    //   }
    // })
  });

  return(
    <>
    <div className='button'
      onClick={()=>{
        dispatch(toggle({buttonName, buttons}))
      }}
    >  
      {buttonName}
    </div>
    </>
  )
}

export default Button;