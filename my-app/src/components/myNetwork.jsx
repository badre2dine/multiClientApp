import { Button, Box, Container, Grid, Paper, ThemeProvider, List, Avatar } from '@material-ui/core';
import Plot from 'react-plotly.js';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import React, { Component, createRef } from "react";
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from'axios'
import TimelineIcon from '@material-ui/icons/Timeline';
import DeleteIcon from '@material-ui/icons/Delete';

  
 
  
class MyNetwork extends Component {
    


    constructor() {
        super();
        this.state = { 
          open:false,
          save:"",
          nodeName:0,
          edgeName:1,
          action:" "
         }
         var data = [
          {
            x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
            y: [1, 3, 6],
            type: 'scatter'
          }
        ];
        
           
        this.incidentMatrix={'indices':[],'values':[]};
        this.nodes=new DataSet()
        this.edges=new DataSet()
        this.lastNode=0;
        this.groups={}
        this.network = {};
        this.appRef = createRef();
        this.plotRef = createRef();
        this.options = {
          nodes:{shape:'circle',
                physics:true,
                mass:1},
          groups:this.groups,
          interaction: { hover: true },
          manipulation: {
            enabled: true,
            addNode: this.addNode,
            addEdge:this.addEdge
          },
        };
      }
      stabl = ()=>{


          this.network.stabilize();

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
        const n =this.nodes.length   
        const index = i*(2*n-3-i)/2+j-1
        console.log(index)
        console.log(index)
        return  index


      }

      vect_to_matrix(x)
      {

        const n =this.nodes.length   
        const i =Math.trunc((-Math.sqrt(-8*x+4*(n**2)-4*n+1)+2*n-1)/2)
        const j =x+1-i*(2*n-3-i)/2
        return [i,j]
      }
      //first proposition 


      saveData1  = ()=>{
        
        const n =this.nodes.length   
       
        
        var help=[]
        var i=0
        
        this.incidentMatrix=new Array(n*(n-1)/2)
        for (var j=0;j<n*(n-1)/2;j++)
          this.incidentMatrix[j]=0
        this.nodes.forEach((e,index,o)=>{
          help[index]=i;
         
          i++
        } );
        
        this.edges.forEach((e)=>{
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
         
         
      }
        saveData= async ()=>{

        
        const n =this.nodes.length   
        
        
        var help=[]
        var i=0
        
        
        this.nodes.forEach((e,index,o)=>{
          help[index]=i;
         
          i++
        } );
        i=0
        this.incidentMatrix.indices=[]
        this.incidentMatrix['values']=[]
        this.edges.forEach((e)=>{
          if(help[e.from]<help[e.to]){
          this.incidentMatrix.indices[i]=[help[e.from],help[e.to]]
          
          
          }
          else {
          
          this.incidentMatrix.indices[i]=[help[e.to],help[e.from]]
          
          }
          this.incidentMatrix['values'][i]=parseInt(e.label)
          i++
         }
         );
        //  this.incidentMatrix['values'][i]=parseInt(e.label)
        //   this.incidentMatrix.indices[i++]=[help[e.from],help[e.to]]
          
          
          
        //   this.incidentMatrix['values'][i]=parseInt(e.label)
          
        //   this.incidentMatrix.indices[i++]=[help[e.to],help[e.from]]
         
         
         await axios.post(`http://localhost:5000/save`,{matrix:this.incidentMatrix,nodes:this.nodes.get(),edges:this.edges.get()}       )
         .then(res => {
           console.log(res)
         })

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
        
        this.network = new Network(this.appRef.current, {nodes:this.nodes,edges:this.edges}, this.options);
        
        
        
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
      generate(element) {
        return [0, 1, 2].map((value) =>
          React.cloneElement(element, {
            key: value,
          }),
        );
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
                <Grid container item xs={12} md={3}>
              
                  <Grid item xs md>
                  <List   dense>
                    {this.generate(
                    <ListItem button>
                      
                      <ListItemIcon>
                       <TimelineIcon />
                      </ListItemIcon>
       
                      
                      <ListItemText
                        primary="Single-line item"
                       
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                   </List></Grid>
                   <Grid container item xs={4} md={12}>
                   <Grid   xs={12} md={6} item  >  <Button style={{width:"100%"}} onClick={this.saveData} variant="contained"  color="primary">save</Button></Grid>
                   <Grid   xs={12} md={6} item  >  <Button style={{width:"100%"}}  onClick={this.stabl} variant="contained"  color="primary">new</Button></Grid>
                   </Grid>
                

                </Grid>
                  
                <Grid item xs={12} md={9} > 
                <Paper onKeyDown={this.keyHandle} style={{height:600 +'px',
                width:100+"%"}} ref={this.appRef} />
                </Grid>
                <Grid item xs={12} md={12} > 
                
                <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      />
                </Grid>
              </Grid>
              
              
            </Container>
          </div>

        );
      }
    
}
 
export default MyNetwork;