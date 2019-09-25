import React from 'react';

const authorView: React.FunctionComponent = () => {
    return (
        <section className="container row">
            <div className="input-block col-xs_6">
                <label htmlFor="firstName">First name </label>
                <input type="text" name="firstName" id="firstName"/>
            </div>

            <div className="input-block col-xs_6">
                <label htmlFor="lastName">Last name </label>
                <input type="text" name="lastName" id="lastName"/>
            </div>

            <div className="input-block col-xs_12 col-l_12">
                <label htmlFor="password">Password </label>
                <input type="password" name="password" id="password"/>
            </div>

            <div className="input-block col-xs_12 col-l_12">
                <label htmlFor="password">Message </label>
                <textarea name="message" id="message"> </textarea>
            </div>

            <div className="col-xs_12 col-l_12">
                <button className="submit">Send</button>
            </div>

        </section>
    )
};

export default authorView;
