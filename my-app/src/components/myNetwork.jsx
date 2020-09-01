import { Button, Box, Container, Grid, Paper, ThemeProvider } from '@material-ui/core';
import React, { Component, createRef } from "react";
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

var nodes = new DataSet();
  
  // create an array with edges
  var edges = new DataSet();
  
  var data = {
    nodes: nodes,
    edges: edges
  };
  
class MyNetwork extends Component {
    


    constructor() {
        super();
        this.state = { 
          open:false,
          save:"",
          nodeName:0,
          edgeName:1,
          action:""
         }

        this.incidentMatrix=[]
        this.lastNode=0;
        this.network = {};
        this.appRef = createRef();
        this.options = {
          interaction: { hover: true },
          manipulation: {
            enabled: true,
            addNode: this.addNode,
            addEdge:this.addEdge
          },
        };
      }
      
      // for any any input value name change its state 
      handleChange = input => event => {
        this.setState({[input]:event.target.value})
      }
      /// add node function uses for adding a node ///
      addNode = (nodeData,callback)=>
      {
        this.setState({action: "addNode"})
        this.setState({nodeName: this.lastNode++})
        this.setState({open: true});
        
        
        this.setState({save : ()=>{
          nodeData.label = ""+this.state.nodeName;
          callback(nodeData);
          
          this.setState({open: false});
          
        }})
        
      }

      /// because it is an undirect  graph so we have a symetric matrix and we can change the incident matrix to vector
      /// lenght of the vector is n(n-1)/2
      /// operation from f(i,j) => f(x) where x = (j-1)+i*(n-i)  0,1,2,3,4
      /// n= trunc(1/2 (-sqrt(-8 a + 4 k^2 - 4 k + 1) + 2 k - 1))  the prouve is on my paper 
      /// f(i,j)=i(2n-3-i)/2+j-1

      n=5
      matrix_to_vect(i,j)
      {
        const n =nodes.length   
        const index = i*(2*n-3-i)/2+j-1
        console.log(index)
        console.log(index)
        return  index


      }

      vect_to_matrix(x)
      {

        const n =nodes.length   
        const i =Math.trunc((-Math.sqrt(-8*x+4*(n**2)-4*n+1)+2*n-1)/2)
        const j =x+1-i*(2*n-3-i)/2
        return [i,j]
      }
      saveData  = ()=>{
        
        const n =nodes.length   
       
        
        var help=[]
        var i=0
        
        this.incidentMatrix=new Array(n*(n-1)/2)
        for (var j=0;j<n*(n-1)/2;j++)
          this.incidentMatrix[j]=0
        nodes.forEach((e,index,o)=>{
          help[index]=i;
         
          i++
        } );
        
        edges.forEach((e)=>{
          if(help[e.from]<help[e.to]){
          this.incidentMatrix[this.matrix_to_vect(help[e.from],help[e.to])]=1
          console.log([help[e.from],help[e.to]])
          
          }
          else {
          this.incidentMatrix[this.matrix_to_vect(help[e.to],help[e.from])]=1
          console.log([help[e.to],help[e.from]])
          
          }
          
         } 
         );
         
         console.log(this.incidentMatrix)
      }


      addEdge = (edgeData,callback)=>
      {

        this.setState({action: "addEdge"})
        
        this.setState({open: true});
        
        
        this.setState({save : ()=>{
          edgeData.label = ""+this.state.edgeName;
          callback(edgeData);
          
          this.setState({open: false});
          
        }})
        
      }
      componentDidMount() {
        
        this.network = new Network(this.appRef.current, data, this.options);
        this.network.on("click",(e)=> {
            this.selectedNodes=e.nodes;
            this.selectedEdges=e.edges;
        })
        
      }
       handleClickOpen = () => {
        this.setState({open: true});
      };
    
       handleClose = () => {
        this.lastNode--;
        this.setState({open: false});
        
      };
      keyHandle=(event)=>{
          console.log(event.keyCode)
          switch(event.keyCode)
          {
            case 46 : this.network.deleteSelected();console.log("go")
            case 32 : console.log(this.network)
          }

      }
      render() {

        switch(this.state.action)
        {
          case "addNode": this.Dialog=
          <div >
            <DialogTitle id="form-dialog-title">Nouveau noeud</DialogTitle>
            <DialogContent>
              
              <TextField
                autoFocus
                
                id="Noeud"
                label="Nom du noeud"
                onChange={this.handleChange('nodeName')}
                defaultValue={this.state.nodeName}
                
              />
              </DialogContent>
          </div>
          break;
          case "addEdge": this.Dialog=
          <div >
            <DialogTitle id="form-dialog-title">Nouveau arete</DialogTitle>
            <DialogContent>
              
              <TextField
                autoFocus
                
                id="Edge"
                label="Nom d'arete"
                onChange={this.handleChange('edgeName')}
                defaultValue={this.state.edgeName}
                
              />
              </DialogContent>
          </div>
        }
          
        
        return (
        <div>
        
        <Container >
        <Dialog open={this.state.open} onClose={this.handleClose}>
          
        {this.Dialog}
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            annuler
          </Button>
          <Button onClick={this.state.save} color="primary">
            valider
          </Button>
        </DialogActions>
            </Dialog>
              <Grid
              container
              direction="row"
              
             >    
             <Grid item xs={12} md={2}><Button onClick={this.saveData} variant="contained"  color="primary">Hello World</Button></Grid>
                  
                  <Grid item xs={12} md={10} > <Paper onKeyDown={this.keyHandle} style={{height:600 +'px',
                width:100+"%"}} ref={this.appRef} /></Grid>
                 
              </Grid>
              
              
            </Container>
          </div>

        );
      }
    
}
 
export default MyNetwork;