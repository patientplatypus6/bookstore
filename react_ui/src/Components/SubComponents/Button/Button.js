  import React, {Component,  useState, useEffect} from 'react';
import './button.css'
import { observer } from "mobx-react";
// import {ButtonState} from '../../../MobXDEP/StateDEP';
import {
  click
} from '../../../Redux/button.js'
import { useSelector, useDispatch } from 'react-redux'

const Button = ({buttonName}) => {
  const buttons = useSelector((state) => state.button.buttons)
  const clicks = useSelector((state) => state.button.clicks)
  const dispatch = useDispatch()
  return(
    <>
    <div>
      {buttons}{clicks}
    </div>
    <div className='button'
      onClick={()=>{
        console.log('inside onclick')
        dispatch(click({buttonName, buttons}))
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