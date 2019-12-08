// vanilla
import React from 'react';
// router
import {Route, Router} from 'react-router-dom';
import { createBrowserHistory } from 'history';
// component
import Author from './Author';
import Content from './Content';
import Cat from './Categories';
import NavbarView from '../view/Navbar.view';
import Login from '../controller/Login';
import handleLocalStorage from '../function/handleLocalStorage';
import getData from '../function/getData';
// history
const history = createBrowserHistory();

interface Props {}
interface State {
  isLogged: boolean
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLogged: false
    }
  }

  componentDidMount(): void {
    handleLocalStorage('read','jwt')
      .then((res: any) => {
        if (res) {
          getData('http://localhost:3001/auth/validate', res)
            .then((res: any) => {
              this.setState({isLogged: !!res.username});
            })
        }
      })
  }

  render() {
    const {isLogged} = this.state;
    return (
      <Router history={history}>
        {!isLogged &&
          <Route exact path='/' component={Login}/>
        }
        {isLogged &&
          <>
            <NavbarView/>
            <Route exact path='/content' component={Content} />
            <Route exact path='/categories' component={Cat} />
            <Route exact path='/authors' component={Author} />
          </>
        }
      </Router>
    )
  }

}

export default App;
