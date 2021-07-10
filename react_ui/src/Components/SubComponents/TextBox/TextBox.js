import React, {Component, useState, useEffect} from 'react';
import './textbox.css'

import{ 
  modify
} from '../../../Redux/inputtext'

// import { observer} from "mobx-react-lite";
import { useDispatch, useSelector } from 'react-redux';

const TextBox = ({title})=>{
  const texts = useSelector((state)=>state.inputtext.texts)
  const titles = useSelector((state)=>state.inputtext.titles)
  const dispatch = useDispatch()

  useEffect(() => {});
  
  return(
    <>
      <div>
        <textarea 
          className='textbox'
          rows="4" cols="30" 
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
      </div>
    </>
  )

}

export default TextBox;
