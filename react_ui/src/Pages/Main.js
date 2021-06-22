import React, {Component} from 'react';
import Button from '../Components/SubComponents/Button/Button'
import InputBox from '../Components/SubComponents/InputBox/InputBox'
import TextBox from '../Components/SubComponents/TextBox/TextBox'
import {ButtonState} from '../MobXDEP/StateDEP'
import { observer, useObserver} from "mobx-react";



class Main extends React.Component{

  render(){
    return(
      <div>
        This is main
        <div/>
        <Button 
          buttonName='testbutton' 
          // buttonState={ButtonState}
        />
        <InputBox
          buttonName='testbutton'
          // buttonState={ButtonState}
        />
        <TextBox
          // buttonState={ButtonState}
        />
      </div>
    );
  }
}

export default Main;



// const Wrapper = observer(({buttonState})=> {
//   return(
//     <div>
//       This is main
//       <div/>
//       <Button 
//         buttonName='testbutton' 
//         buttonState={buttonState}
//       />
//       <InputBox
//         buttonName='testbutton'
//         returnButtonObj={buttonState.returnButtonObj}
//       />
//       <TextBox
//         buttonState={ButtonState}
//         returnButt onObj={buttonState.returnButtonObj}
//       />
//     </div>
//   )
// })

// const Main = () => {
//   return(
//     <div>
//       <Wrapper buttonState={ButtonState}/>
//     </div>
//   )
// }