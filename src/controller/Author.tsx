import React, {Component} from 'react';
import AuthorView from '../view/Author.view';

class Author extends Component {
    constructor(props: any){
        super(props);
        this.state = {}
    }

    render() {
        return (
           <AuthorView/>
        )
    }
}

export default Author;
