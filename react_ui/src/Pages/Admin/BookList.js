import React, {Component, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './admin.css'
// import { observer} from "mobx-react-lite";
// import { toJS } from "mobx"
import Button from '../../Components/SubComponents/Button/Button'
import{
  modifybooklistdb,
  clearbooklistdb
} from '../../Redux/booklistDB'
import {
  toggle
} from '../../Redux/button.js'
import './booklist.css'

const BookList = () => {

  const booklist = useSelector((state)=>state.booklistdb.booklist)
  const buttons = useSelector((state) => state.button.buttons)
  const toggles = useSelector((state) => state.button.toggles)
  const dispatch = useDispatch()

  const [pagenumber, setPagenumber] = useState(1)
  // const [pageArray, setPageArray] = useState([])
  const [displayper, setDisplayper] = useState(25)

  const pageNumberHandler = (numberpages) => {
    console.log('value of numberpages: ', numberpages)
    let pageArray = [...Array(numberpages).keys()].map(x=>++x)
    console.log('value of pageArray: ', pageArray)
    return(
      <div style={{display: 'inline-block'}}>
        {pageArray.map((pageNumberDisp, index)=>{
          return(
            <div
              key={index}
              style={{
                display: 'inline-block',
                cursor: pageNumberDisp==pagenumber?'':'pointer',
                color: pageNumberDisp==pagenumber?'blue':'black',
                fontWeight: pageNumberDisp==pagenumber?'bold':''
              }}
              onClick={()=>{
                if(pageNumberDisp!=pagenumber)
                setPagenumber(pageNumberDisp)
              }}
            >
              {pageNumberDisp}
            </div>
          )
        })}
      </div>
    )
  }

  const booklistTable = (booklist) => {
    let moduluslength = booklist.length % displayper
    let numberpages = Math.floor(booklist.length / displayper) + 1
    let indexstart = (pagenumber-1)*displayper
    let indexend = pagenumber*displayper
    console.log('value of indexstart: ', indexstart)
    return(
      <>
        <table>
          <tr>
            <td className='columnHeaders'>
              Title
            </td>
            <td className='columnHeaders'>
              Subtitle
            </td>
            <td className='columnHeaders'>
              Publisher
            </td>
            <td className='columnHeaders'>
              Current Copyright
            </td>
            <td className='columnHeaders'>
              Edition
            </td>
            <td className='columnHeaders'>
              ISBN
            </td>
          </tr>
          {booklist.map((bookitem, key)=>{
            if(key>=indexstart&&key<indexstart+displayper)
            return(
              <tr key={key}>
                <td>
                  {bookitem.title}
                </td>
                <td>
                  {bookitem.subtitle}
                </td>
                <td>
                  {bookitem.publisher}
                </td>
                <td>
                  {bookitem.currentcopyright}
                </td> 
                <td>
                  {bookitem.bookedition}
                </td>
                <td>
                  {bookitem.isbn}
                </td>
              </tr>
            )
          })}
        </table>
        <br/>
        <div>
          <div 
            className='button'
            style={{
              display: 'inline-block', 
              // float: 'left'
            }}
            onClick={()=>{
              if(pagenumber>1){
                setPagenumber(pagenumber-1)
              }
            }}
          >
            &#x3c;
          </div>
          <span style={{paddingRight: '5px', paddingLeft: '5px'}}>{pageNumberHandler(numberpages)}</span>
          <div 
            className='button'
            style={{
              display: 'inline-block',
              // float: 'right'
            }}
            onClick={()=>{
              if(pagenumber<numberpages){
                setPagenumber(pagenumber+1)
              }
            }}
          >
            &#x3e;
          </div>
        </div>
      </>
    );
  }

  useEffect(()=>{
    //call button once on page load to populate if booklist is currently empty (and has not been populated by addbook)
    dispatch(toggle({buttonName: 'findbooks', displayName: 'Find Books', buttons}))
  }, [])

  return(
    <div>
      BookList
      <br/>
      <br/>
      <Button 
        buttonName='findbooks'
        displayName="Find Books"
      />
      <br/>
      <br/>
      <div className='tableHolder'>
        {booklistTable(booklist)}
      </div>
    </div>
  )
}

export default BookList;