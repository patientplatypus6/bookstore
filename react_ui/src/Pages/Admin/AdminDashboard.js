import React, {Component, useState, useEffect} from 'react';
import './admindashboard.css'
import { useHistory } from "react-router-dom";
// import './booklist.css'
import {fetchrequest, handlefetch} from '../../api/fetch'

const AdminDashboard = () => {

  let history = useHistory();

  const [booklist, setBooklist] = useState([])
  const [revenuecostlist, setRevenuecostlist] = useState([])
  const [pagenumberbook, setPagenumberbook] = useState(1)
  const [pagenumberrevenuecost, setPagenumberrevenuecost] = useState(1)
  const [displayper, setDisplayper] = useState(25)
  const [dashmessage, setDashmessage] = useState("Welcome to the Administator dashboard! \n Action messages will appear hear from state changes in the database \n Thank you!")

  const [totalcost, setTotalcost] = useState(0)
  const [totalrevenue, setTotalrevenue] = useState(0)
  const [totalprojectedcost, setTotalprojectedcost] = useState(0)
  const [totalprojectedrevenue, setTotalprojectedrevenue] = useState(0)

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
      console.log("value of booklist: ", booklist)
      setBooklist(result)
    })
  }

  const totalscalculationrevenuecost = () => {

    var temptotalcost = 0
    var temptotalrevenue = 0
    var temptotalprojectedrevenue = 0
    var temptotalprojectedcost = 0

    revenuecostlist.forEach(rc=>{
      var costitem = 
      (rc.rcname.includes("COST") &&
      !rc.rcname.includes("PROJECTED"))?
      rc.rcvalue:'0'
      var revenueitem = 
      (rc.rcname.includes("REVENUE") &&
      !rc.rcname.includes("PROJECTED"))?
      rc.rcvalue:'0'
      var costitemprojected = 
      (rc.rcname.includes("COST") &&
      rc.rcname.includes("PROJECTED"))?
      rc.rcvalue:'0'
      var revenueitemprojected = 
      (rc.rcname.includes("REVENUE") &&
      rc.rcname.includes("PROJECTED"))?
      rc.rcvalue:'0'

      temptotalcost += parseFloat(costitem)
      temptotalrevenue += parseFloat(revenueitem)
      temptotalprojectedrevenue += parseFloat(revenueitemprojected)
      temptotalprojectedcost += parseFloat(costitemprojected)

      console.log("&&&&&&&rc: ", rc)
    })

    setTotalcost(temptotalcost)
    setTotalrevenue(temptotalrevenue)
    setTotalprojectedcost(temptotalprojectedcost)
    setTotalprojectedrevenue(temptotalprojectedrevenue)
  
  }

  useEffect(()=>{
    totalscalculationrevenuecost()
  }, [revenuecostlist])

  const findrevenuecosts = () => {
    var payload = {}
    payload.uri='revenuecost/allrevenuecosts' 
    payload.requestType='get'
    handlefetch(payload).then(result=>{
      console.log("value of revenuecosts list: ", result)
      setRevenuecostlist(result)
    })
  }

  const pageNumberHandler = (numberpages, pagenumber, type) => {
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
                if(type=='book'){
                  setPagenumberbook(pageNumberDisp)
                }else if(type=='revenuecost'){
                  setPagenumberrevenuecost(pageNumberDisp)
                }
              }}
            >
              {pageNumberDisp}
            </div>
          )
        })}
      </div>
    )
  }

  const totalrevenuecostsTable = () => {
    return(
      <table>
        <tr>
          <td className='columnHeaders'>
            Revenue
          </td>
          <td className='columnHeaders'>
            Cost
          </td>
        </tr>
        <tr>
          <td className='columnHeaders' style={{color: 'green'}}>
            {totalrevenue}
          </td>
          <td className='columnHeaders' style={{color: 'red'}}>
            {totalcost}
          </td>
        </tr>
      </table>
    )
  }

  const revenuecostlistTable = (revenuecostlist) => {
    let numberpages = Math.floor(revenuecostlist.length / displayper) + 1
    let indexstart = (pagenumberrevenuecost-1)*displayper
    return(
      <>
        <table>
          <tr>
            <td className='columnHeaders'>
              
            </td>
            <td className='columnHeaders' colSpan='2'>
              Actual
            </td>
            <td className='columnHeaders' colSpan='2'>
              Projected
            </td>
            <td className='columnHeaders'>
              
            </td>
            <td className='columnHeaders'>

            </td>
            <td className='columnHeaders'>
              
            </td>
          </tr>
          <tr>
            <td className='columnHeaders'>
              Description
            </td>
            <td className='columnHeaders'>
              Revenue
            </td>
            <td className='columnHeaders'>
              Cost
            </td>
            <td className='columnHeaders'>
              Revenue
            </td>
            <td className='columnHeaders'>
              Cost
            </td>
            <td className='columnHeaders'>
              Date
            </td>
            <td className='columnHeaders'>
              Book ID
            </td>
            <td className='columnHeaders'>
              ID
            </td>
          </tr>
          {revenuecostlist.map((revenuecostitem, key)=>{

            var costitem = 
            (revenuecostitem.rcname.includes("COST") &&
            !revenuecostitem.rcname.includes("PROJECTED"))?
            revenuecostitem.rcvalue:'0'
            var revenueitem = 
            (revenuecostitem.rcname.includes("REVENUE") &&
            !revenuecostitem.rcname.includes("PROJECTED"))?
            revenuecostitem.rcvalue:'0'
            var costitemprojected = 
            (revenuecostitem.rcname.includes("COST") &&
            revenuecostitem.rcname.includes("PROJECTED"))?
            revenuecostitem.rcvalue:'0'
            var revenueitemprojected = 
            (revenuecostitem.rcname.includes("REVENUE") &&
            revenuecostitem.rcname.includes("PROJECTED"))?
            revenuecostitem.rcvalue:'0'

            if(key>=indexstart&&key<indexstart+displayper)
            return(
              <tr key={key}>
                <td>
                  {revenuecostitem.rcdescription}
                </td>
                <td style={{color: 'green', fontWeight: 'bold'}}>
                  {revenueitem}
                </td>
                <td style={{color: 'red', fontWeight: 'bold'}}>
                  {costitem}
                </td>
                <td style={{color: 'green', fontWeight: 'bold', background:'rgba(200,200,200,0.3)'}}>
                  {revenueitemprojected}
                </td>
                <td style={{color: 'red', fontWeight: 'bold', background:'rgba(200,200,200,0.3)'}}>
                  {costitemprojected}
                </td>
                <td>
                  {new Date(revenuecostitem.rcdate).toISOString()}
                </td>
                <td>
                  {revenuecostitem.bookuniqueid}
                </td>
                <td>
                  {revenuecostitem.uniqueid}
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
            if(pagenumberrevenuecost>1){
              setPagenumberrevenuecost(pagenumberrevenuecost-1)
            }
          }}
        >
          &#x3c;
        </div>
        <span style={{paddingRight: '5px', paddingLeft: '5px'}}>{pageNumberHandler(numberpages, pagenumberrevenuecost, 'revenuecost')}</span>
        <div 
          className='button'
          style={{
            display: 'inline-block',
            // float: 'right'
          }}
          onClick={()=>{
            if(pagenumberrevenuecost<numberpages){
              setPagenumberrevenuecost(pagenumberrevenuecost+1)
            }
          }}
        >
          &#x3e;
        </div>
        </div>
      </>
    )
  }

  const booklistTable = (booklist) => {
    let numberpages = Math.floor(booklist.length / displayper) + 1
    let indexstart = (pagenumberbook-1)*displayper
    return(
      <>
        <table>
          <tr>
            <td className='columnHeaders'>
              Title
            </td>
            <td className='columnHeaders'>
              Author
            </td>
            <td className='columnHeaders'>
              Publisher
            </td>
            <td className='columnHeaders'>
              ISBN
            </td>
            <td className='columnHeaders'>
              ID
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
                  {bookitem.author}
                </td>
                <td>
                  {bookitem.publisher}
                </td>
                <td>
                  {bookitem.isbn}
                </td>
                <td>
                  {bookitem.uniqueid}
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
              if(pagenumberbook>1){
                setPagenumberbook(pagenumberbook-1)
              }
            }}
          >
            &#x3c;
          </div>
          <span style={{paddingRight: '5px', paddingLeft: '5px'}}>{pageNumberHandler(numberpages, pagenumberbook, 'book')}</span>
          <div 
            className='button'
            style={{
              display: 'inline-block',
              // float: 'right'
            }}
            onClick={()=>{
              if(pagenumberbook<numberpages){
                setPagenumberbook(pagenumberbook+1)
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
    findrevenuecosts()
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
          marginTop: '20px',
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
        Revenue Costs
      </div>
      <br/>
      <br/>
      <div 
        style={{
          fontWeight: 'bold',
          fontSize: '1.5rem', 
          marginBottom: '20px'
        }}
      >
        Total Revenue Costs
      </div>
      <div className='tableHolder'>
        {totalrevenuecostsTable()}
      </div>        
      <br/>
      <br/>
      <div 
        style={{
          fontWeight: 'bold',
          fontSize: '1.5rem', 
          marginBottom: '20px'
        }}
      >
        Revenue Costs Table
      </div>
      <div className='tableHolder'>
        {revenuecostlistTable(revenuecostlist)}
      </div>
      <br/> 
      <br/>
    </div>
  )
}

export default AdminDashboard;