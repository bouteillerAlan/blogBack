import * as React from 'react';
import getData from "../function/getData";

interface Props {}
interface State {
    categoriesList: any,
    name : string,
    errorName : string,
    callbackMessageForm : any,
    callbackMessageData : any
}

class Author extends React.Component<Props, State> {
    constructor(props: any){
        super(props);
        this.state = {
            categoriesList: null,
            name : '',
            errorName : '',
            callbackMessageForm : null,
            callbackMessageData : null
        }
    }

    componentDidMount(): any {
        getData('http://localhost:3001/categories/all', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGFkb2NrIiwic3ViIjoiNWQ4YTE2MWI3OWYwMGI3OTc4NzZiNzUyIiwiaWF0IjoxNTY5NDg5MjEwLCJleHAiOjE1Njk1MDEyMTB9.FSwflQEUvVoU_vbiUmngJSgCmuKB1ma8G9MfPHgHKQ8')
            .then((res) => {
                if (res.status) {
                    this.setState({
                        categoriesList: res.data
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
        if (e.target.id === 'name') {
            this.setState({name:e.target.value, errorName : e.target.value.length > 3 ? '' : 'min 3 characters'})
        }
    };

    submitForm = (e: any) => {
        e.preventDefault();
        const {name, errorName} = this.state;

        if (errorName === '') {
            fetch('http://localhost:3001/categories/add', {
                method : 'POST',
                body : JSON.stringify({
                    name,
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
        const {categoriesList, name, callbackMessageForm, callbackMessageData, errorName} = this.state;

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
                        <tr>
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
                        {callbackMessageForm&& <span className="error">{callbackMessageForm}</span>}
                    </div>
                </div>
            </section>
        )
    }
}

export default Author;
