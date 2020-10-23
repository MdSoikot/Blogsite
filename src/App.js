import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './Components/HomePage';
import Register from './Components/Register';
import CreatePost from './Components/CreatePost';
import Navbar from './Components/Navbar';
import Axios from 'axios';



function App(props) {
  const [authenticate, setAuthenticated] = useState({ isAuthenticated: false, token: null });

  const authenticateUser = (token) => {
    setAuthenticated({ isAuthenticated: true, token: token });
    localStorage.setItem('jwt', token);
  }





  useEffect(() => {
    const isToken = localStorage.getItem("jwt");
    if (isToken) {
      authenticateUser(isToken)
    }

  }, [])

  const logOut = () => {
    localStorage.clear();
      setAuthenticated({isAuthenticated:false,token:null})
   
  }



  const refreshUrl = "http://blogsite.test/api/auth/checkToken";
  const refresh = () => {

    Axios.post(refreshUrl,{token:authenticate.token})
      .then(res => {
        const token=res.data.token;
        setAuthenticated({ token: token });
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }


  const PrivateRoute = ({ component: Component, isAuthenticated, token, ...rest }) => (
    <Route {...rest} render={props => (
      isAuthenticated ? (
        <Component {...props} {...rest} token={token} isAuthenticated={isAuthenticated} />
      ) : (
          <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }} />
        )
    )} />
  );
  





  console.log('%c $render App', 'background:gray;padding:3px;border-radius:5px;color:white')






  return (
    <BrowserRouter>
      <div className="App">
        <Navbar logOut={logOut} isAuthenticated={authenticate.isAuthenticated}{...props} />

        <Switch>
          <PrivateRoute path="/createpost" refresh={refresh} component={CreatePost} isAuthenticated={authenticate.isAuthenticated} token={authenticate.token}></PrivateRoute>
          <Route path="/homepage" component={HomePage}></Route>
          <Route path="/" render={(props) => <Register authenticateUser={authenticateUser} isAuthenticated={authenticate.isAuthenticated}{...props} />}></Route>
        </Switch>
      </div>
    </BrowserRouter>

  );



}




export default App;