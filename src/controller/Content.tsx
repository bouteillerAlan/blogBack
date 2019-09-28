import * as React from 'react';
import getData from "../function/getData";

interface Props {}
interface State {
    contentList: any,
    authorList : any,
    categoriesList : any,
    title : string,
    errorTitle : string,
    author : string,
    errorAuthor : string,
    category : string,
    errorCategory : string,
    content : string,
    errorContent : string,
    callbackMessageForm : any,
    callbackMessageDataAuthor : any,
    callbackMessageDataCategories : any,
    callbackMessageDataContent : any
}

class Author extends React.Component<Props, State> {
    constructor(props: any){
        super(props);
        this.state = {
            contentList: null,
            authorList : null,
            categoriesList : null,
            title : '',
            errorTitle : '',
            author : '',
            errorAuthor: '',
            category : '',
            errorCategory : '',
            content : '',
            errorContent : '',
            callbackMessageForm : null,
            callbackMessageDataAuthor : null,
            callbackMessageDataCategories : null,
            callbackMessageDataContent : null
        }
    }

    componentDidMount(): any {
        getData('http://localhost:3001/content/all', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGFkb2NrIiwic3ViIjoiNWQ4YTE2MWI3OWYwMGI3OTc4NzZiNzUyIiwiaWF0IjoxNTY5NDg5MjEwLCJleHAiOjE1Njk1MDEyMTB9.FSwflQEUvVoU_vbiUmngJSgCmuKB1ma8G9MfPHgHKQ8')
            .then((res) => {
                if (res.status) {
                    this.setState({
                        contentList: res.data
                    })
                }
            })
            .catch((err) => {
                this.setState({
                    callbackMessageDataContent : '[getData]content ' + err.toString()
                })
            });
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
                    callbackMessageDataCategories : '[getData]categories ' + err.toString()
                })
            });
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
                    callbackMessageDataAuthor : '[getData]author ' + err.toString()
                })
            });
    }

    handleForm = (e: any) => {
        if (e.target.id === 'title') {
            this.setState({title:e.target.value, errorTitle : e.target.value.length > 3 ? '' : 'min 3 characters'})
        } else if (e.target.id === 'author') {
            this.setState({author:e.target.value, errorAuthor : e.target.value.length > 3 ? '' : 'min 3 characters'})
        } else if (e.target.id === 'category') {
            this.setState({author:e.target.value, errorAuthor : e.target.value.length > 5 ? '' : 'min 5 characters'})
        } else if (e.target.id === 'content') {
            this.setState({author:e.target.value, errorAuthor : e.target.value.length > 5 ? '' : 'min 5 characters'})
        }
    };

    submitForm = (e: any) => {
        e.preventDefault();
        const {title, author, category, content, errorAuthor, errorTitle, errorContent, errorCategory} = this.state;

        if (errorAuthor === '' && errorTitle === '' && errorContent === '' && errorCategory === '') {
            fetch('http://localhost:3001/author/add', {
                method : 'POST',
                body : JSON.stringify({
                    title,
                    author,
                    category,
                    content
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
        const {contentList, title, author, category, content, callbackMessageForm, callbackMessageDataAuthor, callbackMessageDataCategories, callbackMessageDataContent, errorTitle, errorAuthor, errorContent, errorCategory} = this.state;

        return (
            <section className="container">
                <div className="col-xs_12">
                    {callbackMessageDataAuthor}
                    <br/>
                    {callbackMessageDataCategories}
                    <br/>
                    {callbackMessageDataContent}
                </div>
                {contentList&&
                <table className="center over breakWord">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contentList.map((el: any) => (
                        <tr>
                            <td>{el._id}</td>
                            <td>{el.title}</td>
                            <td>{el.author}</td>
                            <td>{el.category}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>}

                <div>
                    <div className="input-block col-xs_12">
                        <label htmlFor="title">Title </label>
                        <input type="text" name="title" id="title" value={title} onChange={(event) => {this.handleForm(event)}}/>
                        {errorTitle}
                    </div>

                    <div className="input-block col-xs_6">
                        <label htmlFor="author">Author </label>
                        <input type="text" name="author" id="author" value={author} onChange={(event) => {this.handleForm(event)}}/>
                        {errorAuthor}
                    </div>

                    <div className="input-block col-xs_6">
                        <label htmlFor="category">Category </label>
                        <input type="text" name="category" id="category" value={category} onChange={(event) => {this.handleForm(event)}}/>
                        {errorCategory}
                    </div>

                    <div className="input-block col-xs_12">
                        <label htmlFor="content">Content </label>
                        <textarea name="content" id="content" value={content} onChange={(event) => {this.handleForm(event)}}>
                        </textarea>
                        {errorContent}
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
