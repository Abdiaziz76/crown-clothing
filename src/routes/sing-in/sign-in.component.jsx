// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';
import {signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, auth} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
const SignIn = () => {
    // useEffect(async()=>{
    //     const response = await getRedirectResult(auth)
        
    //     if(response) {
    //         const userDocRef = await createUserDocumentFromAuth(response.user);
    //     }
    // }, [])

    const logGoogleUser = async() => {
        const response = await signInWithGooglePopup();
        const {user} = response;
        
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    // const logGoogleUserRedirect = async() => {
    //     const response = await signInWithGoogleRedirect();
    //     const {user} = response;
        
    //     const userDocRef = await createUserDocumentFromAuth(user);
    // }

    return(
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>
                Sign in With Google Popup
            </button>
            {/* <button onClick={logGoogleUserRedirect}>
                Sign in With Google Redirect
            </button> */}
            <SignUpForm />
            
        </div>
    )
}

export default SignIn