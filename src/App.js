import React from 'react';
import Users from './user/Users';
import AddUser from './forms/AddUser'
import UpdateUser from './forms/UpdateUser'
import Navbar from './layout/Navbar'
import NotFound from './pages/NotFound'
import Contribute from './pages/Contribute'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'

function App() {


   return (
    <Router>
     <div>
     <Navbar title='User App'/> 
     <Switch> 
      <Route exact path='/' component={Users}/>
      <Route exact path='/add' component={AddUser}/>
      <Route exact path='/github' component={Contribute}/>
      <Route exact path='/edit/:id' component={UpdateUser}/>
      <Route component={NotFound}/>
     </Switch>
     </div>
     </Router>
  );
}



export default App;
