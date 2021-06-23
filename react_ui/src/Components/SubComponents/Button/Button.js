  import React, {Component,  useState, useEffect} from 'react';
import './button.css'
import { observer } from "mobx-react";
// import {ButtonState} from '../../../MobXDEP/StateDEP';
import {
  toggle
} from '../../../Redux/button.js'
import { useSelector, useDispatch } from 'react-redux'

const Button = ({buttonName}) => {
  const buttons = useSelector((state) => state.button.buttons)
  const toggles = useSelector((state) => state.button.toggles)
  const dispatch = useDispatch()
  const [localButton, setLocalButton] = useState({buttonName: 0})

  useEffect(() => {
    console.log('value of buttons: ', buttons)
    console.log('value of clicks: ', toggles)
    toggles.forEach((toggleTF, index)=>{
      if(toggleTF && buttons[index]==buttonName){
        //button actions go here 
        //create button action js file
        //and async with the dispatch
        dispatch(toggle({buttonName, buttons}))
      }
    })
  });

  return(
    <>
    <div>
      {buttons}{JSON.stringify(toggles)}
    </div>
    <div className='button'
      onClick={()=>{
        console.log('inside onclick')
        dispatch(toggle({buttonName, buttons}))
      }}
    >  
      {buttonName}
    </div>
    </>
  )
}

export default Button;

// const ButtonHandler = ({buttonName, GetButton, click}) => {
//   return(
//     <>
//       <div 
//         className='button'
//         onClick={()=>click()}
//       >
//         {buttonName}
//       </div>
//       <div>
//         clicked: {GetButton.returnClicked} object: {JSON.stringify(GetButton.buttonObj)}
//       </div>
//     </>
//   )
// };

// const Button = ({buttonName}) => {
//   const [ButtonStateGet, ButtonStateGetter] = useState(ButtonState);
//   function click(){
//     ButtonStateGet.click(buttonName)
//   }
//   return(
//     <ButtonHandler
//       buttonName={buttonName} 
//       GetButton={ButtonState}
//       click={()=>{click()}}
//     />
//   )
// }

// export default Button;




// class Button extends Component{
//   render(){
//     return(
//       <div className='button'>
//         {this.props.name}
//       </div>
//     );
//   }
// }

// export default Button;