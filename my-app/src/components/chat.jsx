import React, { Component } from 'react'
import io from 'socket.io-client'





class Chat extends Component {
    state = {  }



    componentDidMount()
    {

        var socket = io.connect('localhost:12800',{transports: ['websocket']});
        socket.emit('message', 'Salut serveur, ça va ?');

        socket.on('message', function(message) {
            alert('Le serveur a un message pour vous : ' + message);
        })
       

    }
    
    render() { 
        return ( 
            <div className="container">

                <div style={{"height":"400px"}} className="row align-items-end">
                    <div className="col-md-2" >
                        message :
                    </div>
                    <div className="col-md-8">
                    <input className="form-control"  > 
                    
                    </input> 
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary">
                           envoyer 
                        </button>
                    </div>
                   
                </div>


            </div>
         );
    }
}
 
export default Chat;