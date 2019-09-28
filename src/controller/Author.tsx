import * as React from 'react';
import getData from "../function/getData";

interface Props {}
interface State {
    authorList: any,
    firstName : string,
    errorFirstName : string,
    password : string,
    errorPassword : string,
    callbackMessageForm : any,
    callbackMessageData : any
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
            callbackMessageData : null
        }
    }

    componentDidMount(): any {
        getData('http://localhost:3001/author/all', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGFkb2NrIiwic3ViIjoiNWQ4YTE2MWI3OWYwMGI3OTc4NzZiNzUyIiwiaWF0IjoxNTY5NDg5MjEwLCJleHAiOjE1Njk1MDEyMTB9.FSwflQEUvVoU_vbiUmngJSgCmuKB1ma8G9MfPHgHKQ8')
        .then((res) => {
            if (res.status) {
                this.setState({
                    authorList: res.data
                })
            }
        })
        .catch((err) => {
            this.setState({
                callbackMessageData : '[getData] ' + err.toString()
            })
        })
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
        const {firstName, password, errorPassword, errorFirstName} = this.state;

        if (errorPassword === '' && errorFirstName === '') {
            fetch('http://localhost:3001/author/add', {
                method : 'POST',
                body : JSON.stringify({
                    name : firstName,
                    password,
                }),
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    res.json().then((resp) => {
                        console.log(resp);
                        this.setState({
                            callbackMessageForm : resp
                        })
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
        const {authorList, firstName, password, callbackMessageForm, callbackMessageData, errorFirstName, errorPassword} = this.state;

        return (
            <section className="container">
                <div className="col-xs_12">
                    {callbackMessageData}
                </div>
                {authorList&&
                <table className="center over breakWord">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Password</th>
                        <th>Token</th>
                    </tr>
                    </thead>
                    <tbody>
                    {authorList.map((el: any) => (
                        <tr>
                            <td>{el._id}</td>
                            <td>{el.name}</td>
                            <td>{el.password}</td>
                            <td>{el.token}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>}

                <div>
                    <div className="input-block col-xs_6">
                        <label htmlFor="firstName">First name </label>
                        <input type="text" name="firstName" id="firstName" value={firstName} onChange={(event) => {this.handleForm(event)}}/>
                        {errorFirstName}
                    </div>

                    <div className="input-block col-xs_6">
                        <label htmlFor="password">Password </label>
                        <input type="password" name="password" id="password" value={password} onChange={(event) => {this.handleForm(event)}}/>
                        {errorPassword}
                    </div>

                    <div className="col-xs_12">
                        <button className="submit" onClick={(event) => {this.submitForm(event)}}>Send</button>
                    </div>

                    <div className="col-xs_12">
                        {callbackMessageForm}
                    </div>
                </div>
            </section>
        )
    }
}

export default Author;
