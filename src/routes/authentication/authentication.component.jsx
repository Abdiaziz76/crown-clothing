// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';
// import {signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, auth} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss'
const Authentication = () => {

    //the below comments were learning codes for loging in with google popup and redirect. the use effect is for the google redirect so as to not lose progress when site redirects to google
    // useEffect(async()=>{
    //     const response = await getRedirectResult(auth)
        
    //     if(response) {
    //         const userDocRef = await createUserDocumentFromAuth(response.user);
    //     }
    // }, [])

    // const logGoogleUser = async() => {
    //     const response = await signInWithGooglePopup();
    //     const {user} = response;
        
    //     const userDocRef = await createUserDocumentFromAuth(user);
    // }
    // const logGoogleUserRedirect = async() => {
    //     const response = await signInWithGoogleRedirect();
    //     const {user} = response;
        
    //     const userDocRef = await createUserDocumentFromAuth(user);//for console logging
    // }

    return(
        <div className='authentication-container'>
            <SignInForm/>
            <SignUpForm />
            
        </div>
    )
}

export default Authentication