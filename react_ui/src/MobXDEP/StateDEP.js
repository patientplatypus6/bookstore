// import { makeObservable, observable, action, toJS, computed} from "mobx"

// class ButtonStateClass {
//   buttonObj = {}
//   clicked = '';
//   constructor(){
//     makeObservable(this, {
//       clicked: observable,
//       buttonObj: observable,
//       click: action, 
//       returnButtonObj: computed,
//       returnClicked: computed
//     })
//   }
//   click(buttonName){
//     console.log('in click')
//     this.clicked = buttonName;
//     var tempButtonObj = this.buttonObj;
//     if(tempButtonObj.hasOwnProperty(buttonName)){
//       if(tempButtonObj[buttonName]>999999){
//         tempButtonObj[buttonName] = 0 
//       }else{
//         tempButtonObj[buttonName] = tempButtonObj[buttonName]+1
//       }
//     }else{
//       tempButtonObj[buttonName] = 1
//     }
//     console.log('value of buttonObj: ', this.buttonObj)
//   }
//   get returnButtonObj(){
//     console.log('in returnButtonObj')
//     return toJS(this.buttonObj)
//   }
//   get returnClicked(){
//     console.log('in returnClicked')
//     return this.clicked
//   }
// }

// class TodoStateClass {
//   id = Math.random()
//   title = ""
//   finished = false

//   constructor(title) {
//     makeObservable(this, {
//       title: observable,
//       finished: observable,
//       toggle: action
//     })
//     this.title = title
//   }

//   toggle() {
//     this.finished = !this.finished
//   }
// }
// let ButtonState = null;

// function UpdateButtonState(payload){
//   console.log('updateButton payload: ', payload)
//   ButtonState.setVars(payload)
// }

// class ButtonStateClass {
//   constructor(buttonName){
//     this.buttonName = buttonName;
//     this.clicked = '';
//     this.buttonObj = {}
//   }
//   update(){
//     var payload = {
//       buttonName: this.buttonName, 
//       clicked: this.clicked,
//       buttonObj: this.buttonObj
//     }
//     console.log('update payload: ', payload)
//     UpdateButtonState(payload)
//   }
//   click(buttonName){
//     console.log('in click')
//     this.clicked = buttonName;
//     this.buttonName = buttonName
//     var tempButtonObj = this.buttonObj;
//     console.log('value of buttonObj: ', this.buttonObj)
//     if(tempButtonObj.hasOwnProperty(this.buttonName)){
//       console.log("value of tempButtonObj: ", tempButtonObj)
//       if(tempButtonObj[this.buttonName]>999999){
//         tempButtonObj[this.buttonName] = 0 
//       }else{
//         tempButtonObj[this.buttonName] = tempButtonObj[this.buttonName]+1
//       }
//     }else{
//       console.log("value of tempButtonObj: ", tempButtonObj)
//       tempButtonObj[this.buttonName] = 1
//       console.log("value of tempButtonObj: ", tempButtonObj)
//     }
//     this.buttonObj = tempButtonObj;
//     this.update();
//   }
//   get returnButtonObj(){
//     console.log('in returnButtonObj')
//     return toJS(this.buttonObj)
//   }
//   get returnClicked(){
//     console.log('in returnClicked')
//     return this.clicked
//   }
//   setVars(payload){
//     console.log('setVars payload: ', payload)
//     this.buttonName = payload.buttonName;
//     this.clicked = payload.clicked;
//     this.buttonObj = payload.clicked;
//   }
// }


// function ButtonStateSet(){
//   if (!ButtonState)
//     ButtonState = new ButtonStateClass();
//   return ButtonState;
// };
// ButtonStateSet();
// export{ButtonState};

// // export function setButtonStateClass(){
// //   if (!ButtonState)
// //     ButtonState = new ButtonStateClass();

// // };

// // let TodoState = null;
// // export function TodoStateHandler(){
// //   if (!TodoState)
// //     TodoState = new TodoStateClass();
// //   return TodoState;
// // };

// // export function setTodoStateClass(updates){
// //   if (!TodoState)
// //     TodoState = new TodoStateClass();
// //   TodoState = TodoStateClass(updates);
// // };

// // export{ButtonStateClass, TodoStateClass}

// // export default ButtonState



// // class ButtonStateClass{
// //   static newInstance(){
// //     if (!localInstance)
// //       localInstance = new ButtonStateClass();
// //     return localInstance;
// //   }
// // }

// // class TodoClass{
// //   static newInstance(){
// //     if (!localInstance)
// //       localInstance = new ButtonStateClass();
// //     return localInstance;
// //   }
// // // }

// // const ButtonState = 
// // const Todo = new TodoClass();
