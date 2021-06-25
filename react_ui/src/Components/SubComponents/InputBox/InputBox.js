import React, {Component, useState, useEffect} from 'react';
import './inputbox.css'
import { observer} from "mobx-react-lite";
import { toJS } from "mobx"

import{ 
  modify
} from '../../../Redux/inputtext'
import { useDispatch, useSelector } from 'react-redux';

const InputBox = observer(({title}) => {

  const texts = useSelector((state)=>state.inputtext.texts)
  const titles = useSelector((state)=>state.inputtext.titles)
  const dispatch = useDispatch()

  useEffect(() => {});

  return(
    <>
      <input 
        className='inputBox'
        value={texts[titles.findIndex(element=>element==title)]}
        onChange={(e)=>{
          var titleindex = titles.findIndex(element=>element==title)
          var payload = 
          {
            titleindex,
            title,
            text: e.target.value 
          }
          dispatch(modify(payload))
        }}
      />
    </>
  )
});

export default InputBox;
