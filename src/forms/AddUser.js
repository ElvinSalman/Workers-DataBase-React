import React, { Component } from 'react';
import posed from 'react-pose';
import UserConsumer from '../context'
import axios from 'axios';
//let uniqid = require('uniqid');

const Animation = posed.div({
    visiable:{
        opacity:1,
        applyAtStart:{
            display:'block'
        }
    },
    hidden:{
        opacity:0,
        applyAtEnd:{
            display:'none'
        }
    }
});


 class AddUser extends Component {
     state={
         visiable:false,
         name:'',
         position:'',
         salary:'',
         error:false
     }

     changeVisiability=()=>{
         this.setState({
             visiable:!this.state.visiable
         })
     }

     changeInput=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
     }

    //  changeName=(e)=>{
    //     this.setState({
    //         name : e.target.value
    //     })
    //  }

    //  changePosition=(e)=>{
    //     this.setState({
    //         position : e.target.value
    //     })
    //  }

    //  changeSalary=(e)=>{
    //     this.setState({
    //         salary : e.target.value
    //     })
    //  }

    validateForm=()=>{
        const {name,position,salary} = this.state;
        if(name==='' || position==='' || salary==='') {
            return false
        } else{
            return true
        }     
    }

     addUser=async(dispatch,e)=>{
        e.preventDefault();
        const {name,position,salary} = this.state;
        const newUser={
          //  id:uniqid(),
            name,
            position,
            salary
        }
  
       if(!this.validateForm()) {
           this.setState({
               error:true
           })
           return;
       }

       const response = await axios.post('http://localhost:3004/users',newUser);
       dispatch({type:'ADD_USER',payload:response.data});
       //Redirect
       this.props.history.push('/');

     }



    render() {
        const {visiable,name,position,salary,error} = this.state;
      
        return  (
            <UserConsumer>
                {
                    value=>{
                        const {dispatch} = value;

                        return (
                            <div className='col-md-8 mb-4' style={{margin:'auto'}}>
                                <button onClick={this.changeVisiability} className='btn btn-dark btn-block mb-2'>{visiable? "Hide form" : "Show form" }</button>
                           
                           <Animation pose = { visiable? 'visiable' : 'hidden'}>
                           <div className='card'>
                                    <div className="card-header">
                                    <h4>Add User Form</h4>
                                    </div>

                                    <div className='card-body'>
                                        {error?
                                        <div className="alert alert-danger">
                                            Fill in all fields.
                                        </div>:
                                        null
                                        }
                                        <form onSubmit={this.addUser.bind(this,dispatch)}>
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
                
                                            <button type='submit' className='btn btn-danger btn-block'>Submit</button>
                                        </form>
                                    </div>
                                    
                                </div>
                           </Animation>
                           
                            </div>
                        )
                    }
                }
            </UserConsumer> 
        )       
        
    }
}
export default AddUser;