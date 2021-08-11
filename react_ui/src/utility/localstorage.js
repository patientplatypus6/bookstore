
const cartholdername = () => {
  if(localStorage.getItem("username") == null && localStorage.getItem("guestname")!= null){
    return localStorage.getItem('guestname')
  }else if(localStorage.getItem("guestname") == null && localStorage.getItem("username")!= null){
    return localStorage.getItem('username')
  }else{
    return ""
  }
}

const cartholderloggedin = () => {
  if(localStorage.getItem("username") == null && localStorage.getItem("guestname")!= null){
    return false
  }else{
    return true
  }
}


export {cartholdername, cartholderloggedin}