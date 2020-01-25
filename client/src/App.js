import React, { useEffect } from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';

//pages
import HomePage from './pages/HomePage';
import DialogPage from './pages/DialogPage';
import AuthPage from './pages/AuthPage';
import EditUserPage from './pages/EditUserPage';
import FeedPage from './pages/FeedPage';


//components
import Header from './components/Header/Header.component';
import Alert from './components/Alert/Alert.component';
import PrivateRoute from './components/Auth/PrivateRoute/PrivateRoute.component';
import { connect } from 'react-redux';

const App = ({ user }) => {
  return (
    <div className="App">
      <Header />
      <Alert/>
      <Switch>
       <Route path="/" exact component={AuthPage}/>
       <PrivateRoute exact path="/user/:id" component={HomePage} />
       <PrivateRoute path="/dialogs" component={DialogPage} />
       <PrivateRoute exact path="/edit-user" component={EditUserPage} />
       <PrivateRoute exact path="/feed" component={FeedPage} />
       <Route render={() => <h1>404</h1>} />
      </Switch>
    </div>
  );
}

const mapStateToProps = ({ auth: { user } }) => ({
    user
});

export default connect(mapStateToProps)(App);
