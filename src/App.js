import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/navbar.component"
import UserList from "./components/users-list.component"
import CreateUser from "./components/create-user.component"
import EditUser from './components/edit-User.component'

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar  />
      <br/>
      <Route path="/" exact component={UserList} />
      <Route path="/user" component={CreateUser} />
      <Route path="/update/:Email" component={EditUser} />

      </div>
    </Router>
    
  );
}

export default App;
