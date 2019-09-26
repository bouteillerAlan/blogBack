import * as React from 'react';
import getData from "../function/getData";

interface Props {}
interface State {
    authorList: any
}

class Author extends React.Component<Props, State> {
    constructor(props: any){
        super(props);
        this.state = {
            authorList: null
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
    }

    render() {
        const {authorList} = this.state;

        return (
            authorList&&
            <section className="container">
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
                </table>
            </section>
        )
    }
}

export default Author;
