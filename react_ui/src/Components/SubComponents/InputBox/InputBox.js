import React, {Component, useState, useEffect} from 'react';
import './inputbox.css'
import { observer} from "mobx-react-lite";
import { toJS } from "mobx"

const InputBox = observer(({buttonName,buttonState}) => {

  const [localButtonState, setLocalButtonState] = useState('init');
 
  // const [localButtonState] = useState(() =>
  //   observable({
  //     secondsPassed: 0
  //   })
  // )

  useEffect(() => { 
    console.log('value of buttonState: ', buttonState)
  });

  return(
    <>
      <input 
        className='inputBox'
        value={buttonState}
        // value={this.state.inputvalue} 
        // onChange={(e)=>{
        //   this.setState({inputvalue: e.target.value})
        // }}
      />
    </>
  )
});

export default InputBox;



// class InputBox extends Component{
//   state={
//     inputvalue: ''
//   }

//   render(){
//     return(
//       <div>
//         <input 
//           className='inputBox'
//           value={this.state.inputvalue} 
//           onChange={(e)=>{
//             this.setState({inputvalue: e.target.value})
//           }}
//         />
//       </div>
//     );
//   }
// }

// export default InputBox;