import React, { Component } from 'react';
import UserConsumer from '../context'
import axios from 'axios';


 class UpdateUser extends Component {
     state={
         name:'',
         position:'',
         salary:'',
         error:false
     }

 

     changeInput=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
     }

     validateForm=()=>{
        const {name,position,salary} = this.state;
        if(name==='' || position==='' || salary==='') {
            return false
        } else{
            return true
        }     
    }

     updateUser=async(dispatch,e)=>{
        e.preventDefault();
        //Update User
        const {name,position,salary} = this.state;
        const {id} = this.props.match.params;

        const updatedUser = {
            name,
            position,
            salary,
        }
        
        if(!this.validateForm()) {
            this.setState({
                error:true
            })
            return;
        }

       
            const response = await axios.put(`http://localhost:3004/users/${id}`,updatedUser)

            dispatch({type:"UPDATE_USER",payload:response.data});
             //Redirect
             this.props.history.push('/');
        

     }

     componentDidMount=async () => {
        const {id} = this.props.match.params;
        const response = await axios.get(`http://localhost:3004/users/${id}`)
        const {name,position,salary} = response.data;
        this.setState({
            name,
            position,
            salary
        })   
     }

    render() {
        const {name,position,salary,error} = this.state;
      
        return  (
            <UserConsumer>
                {
                    value=>{
                        const {dispatch} = value;

                        return (
                            <div className='col-md-8 mb-4' style={{margin:'auto'}}>                           
                            <div className='card'>
                                    <div className="card-header">
                                    <h4>Update User Form</h4>
                                    </div>
                                    <div className='card-body'>
                                     {error?
                                        <div className="alert alert-danger">
                                            Fill in all fields.
                                        </div>:
                                        null
                                        }
                                        <form onSubmit={this.updateUser.bind(this,dispatch)}>
                                            <div className='form-group'>
                                                <label htmlFor='name'>Name</label>
                                                <input value={name}  type='text' name='name' id='id' placeholder='Enter name' className='form-control' onChange={this.changeInput} />
                                            </div>
                
                                            <div className='form-group'>
                                                <label htmlFor='hall'>Position</label>
                                                <input value={position} name='position' id='hall' placeholder='Enter position' className='form-control' onChange={this.changeInput} />
                                            </div>
                        
                                            <div className='form-group'>
                                                <label htmlFor='hall'>Salary</label>
                                                <input value={salary} name='salary' id='hall' placeholder='Enter salary' className='form-control' onChange={this.changeInput} />
                                            </div>
                
                                            <button type='submit' className='btn btn-danger btn-block'>Update User</button>
                                        </form>
                                    </div>
                                    
                                </div>
                           
                            </div>
                        )
                    }
                }
            </UserConsumer> 
        )       
        
    }
}
export default UpdateUser;