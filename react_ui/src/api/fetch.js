import axios from 'axios'

const fetchrequest = (payload) => { 
 var url = "http://localhost:8080/test/"
 console.log('value of payload: ', payload)
  //  payload.requestType = 'testpost'
  //  payload.uri='post'
 if(payload.requestType=='comment'){
  return fetch(url+'comment')
  .then(response => {
    console.log('value of response: ', response)
    return response.json()
  })
  .then(data => {
    return data
  })
 }else if(payload.requestType=='testpost'){
  return fetch(url+payload.uri,{
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({author: 'test2', content: 'test2'})
  })
  .then(response => {
    console.log('value of response: ', response)
    return response.json()
  })
  .then(data => {
    console.log('value of data: ', data)
    return data
  })
 }else if(payload.requestType=='post'){
  return fetch(url+payload.uri,{
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
 }
}

export default fetchrequest;
