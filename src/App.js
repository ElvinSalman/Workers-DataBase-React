import React from 'react';
import Users from './user/Users';
import AddUser from './user/AddUser'
import Navbar from './layout/Navbar'
import NotFound from './pages/NotFound'
import Contribute from './pages/Contribute'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'

function App() {


   return (
    <Router>
     <div>
     <Navbar title='User App'/> 
     <hr/>
     <Switch> 
      <Route exact path='/' component={Users}/>
      <Route exact path='/add' component={AddUser}/>
      <Route exact path='/github' component={Contribute}/>
      <Route component={NotFound}/>
     </Switch>
     </div>
     </Router>
  );
}



export default App;
