import React from 'react';

const authorView: React.FunctionComponent = () => {
    return (
        <section>
            <div className="input-block">
                <label htmlFor="firstName">First name </label>
                <input type="text" name="firstName" id="firstName"/>
            </div>

            <div className="input-block">
                <label htmlFor="lastName">Last name </label>
                <input type="text" name="lastName" id="lastName"/>
            </div>

            <div className="input-block">
                <label htmlFor="password">Password </label>
                <input type="password" name="password" id="password"/>
            </div>

            <div className="input-block">
                <label htmlFor="password">Message </label>
                <textarea name="message" id="message"> </textarea>
            </div>

            <button className="submit">Send</button>

        </section>
    )
};

export default authorView;
