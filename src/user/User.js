import React from 'react';
import PropTypes from 'prop-types';
import {Container,Row,Col} from "react-bootstrap"
import axios from 'axios';

import './User.css';

import UserConsumer from '../context';


class User extends React.Component {

 


  // constructor(props) {
  //   super(props)
  //   // this.Open = this.Open.bind(this);
  // }


  state = {
    isVisiable:false,
  }

  Open = () => {
    this.setState({isVisiable:!this.state.isVisiable})
  }

  onDelete = async(dispatch,e) => {
      const {id} = this.props;
      //delete request
     await axios.delete(`http://localhost:3004/users/${id}`) 
      //Consumer Dispatch
       dispatch({type : "DELETE_USER", payload : id});
  }

  componentWillUnmount() {
    console.log('unmounting')
  }

  render(){
    
    const {name,position,salary}=this.props;
    const {isVisiable}=this.state;

    return (
      <UserConsumer>
        {value => {
          const {dispatch} = value;
          
          return (
    
            <Container style={{margin:"20px auto",}}>
              <Row className="card" style={isVisiable?{background:'#00c1e7',color:'white'}:null}>
            
               <Col onClick={this.Open} className="card-body" md={12} style={{textAlign:"center",padding:0}}>
                <div className="card-header d-flex justify-content-around" style={{padding:0}}>
               <h1 className='col-md-11' style={{textAlign:'left'}}>{name}</h1> 
               <i  className='fas fa-trash col-md-1' onClick={this.onDelete.bind(this,dispatch)}></i>
                </div>
                
               {
                  isVisiable? 
                  <div style={{textAlign:'left',paddingLeft:'25px'}}> 
                    <h2>{position}</h2>
                    <h2>{salary}$</h2>
                  </div> : null
               }
               
               </Col> 
               
              </Row>
            </Container>
        
          )
        }}
      </UserConsumer>
    )
}
}

User.defaultProps = {
  name:"Elvin",
  position:"salamatciliqdi?"
}

 User.propTypes = {
   name: PropTypes.string.isRequired,
   position:PropTypes.string,
 }


export default User;
