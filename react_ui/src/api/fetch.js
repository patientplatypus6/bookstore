  import axios from 'axios'

const fetchrequest = (payload) => { 
 var url = "http://localhost:8080/"
 var urlfull = url + payload.uri;
 console.log('inside fetchrequest and value of payload: ',
 payload
 )
 console.log("payload.requestType: ", payload.requestType)

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
 }
 
 if(payload.requestType=='get'){
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

 if(payload.requestType=='imagepost'){

  console.log("inside imagepost and value of payload: ", payload)

  var data = new FormData()

  const obj = {
    bookuniqueid: payload.bookuniqueid,
    frontcoverindex: payload.frontcoverindex,
    backcoverindex: payload.backcoverindex
  };
  const json = JSON.stringify(obj);
  const blob = new Blob([json], {
    type: 'application/json'
  });

  payload.files.forEach((file, index)=>{
    //get filenames from redux
    //append bookname to selected 'front cover', 'back cover', etc
    var filename = 'files' + index
    data.append(filename, file)
    console.log('value of data in foreach: ', data)
  })

  data.append("document", blob);

  console.log("data blob: ", data.get('document'))
  console.log("file 0: ", data.get('files0'))
  console.log('value of urlfull in imagepost: ', urlfull)

  return fetch(urlfull, {
    method: 'post', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    },
    body: data
  }).then(response => {
    console.log('value of response: ', response)
    return response.json()
  })
  .then(data => {
    return data
  })
 }

}

export default fetchrequest;