import React, {Component} from 'react';
import ContentView from '../view/Content.view'

class Content extends Component {
    constructor(props: any){
        super(props);
        this.state = {}
    }

    render() {
        return (
            <ContentView/>
        )
    }
}

export default Content;
