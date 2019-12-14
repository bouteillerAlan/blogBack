import React from 'react';

const authorView: React.FunctionComponent = (authorList: any) => {
    return (
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
};

export default authorView;
