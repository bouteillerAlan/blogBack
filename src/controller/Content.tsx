import * as React from 'react';
import getData from '../function/getData';
import isBlank from '../function/isBlank';

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
    callbackMessageDataContent : any,
    callbackMessageFormSend : any
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
            callbackMessageDataContent : null,
            callbackMessageFormSend : null
        }
    }

    componentDidMount(): any {
        getData('http://localhost:3001/content/all', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGFkb2NrIiwic3ViIjoiNWQ4YTE2MWI3OWYwMGI3OTc4NzZiNzUyIiwiaWF0IjoxNTY5ODI2Njg1LCJleHAiOjE1Njk4Mzg2ODV9.1FB4sj3YmO2_52dMc7up4tVcSr28zmJ-Yo1JJNaL4cQ')
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
        getData('http://localhost:3001/categories/all', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGFkb2NrIiwic3ViIjoiNWQ4YTE2MWI3OWYwMGI3OTc4NzZiNzUyIiwiaWF0IjoxNTY5ODI2Njg1LCJleHAiOjE1Njk4Mzg2ODV9.1FB4sj3YmO2_52dMc7up4tVcSr28zmJ-Yo1JJNaL4cQ')
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
        getData('http://localhost:3001/author/all', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGFkb2NrIiwic3ViIjoiNWQ4YTE2MWI3OWYwMGI3OTc4NzZiNzUyIiwiaWF0IjoxNTY5ODI2Njg1LCJleHAiOjE1Njk4Mzg2ODV9.1FB4sj3YmO2_52dMc7up4tVcSr28zmJ-Yo1JJNaL4cQ')
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
            this.setState({category:e.target.value, errorCategory : e.target.value.length > 5 ? '' : 'min 5 characters'})
        } else if (e.target.id === 'content') {
            this.setState({content:e.target.value, errorContent : e.target.value.length > 5 ? '' : 'min 5 characters'})
        }
    };

    submitForm = (e: any) => {
        e.preventDefault();
        const {title, author, category, content, errorAuthor, errorTitle, errorContent, errorCategory} = this.state;

        if (errorAuthor === '' && errorTitle === '' && errorContent === '' && errorCategory === '') {
            fetch('http://localhost:3001/content/add', {
                method : 'POST',
                body : JSON.stringify({
                    title: title,
                    author: author,
                    category: category,
                    content: content
                }),
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGFkb2NrIiwic3ViIjoiNWQ4YTE2MWI3OWYwMGI3OTc4NzZiNzUyIiwiaWF0IjoxNTY5ODI2Njg1LCJleHAiOjE1Njk4Mzg2ODV9.1FB4sj3YmO2_52dMc7up4tVcSr28zmJ-Yo1JJNaL4cQ'
                }
            })
                .then((res) => {
                    res.json().then((resp) => {
                        if (resp.statusCode) {
                            this.setState({
                                callbackMessageForm : resp.statusCode ? '[postData] ' + resp.error : resp,
                            })
                        } else if (resp.status) {
                            this.setState({
                                callbackMessageFormSend : resp.status ? 'data send' : '',
                                title : '',
                                author : '',
                                category : '',
                                content : ''
                            })
                        }

                    })
                })
                .catch((err) => {
                    this.setState({
                        callbackMessageForm : err.statusCode ? '[postData] ' + err.error : '[postData] ' + err.toString()
                    })
                })
        }
    };

    render() {
        const {contentList, title, author, category, content, callbackMessageForm, callbackMessageDataAuthor, callbackMessageDataCategories, callbackMessageDataContent, errorTitle, errorAuthor, errorContent, errorCategory, callbackMessageFormSend} = this.state;

        return (
            <section className="container">
                {(callbackMessageDataAuthor || callbackMessageDataCategories || callbackMessageDataContent)&& <div className="col-xs_12 error">
                    {callbackMessageDataAuthor}
                    <br/>
                    {callbackMessageDataCategories}
                    <br/>
                    {callbackMessageDataContent}
                </div>}
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
                            <td>{el.author[0] ? el.author[0].name : ''}</td>
                            <td>{el.category[0] ? el.category[0].name : ''}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>}

                <div>
                    <div className="input-block col-xs_12">
                        <label htmlFor="title">Title </label>
                        <input type="text" name="title" id="title" value={title} onChange={(event) => {this.handleForm(event)}}/>
                        {errorTitle&& <span className="error">{errorTitle}</span>}
                    </div>

                    <div className="input-block col-xs_6">
                        <label htmlFor="author">Author </label>
                        <input type="text" name="author" id="author" value={author} onChange={(event) => {this.handleForm(event)}}/>
                        {errorAuthor&& <span className="error">{errorAuthor}</span>}
                    </div>

                    <div className="input-block col-xs_6">
                        <label htmlFor="category">Category </label>
                        <input type="text" name="category" id="category" value={category} onChange={(event) => {this.handleForm(event)}}/>
                        {errorCategory&& <span className="error">{errorCategory}</span>}
                    </div>

                    <div className="input-block col-xs_12">
                        <label htmlFor="content">Content </label>
                        <textarea name="content" id="content" value={content} onChange={(event) => {this.handleForm(event)}}>
                        </textarea>
                        {errorContent&& <span className="error">{errorContent}</span>}
                    </div>

                    <div className="col-xs_12">
                        <button className="submit" onClick={(event) => {this.submitForm(event)}}>Send</button>
                    </div>

                    <div className="col-xs_12">
                        {callbackMessageForm&& <span className="error">{callbackMessageForm}</span>}
                        {callbackMessageFormSend&& <span className="success">{callbackMessageFormSend}</span>}
                    </div>
                </div>
            </section>
        )
    }
}

export default Author;
