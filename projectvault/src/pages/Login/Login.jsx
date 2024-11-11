import React, { useState, useEffect } from 'react';
import './Login.css';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { addUserSignInDataToDB, checkUserExists } from '../../Service/api';
import { useData } from '../../DataContext';

function Login() {
    const { loginWithPopup, isAuthenticated, user } = useAuth0();
    const navigate = useNavigate();
    const { lastPage } = useData();

    React.useEffect( () => {
        if (isAuthenticated) {
            handleAddSignInDataToDB();
            if(lastPage)
            navigate(lastPage, { replace: true });
            else
            navigate("/", { replace: true });
        }
        else
        {
            loginWithPopup();
        }
    }, [isAuthenticated]);

    React.useEffect( () => {
        loginWithPopup();
    }, []);

    async function handleAddSignInDataToDB(){
        try{
            // check user exists or not in MongoDB
            const data={};
            data['email']= user.email ;
            const userState = await checkUserExists(data);
            if(!userState['exists'])
            await addUserSignInDataToDB(data);
        }
        catch(e)
        {
            console.log("Some internal error occured.");
        }
    }
    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <>
            <div className='login-page-area'>
                { !isAuthenticated && <button onClick={()=> loginWithPopup()}>Login to Continue</button>}
                { isAuthenticated && <button onClick={()=> handleBackToHome()}>Home</button>}
            </div>
            
        </>
    );
}

export default Login;