import React, { Component, createRef } from "react";
import { DataSet, Network} from 'vis-network/standalone/esm/vis-network';
var nodes = new DataSet([
    { id: 1, label: 'Node 1' },
    { id: 2, label: 'Node 2' },
    { id: 3, label: 'Node 3' },
    { id: 4, label: 'Node 4' },
    { id: 5, label: 'Node 5' }
  ]);
  
  // create an array with edges
  var edges = new DataSet([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 }
  ]);
  
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {};
class MyNetwork extends Component {
    


    constructor() {
        super();
        this.state = {  }
        this.network = {};
        this.appRef = createRef();
      }
      add = params => {
        if((params.nodes.length == 0) && (params.edges.length == 0)) {
          var newId = (Math.random() * 1e7).toString(32);
          nodes.add({ id: newId, 
          label: "I'm new!" ,
          x: params.pointer.canvas.x,
          y: params.pointer.canvas.y});
            
        }
    }
      componentDidMount() {
        this.network = new Network(this.appRef.current, data, options);
        this.network.on('click',this.add)
      }
    
      render() {
        return (
          <div>
           
          <div style={{height:600 +'px'}} ref={this.appRef} />
          </div>
        );
      }
    
}
 
export default MyNetwork;