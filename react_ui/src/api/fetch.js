import axios from 'axios'

const fetchrequest = () => { 
 fetch('http://localhost:8080/test')
  .then(response => {
    console.log('value of response: ', response)
    return response.json()
  })
  .then(data => {
    console.log(data)
  })
}

export default fetchrequest;
