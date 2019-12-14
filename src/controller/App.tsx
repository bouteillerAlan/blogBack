// vanilla
import React from 'react';
// router
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
// component
import Login from '../controller/Login';
import handleLocalStorage from '../function/handleLocalStorage';
import Content from "./Content";
import Categories from "./Categories";
import Author from "./Author";

interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

async function checkUser () {
  const auth = await handleLocalStorage('read', 'jwt');
  console.log('function checkUser', auth);
  if (auth) {
    fetch('http://localhost:3001/auth/validate', {
      headers: {
        'Authorization' : `Bearer ${auth}`
      }
    }).then((res: any) => {
      console.log('checkUser res>>>', res, res.status);
      return res.status === 200;
    })
  }
  return false
}

const PrivateRoute = ({ component: Component, ...rest }: IProps) => {
  const auth = checkUser();
  console.log(auth);
  return (
    <Route {...rest} render={(props) => (
      auth
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
};

const Check = () => {
  checkUser().then((res: boolean) => {
    return res ? <Redirect to={'/contents'}/> : <Redirect to={'/login'}/>;
  });
  return <Redirect to={'/login'}/>;
};

interface Props {}
interface State {}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Router>
        <Route exact path='/' component={Check}/>
        <Route exact path='/login' component={Login}/>
        <PrivateRoute exact path='/contents' component={Content} />
        <PrivateRoute exact path='/categories' component={Categories} />
        <PrivateRoute exact path='/authors' component={Author} />
      </Router>
    )
  }

}

export default App;
