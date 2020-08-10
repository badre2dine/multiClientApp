import React, { Component } from 'react'
import axios from 'axios'

class Counter extends Component {
    state = { 
        count : 0,
        
     }

     handleIncrement = () =>{

        this.setState({count : this.state.count +1})
     }
    render() { 

        
        return (
        <div>
            
            <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
            <button
             onClick={this.start}
             className="btn btn-secondary btn-sm">start </button>
             <button
             onClick={this.stop}
             className="btn btn-secondary btn-sm">stop</button>
             
        </div>
        
         );
    }
    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += this.state.count === 0 ? "warning" : "primary";

        return classes
    }

    start = event => {
        event.preventDefault();
    
        
    
        axios.get(`https://back-end-dot-servertest-285416.nw.r.appspot.com/start`)
          .then(res => {
            this.setState({count : res.data.some})
          })
      }
      stop = event => {
        event.preventDefault();
    
        
    
        axios.get(`https://back-end-dot-servertest-285416.nw.r.appspot.com/stop`)
          .then(res => {
            this.setState({count : res.data.some})
          })
      }
      callName = event =>  { 
      
        // Use child_process.spawn method from  
        // child_process module and assign it 
        // to variable spawn 
        var spawn = require("child_process").spawn; 
          
        // Parameters passed in spawn - 
        // 1. type_of_script 
        // 2. list containing Path of the script 
        //    and arguments for the script  
          
        // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will 
        // so, first name = Mike and last name = Will 
        var process = spawn('python',["./server.py" ] ); 
      
        // Takes stdout data from script which executed 
        // with arguments and send this data to res object 
        
    } 
    formatCount(){
    const {count }=this.state
    return count === 0 ? "Zero" : count
    }
}
 

export default Counter;