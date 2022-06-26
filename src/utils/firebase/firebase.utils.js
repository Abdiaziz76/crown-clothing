import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAF1EpTH5FfnyDhF5tPz-QKNqkLgi7P5Rc",
    authDomain: "crown-clothing-db-e11a9.firebaseapp.com",
    projectId: "crown-clothing-db-e11a9",
    storageBucket: "crown-clothing-db-e11a9.appspot.com",
    messagingSenderId: "183151866885",
    appId: "1:183151866885:web:cd335f650dafedf352986c"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: 'select_account'
  });
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db =  getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    //set a reference doc for your documents in db in this case users
    const userDocref = doc(db, 'users', userAuth.uid);
    console.log(userDocref);
// geta snapshot of your dbs docs with the above docrefrence. 
//snapshot help you check if the docref exists
    const userSnapshot = await getDoc(userDocref);

    //if user doesn't exists
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocref, {
                displayName,
                email,
                createdAt,
            })
        } catch (error) {
            console.log("error while creating user", error.message)
        }
    }
//if user exists
    return userDocref;
}