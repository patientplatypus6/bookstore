import React, {Component, useState, useEffect} from 'react';
import './admin.css'
import { useHistory } from "react-router-dom";
import './booklist.css'
import fetchrequest from '../../api/fetch'

const AdminDashboard = () => {

  let history = useHistory();

  const [booklist, setBooklist] = useState([])
  const [pagenumber, setPagenumber] = useState(1)
  const [displayper, setDisplayper] = useState(25)
  const [dashmessage, setDashmessage] = useState("Welcome to the Administator dashboard! \n Action messages will appear hear from state changes in the database \n Thank you!")

  const handlefetch = (payload) => {
    const fetchasync = async () => {
      var fetchresult = await fetchrequest(payload)
      return fetchresult
    }
    return fetchasync();
  }

  const deletebookhandler = (title, uniqueid) => {
    console.log("inside deletebookhandler and value of uniqueid: ", uniqueid)
    var payload = {
      body: {
        bookid: uniqueid
      }
    }
    payload.uri='book/deletebook' 
    payload.requestType='post'
    handlefetch(payload).then(result=>{
      findbooks()
      setDashmessage(`Book with title ${title} and id ${uniqueid} \n has been deleted from the database...`)
    })
  }

  const findbooks = () => {
    var payload = {}
    payload.uri='book/findbooks' 
    payload.requestType='get'
    handlefetch(payload).then(result=>{
      setBooklist(result)
    })
  }

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
              Author
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
                  {bookitem.author}
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
                <td>
                  <div
                    className='button'
                    onClick={()=>{
                      history.push({
                        pathname: '/admin/editbook',
                        state: { bookitem: bookitem }
                      })
                    }}
                  >
                    EDIT BOOK
                  </div>
                </td>
                <td>
                  <div
                    className='button'
                    style={{background: "red"}}
                    onClick={()=>{
                      deletebookhandler(bookitem.title, bookitem.uniqueid)
                    }}
                  >
                    DELETE BOOK
                  </div>
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
    findbooks()
    console.log("value of history: ", history)
    if(history!=undefined && history.location!=null && history.location.dashmessage!=null & history.location.dashmessage!=undefined){
      setDashmessage(history.location.dashmessage)
    }
  }, [])


  return(
    <div>
      <div
        style={{
          color: "rgb(0,250,0)", 
          width: '60%',
          textAlign: 'left', 
          display: "inline-block",
          background: 'black', 
          borderRadius: '5px', 
          padding: "10px",
          whiteSpace: "pre-line", 
          marginBottom: '10px'
        }}
      >
        {dashmessage}
      </div>
      <div
        style={{
          fontWeight: 'bold', 
          fontSize: '1.5rem', 
          background: 'grey'
        }}
      >
        Administrator Actions
      </div>
      <br/>
      <div 
        style={{
          display: 'inline-block', 
          textAlign: 'center'
        }}
      > 
        <span style={{marginLeft: "5px", marginRight: "5px"}}>
          <div
            className="button"
            onClick={()=>{
              history.push({
                pathname: '/admin/addrevenuecost'
              })
            }}
          >
            Add Revenue/Cost
          </div>
        </span>
        <span style={{marginLeft: "5px", marginRight: "5px"}}>  
          <div
            className="button"
            onClick={()=>{
              history.push({
                pathname: '/admin/addbook'
              })
            }}
          >
            Add Book
          </div>
        </span>
        <span style={{marginLeft: "5px", marginRight: "5px"}}>
          <div
            className="button"
            style={{background: "red"}}
          >
            Log Out
          </div>
        </span>
      </div>
      <br/> 
      <br/>
      <div
        style={{
          fontWeight: 'bold', 
          fontSize: '1.5rem', 
          background: "grey"
        }}
      >
        Book Inventory Past & Future
      </div>
      <br/>
      <br/>
      <div className='tableHolder'>
        {booklistTable(booklist)}
      </div>
      <br/> 
      <br/>
      <div
        style={{
          fontWeight: 'bold', 
          fontSize: '1.5rem', 
          background: "grey"
        }}
      >
        Revenue Cost Table
      </div>
    </div>
  )
}

export default AdminDashboard;