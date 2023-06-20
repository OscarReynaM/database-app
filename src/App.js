import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import UserList from './UserList';
import UserForm from './UserForm';
import UserEdit from './UserEdit'; // Import the UserEdit component

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">User List</Link>
            </li>
            <li>
              <Link to="/users/new">Add User</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/users">
            <UserList />
          </Route>
          <Route path="/users/new">
            <UserForm />
          </Route>
          <Route path="/user/edit/:id"> {/* Route for editing a user */}
            <UserEdit />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
