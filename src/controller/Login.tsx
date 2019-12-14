import * as React from 'react';
import history from '../history';
import postLogin from '../function/postLogin';
import handleLocalStorage from '../function/handleLocalStorage';
import getData from "../function/getData";

interface Props {}
interface State {
  password: string
  name: string
  errorPassword: string
  errorName: string
  callbackMessageDataLogin: string
  callbackMessageForm: string
  isLogged: boolean
}

class Login extends React.Component<Props, State> {
  constructor(props: any){
    super(props);
    this.state = {
      password: '',
      name: '',
      errorPassword: '',
      errorName: '',
      callbackMessageDataLogin: '',
      callbackMessageForm: '',
      isLogged: false
    }
  }

  checkLocalStorage = () => {
    handleLocalStorage('read','jwt')
      .then((res: any) => {
        if (res) {
          getData('http://localhost:3001/auth/validate', res)
            .then((res: any) => {
              if (res.username) {
                history.push('')
              }
            })
        }
      })
  };

  handleForm = (e: any) => {
    if (e.target.name === 'name') {
      this.setState({name: e.target.value, errorName: e.target.value.length <= 3 ? 'min 3 characters' : ''});
    } else if (e.target.name === 'password') {
      this.setState({password: e.target.value, errorPassword: e.target.value.length <= 3 ? 'min 3 characters' : ''});
    }
  };

  submitForm = (e: any) => {
    e.preventDefault();
    const {errorPassword, errorName, name, password} = this.state;
    if (errorPassword === '' && errorName === '' && password !== '' && name !== '') {
      this.setState({callbackMessageForm: ''});
      postLogin({name, password})
        .then((res: any) => {
          if (res.access_token) {
            this.setState({callbackMessageDataLogin: ''});
            handleLocalStorage('create','jwt',res.access_token)
              .then(() => {
                history.push('/')
              })
          } else {
            this.setState({callbackMessageDataLogin: res.message});
          }
        })
        .catch((err) => {
          this.setState({
            callbackMessageForm : err.statusCode ? '[postData] ' + err.error : '[postData] ' + err.toString()
          })
        })
    } else {
      this.setState({callbackMessageForm: 'error in form'});
    }
  };

  render() {
    const {callbackMessageDataLogin, callbackMessageForm, errorPassword, errorName, name, password} = this.state;

    return (
      <section className="container">
        {(callbackMessageDataLogin)&& <div className="col-xs_12 error">
          {callbackMessageDataLogin}
        </div>}

        <div>

          <div className="col-xs_12">
            <h1>Welcome to Trident back-end blog</h1>
          </div>

          <div className="input-block col-xs_6">
            <label htmlFor="name">Id </label>
            <input type="text" name="name" id="name" value={name} onChange={(event) => {this.handleForm(event)}}/>
            {errorName&& <span className="error">{errorName}</span>}
          </div>

          <div className="input-block col-xs_6">
            <label htmlFor="password">Password </label>
            <input type="password" name="password" id="password" value={password} onChange={(event) => {this.handleForm(event)}}/>
            {errorPassword&& <span className="error">{errorPassword}</span>}
          </div>

          <div className="col-xs_12">
            <button className="submit" onClick={(event) => {this.submitForm(event)}}>Send</button>
          </div>

          <div className="col-xs_12">
            {callbackMessageForm&& <span className="error chips">{callbackMessageForm}</span>}
          </div>
        </div>
      </section>
    )
  }
}

export default Login;
