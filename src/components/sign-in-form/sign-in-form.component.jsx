import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss'
import { signInWithGooglePopup, createUserDocumentFromAuth, logUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    
    email: '',
    password: '',
   
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields;

    

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }    

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }
    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const {user} = await logUserWithEmailAndPassword(email, password)

    //    setCurrentUser(user) will be handle by onausthstatechanged in user context for easy manipulation

     
        resetFormFields();
    } catch (error) {
        
        switch(error.code) {
            case 'auth/wrong-password':
                alert('incorrect password for email')
                resetFormFields();
                break;
            case 'auth/user-not-found':
                alert('Email not registered, kindly sign up')  
                resetFormFields();
                break;
            default:
                console.log(error);      
        }
       
    }
}

const logGoogleUser =  async() => {
    await signInWithGooglePopup();
    
    
}
    

    return(
        <div className='sign-in-container'>
            <h2>Already Have an account</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
                
                
               
                <FormInput label= "Email" type='email' required name="email" value = {email}  onChange={handleChange}/>
                
                <FormInput label= "Password" type='password' required name="password" value = {password} onChange={handleChange}/>
                <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type = 'button' onClick= {logGoogleUser} buttonType='google'>Google Sign In</Button>
                </div>
            </form>
            
        </div>
    )

}

export default SignInForm