import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component"
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}



const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields;

    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        if(password !== confirmPassword) return alert('password doesn\'t match');
        
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password)

            await createUserDocumentFromAuth(user, {displayName})

            console.log(user) 
            resetFormFields();
        } catch (error) {
            
            if(error.code === 'auth/email-already-in-use'){
                alert('Email already exists, please sign in')
            }else{
                console.log('there was an error while authenicating', error.message)
            }
        }
        
          
    }
    

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})

    }

    return(
        <div className='sign-up-container'>
            <h2>Don't have an account</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput label= "Display Name" type='text' required name="displayName" value={displayName} onChange={handleChange}/>
               
                <FormInput label= "Email" type='email' required name="email" value = {email} onChange={handleChange}/>
                
                <FormInput label= "Password" type='password' required name="password" value = {password} onChange={handleChange}/>
                
                <FormInput label= "Confirm Password" type="password" required name="confirmPassword" value = {confirmPassword} onChange={handleChange}/>
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;