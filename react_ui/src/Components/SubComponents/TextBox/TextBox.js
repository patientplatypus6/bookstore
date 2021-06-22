import React, {Component} from 'react';
import './textbox.css'

class TextBox extends Component{
  state={
    textvalue: ''
  }

  render(){
    return(
      <div>
        <textarea 
          className='textbox'
          rows="4" cols="50"
          value={this.state.textvalue} 
          onChange={(e)=>{
            this.setState({textvalue: e.target.value})
          }}
        />
      </div>
    );
  }
}

export default TextBox;