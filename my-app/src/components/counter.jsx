import React, { Component } from 'react'
import axios from 'axios'
class Counter extends Component {
    state = { 
        count : 1,
        imageUrl: 'https://picsum.photos/200'
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
             className="btn btn-secondary btn-sm">stop </button>
             <button
             onClick={this.callName}
             className="btn btn-secondary btn-sm">call </button>
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
    
        
    
        axios.get(`strat`)
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }
      stop = event => {
        event.preventDefault();
    
        
    
        axios.get(`stop`)
          .then(res => {
            console.log(res);
            console.log(res.data);
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