import React from 'react';
import {Link} from "react-router-dom";

const NavbarView: React.FunctionComponent = () => {
    return (
        <div className={'navbar'}>
            <ul>
                <Link to={'/'}>
                    <li>Articles</li>
                </Link>
                <Link to={'/categories'}>
                    <li>Categories</li>
                </Link>
                <Link to={'/authors'}>
                    <li>Utilisateurs</li>
                </Link>
            </ul>
        </div>
    );
};

export default NavbarView;
