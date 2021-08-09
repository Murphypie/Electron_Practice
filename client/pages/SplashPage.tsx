// import package modules
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../css/SplashPage.css';

const SplashPage = (() => {
    const history = useHistory()
    // routing function for onClick
    const loginRedirectOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // capture the e.target.id to send to state for login
        //history.push('/login');

    }

    return (
        <div>
          <h1>Hello</h1>
            <div className="splash">
                <button type='button' id='myself' onClick={(e) => loginRedirectOnClick(e)}>Login</button>
            </div>
        </div>
    )
});

export default SplashPage;