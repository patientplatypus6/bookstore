
const handlefetch = (payload) => {
  console.log('inside handlefetch and value of payload: ', payload)
  const fetchasync = async () => {
    var fetchresult = await fetchrequest(payload)
    return fetchresult
  }
  return fetchasync();
}


const fetchrequest = (payload) => { 
 if(payload.url == null || payload.url == undefined){
  // var url = "http://localhost:8080/"
  var url="http://"+process.env.REACT_APP_KOTLIN_SERVER_6_URL+":"+process.env.REACT_APP_KOTLIN_SERVER_6_PORT
 }else{
  var url = payload.url
 }

 var urlfull = url + "/" + payload.uri;
 console.log('inside fetchrequest and value of payload: ', payload)
 console.log("payload.requestType: ", payload.requestType)
 console.log("value of url: ", url)
 console.log("value of payload.url: ", payload.url)
 console.log("value of urlfull: ", urlfull)
 if(payload.requestType=='postpic'){
   const formData = new FormData();
   formData.append('fileupload', payload.pic)
   console.log("value of payload.pic: ", payload.pic)
   console.log("in fetch and value of formData: ", formData.get("fileupload"))
   return fetch(urlfull,{
    method: "POST", 
    file: formData
   })
 }
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

 if(payload.requestType=='postcookie'){
  document.cookie = 'usercookie='+localStorage.getItem("cookie")
  console.log("inside postcookie and value of payload: ", payload)
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  console.log("inside postcookie and value of headers: ", headers)
  return fetch(urlfull,{
    method: "post",
    headers,
    credentials: 'include',
    // credentials: 'same-origin', //from same domain
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
    file: data
  }).then(response => {
    console.log('value of response: ', response)
    return response.json()
  })
  .then(data => {
    return data
  })
 }

}

export {fetchrequest, handlefetch};