import React, {Component, useState, useEffect} from 'react';
import './admin.css'
import { observer} from "mobx-react-lite";
import { toJS } from "mobx"
import InputBox from '../../Components/SubComponents/InputBox/InputBox'
import Button from '../../Components/SubComponents/Button/Button'

const AddBook = () => {
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
        AddBook
      </div>
      <br/>
      <div>
        Book Title
        <br/>
        <InputBox title='booktitle'/>
      </div>
      <br/>
      <div>
        <Button buttonName='addbook'/>
      </div>
    </div>
  )
}

export default AddBook;