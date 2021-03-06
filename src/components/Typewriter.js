//https://codepen.io/chrisgannon

import React from "react";
import { TimelineMax, Linear } from "gsap";
// import Lines from "./DataList";
// import data from "./Data";

//{ line: "Hi. I am Jackie."}, 
//{ line: "This is the second line"}, 
//{ line: "This is the third line"}, 

class TypeWriter extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = { 
          _count: 0, 
          currentString: "obj", 
          charCount:0, 
          // messageBodyStr: data, 
          messageBodyStr: " Hi. My name is Jackie.",
          speed:7, 
          character:"|", 
          endFlashSpeed:0, 
          blinkCount:0
        };
        this._currentString = "";
        this._charCount = 0;
        this._blinkCount = 0;
    
        this.onLoaded = this.onLoaded.bind(this);
        this.blink = this.blink.bind(this);
    }
    
   
    onLoaded() {
      let typingTl = new TimelineMax().timeScale(1);
      typingTl.to(this, this.state.messageBodyStr.length/this.state.speed, {
       _charCount:this.state.messageBodyStr.length, 
            ease:Linear.easeNone,
            onUpdate: ()=> this.setState({ charCount: ~~this._charCount }),
            onComplete: ()=> {this.textField.textContent = this.state.messageBodyStr}
       },'+=0.5')
         .to(this,1, {
            onUpdate:this.blink,
            _blinkCount:2,
            repeat:-1, 
            repeatDelay:this.state.endFlashSpeed,
            ease:Linear.easeNone
       })
    }
   
   componentDidMount(){
    this.onLoaded();
   }
   
   componentDidUpdate(prevProps) {
    this._currentString = this.state.messageBodyStr.substring(0, this.state.charCount)+this.state.character;
   }
   
   blink(){
    this.setState({ blinkCount: ~~this._blinkCount });
    this._currentString = (this.state.blinkCount%2) ? this.state.messageBodyStr : this.state.messageBodyStr + this.state.character
   }
  
    render() {
      return (
        <div onLoad={this.startAnim}>       
          <h1 ref={c => (this.textField = c)}>{this._currentString}</h1> 
        </div>
      );
    }
  }

  export default TypeWriter;