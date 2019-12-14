import * as React from 'react';
import getData from "../function/getData";
import handleLocalStorage from "../function/handleLocalStorage";

interface Props {}
interface State {
  categoriesList: any,
  name : string,
  errorName : string,
  callbackMessageFormError : any,
  callbackMessageFormSuccess: any,
  callbackMessageData : any,
  token: string
}

class Author extends React.Component<Props, State> {
  constructor(props: any){
    super(props);
    this.state = {
      categoriesList: null,
      name : '',
      errorName : '',
      callbackMessageFormError : null,
      callbackMessageFormSuccess: null,
      callbackMessageData : null,
      token: ''
    }
  }

  componentDidMount(): any {
    handleLocalStorage('read','jwt').then((res: any) => {
      const token = res;
      this.setState({token});
      getData('http://localhost:3001/categories/all', token)
        .then((res) => {
          if (res.status) {
            this.setState({
              categoriesList: res.data.length > 0 ? res.data : null
            })
          }
        })
        .catch((err) => {
          this.setState({
            callbackMessageData: '[getData] ' + err.toString()
          })
        })
    })
  }

  handleForm = (e: any) => {
    if (e.target.id === 'name') {
      this.setState({name:e.target.value, errorName : e.target.value.length > 2 ? '' : 'min 2 characters'})
    }
  };

  submitForm = (e: any) => {
    e.preventDefault();
    const {name, errorName, token} = this.state;

    if (errorName === '') {
      fetch('http://localhost:3001/categories/add', {
        method : 'POST',
        body : JSON.stringify({
          name,
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
                callbackMessageFormSuccess : `${resp.message} created!`,
                callbackMessageFormError: '',
                name : ''
              })
            } else {
              this.setState({
                callbackMessageFormSuccess : '',
                callbackMessageFormError: resp.message,
                name : ''
              })
            }

          })
        })
        .catch((err) => {
          this.setState({
            callbackMessageFormError : '[postData] ' + err.toString()
          })
        })
    }
  };

  render() {
    const {categoriesList, name, callbackMessageFormError, callbackMessageFormSuccess, callbackMessageData, errorName} = this.state;

    return (
      <section className="container">
        {callbackMessageData&&
        <div className="col-xs_12 error">
          {callbackMessageData}
        </div>}
        {categoriesList&&
        <table className="center over breakWord">
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
          {categoriesList.map((el: any) => (
            <tr key={el._id}>
              <td>{el._id}</td>
              <td>{el.name}</td>
            </tr>
          ))}
          </tbody>
        </table>}

        <div>
          <div className="input-block col-xs_6">
            <label htmlFor="name">Name </label>
            <input type="text" name="name" id="name" value={name} onChange={(event) => {this.handleForm(event)}}/>
            {errorName&& <span className="error">{errorName}</span>}
          </div>

          <div className="col-xs_12">
            <button className="submit" onClick={(event) => {this.submitForm(event)}}>Send</button>
          </div>

          <div className="col-xs_12">
            {callbackMessageFormError&& <span className="error chips">{callbackMessageFormError}</span>}
            {callbackMessageFormSuccess&& <span className="success chips">{callbackMessageFormSuccess}</span>}
          </div>
        </div>
      </section>
    )
  }
}

export default Author;
