import * as React from 'react';
// import getData from '../function/getData';

interface Props {}
interface State {
  authorList: any,
  firstName : string,
  errorFirstName : string,
  password : string,
  errorPassword : string,
  callbackMessageForm : any,
  callbackMessageFormSuccess: any,
  callbackMessageData : any,
  token: string
}

class Author extends React.Component<Props, State> {
  constructor(props: any){
    super(props);
    this.state = {
      authorList: null,
      firstName : '',
      errorFirstName : '',
      password : '',
      errorPassword: '',
      callbackMessageForm : null,
      callbackMessageFormSuccess: null,
      callbackMessageData : null,
      token: ''
    }
  }

  getDatas = (token: string) => {
    this.setState({token});
    // getData('http://localhost:3001/author/all', token)
    //   .then((res) => {
    //     if (res.status) {
    //       this.setState({
    //         authorList: res.data.length > 0 ? res.data : null
    //       })
    //     }
    //   })
    //   .catch((err) => {
    //     this.setState({
    //       callbackMessageData : '[getData] ' + err.toString()
    //     })
    //   })
  };

  componentDidMount(): any {

  }

  handleForm = (e: any) => {
    if (e.target.id === 'firstName') {
      this.setState({firstName:e.target.value, errorFirstName : e.target.value.length > 3 ? '' : 'min 3 characters'})
    } else if (e.target.id === 'password') {
      this.setState({password:e.target.value, errorPassword : e.target.value.length > 5 ? '' : 'min 5 characters'})
    }
  };

  submitForm = (e: any) => {
    e.preventDefault();
    const {firstName, password, errorPassword, errorFirstName, token} = this.state;

    if (errorPassword === '' && errorFirstName === '') {
      fetch('http://localhost:3001/author/add/encrypted', {
        method : 'POST',
        body : JSON.stringify({
          name : firstName,
          password,
        }),
        headers : {
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => {
          res.json().then((resp) => {
            if (resp.status) {
              this.setState({
                callbackMessageFormSuccess: `${resp.message} created!`,
                callbackMessageForm: '',
                firstName: '',
                password: ''
              })
            } else {
              this.setState({
                callbackMessageFormSuccess: '',
                callbackMessageForm: resp.message
              })
            }
          })
        })
        .catch((err) => {
          this.setState({
            callbackMessageForm : '[postData] ' + err.toString()
          })
        })
    }
  };

  render() {
    const {authorList, firstName, password, callbackMessageForm, callbackMessageData, errorFirstName, errorPassword, callbackMessageFormSuccess} = this.state;

    return (
      <section className="container">
        {callbackMessageData &&
        <div className="col-xs_12 error">
          {callbackMessageData}
        </div>}
        {authorList&&
        <table className="center over breakWord">
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Token</th>
          </tr>
          </thead>
          <tbody>
          {authorList.map((el: any) => (
            <tr key={el._id}>
              <td>{el._id}</td>
              <td>{el.name}</td>
              <td>{el.token}</td>
            </tr>
          ))}
          </tbody>
        </table>}

        <div>
          <div className="input-block col-xs_6">
            <label htmlFor="firstName">First name </label>
            <input type="text" name="firstName" id="firstName" value={firstName} onChange={(event) => {this.handleForm(event)}}/>
            {errorFirstName&& <span className="error">{errorFirstName}</span>}
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
            {callbackMessageFormSuccess&& <span className="success chips">{callbackMessageFormSuccess}</span>}
          </div>
        </div>
      </section>
    )
  }
}

export default Author;
