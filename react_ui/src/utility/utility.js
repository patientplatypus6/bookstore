
const arraybuffertobase64 = (arraybuffer) => {
  var atobreturn = atob(arraybuffer)
  // console.log(btoareturn)
  return atobreturn
}

function dateFormat (date, fstr, utc) {
  utc = utc ? 'getUTC' : 'get';
  return fstr.replace (/%[YmdHMS]/g, function (m) {
    switch (m) {
    case '%Y': return date[utc + 'FullYear'] (); // no leading zeros required
    case '%m': m = 1 + date[utc + 'Month'] (); break;
    case '%d': m = date[utc + 'Date'] (); break;
    case '%H': m = date[utc + 'Hours'] (); break;
    case '%M': m = date[utc + 'Minutes'] (); break;
    case '%S': m = date[utc + 'Seconds'] (); break;
    default: return m.slice (1); // unknown code, remove %
    }
    // add leading zero if required
    return ('0' + m).slice (-2);
  });
}

const base64FromUrl = async (url) => {
  console.log("*****************************")
  console.log("*****************************")
  console.log("*****************************")
  // fetch(url).then(response=>{
  //   console.log("base64 response is: ", response)
  // })
  // const data = await fetch(url);
  // const blob = await data.blob();
  // return new Promise((resolve) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(blob); 
  //   reader.onloadend = () => {
  //     const base64data = reader.result;   
  //     resolve(base64data);
  //   }
  // });
  console.log("*****************************")
  console.log("*****************************")
  console.log("*****************************")
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// function isInViewport(element) {
//   const rect = element.getBoundingClientRect();
//   return (
//       rect.top >= 0 &&
//       rect.left >= 0 &&
//       rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//       rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//   );
// }


export {arraybuffertobase64, dateFormat, sleep, base64FromUrl}