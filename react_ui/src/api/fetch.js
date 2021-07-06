  import axios from 'axios'

const fetchrequest = (payload) => { 
 var url = "http://localhost:8080/"
 var urlfull = url + payload.uri;
 console.log('inside fetchrequest and value of payload: ',
 payload
 )
 if(payload.requestType=='post'){
  return fetch(urlfull,{
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload.body)
  })
  .then(response => {
    console.log('value of response: ', response)
    return response.json()
  })
  .then(data => {
    return data
  })
 }else if(payload.requestType=='get'){
  return fetch(urlfull,{
    method: "get",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log('value of response: ', response)
    return response.json()
  })
  .then(data => {
    return data
  })
 }
}

export default fetchrequest;