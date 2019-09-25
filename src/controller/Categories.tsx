import React, {Component} from 'react';
import CategoriesView from '../view/Categories.view';

class Cat extends Component {
    constructor(props: any){
        super(props);
        this.state = {}
    }

    render() {
        return (
            <CategoriesView/>
        )
    }
}

export default Cat;
