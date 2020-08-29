import React, { Component, createRef } from "react";
import { DataSet, Network} from 'vis-network/standalone/esm/vis-network';
const nodes = new DataSet([
    { id: 1, label: 'Node 1' },
    { id: 2, label: 'Node 2' },
    { id: 3, label: 'Node 3' },
    { id: 4, label: 'Node 4' },
    { id: 5, label: 'Node 5' }
  ]);
  
  // create an array with edges
  const edges = new DataSet([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 }
  ]);
  
  const data = {
    nodes: nodes,
    edges: edges
  };
  const options = {};
class MyNetwork extends Component {
    


    constructor() {
        super();
        this.state = {  }
        this.network = {};
        this.appRef = createRef();
      }
    
      componentDidMount() {
        this.network = new Network(this.appRef.current, data, options);
      }
    
      render() {
        return (
          <div style={{height:600 +'px'}} ref={this.appRef} />
        );
      }
    
}
 
export default MyNetwork;