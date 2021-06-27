import axios from 'axios'

const fetchrequest = (payload) => {
  console.log('inside fetchrequest and payload: ', payload)
  // fetch('http://localhost:8080/comment', { 
  //   credentials: 'same-origin',
  //   mode: 'no-cors', 
  //   crossDomain: true,
  //   headers: {'Content-Type':'application/json'}
  // })
  // .then(response => response.json())
  // .then(data => console.log(data))
  
  fetch('http://localhost:8080/comment')
  .then(response => response.json())
  .then(data => console.log(data))
  
  // const instance = axios.create({
  //   baseURL: "https://jsonplaceholder.typicode.com/",
  //   withCredentials: false,
  //   headers: {
  //     'Access-Control-Allow-Origin' : '*',
  //     'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //     }
  // });
  // instance.get('http://localhost:8080/comment')
  // .then(res=>{
  //   console.log("value of res: ", res)
  // })
  // .catch(err=>console.log(err))
}

export default fetchrequest;