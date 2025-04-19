import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from './firebase';
import "../css/form.css";

function Form() {
   const [isActive, setIsActive] = useState(false);

   // Firebase variables
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();

   const handleLogin = async () => {
      try {
         await signInWithEmailAndPassword(auth, email, password);
         navigate('/house');
      } catch (err) {
         alert('Invalid username or password');
      }
   };

   const handleRegister = async () => {
      const auth = getAuth();
      try {
         await createUserWithEmailAndPassword(auth, email, password);
         alert('User registered successfully!');
         const user = auth.currentUser;
         // if user is created successfully, store additional information in Firestore
         if (user) {
            await setDoc(doc(db, 'Users', user.uid), {
               username: username,
               email: user.email
            });
         }

         // redirect user to house page after successful registration
         navigate('/house');
      } catch (err) {
         // customize error messages based on Firebase error codes
         switch (err.code) {
            case 'auth/invalid-email':
               alert('Please enter a valid email address.');
               break;
            case 'auth/missing-email':
               alert('Please provide an email address.');
               break;
            case 'auth/weak-password':
               alert('Password should be at least 6 characters.');
               break;
            case 'auth/missing-password':
               alert('Please provide a password.');
               break;
            case 'auth/email-already-in-use':
               alert('This email is already registered. Please log in or use another email.');
               break;
            default:
               alert('Registration failed. Please try again.');
               console.log(`Error: ${err}`);
               break;
         } 
      }
   };

   const handleSignUpClick = () => {
      setIsActive(true);
      setEmail('');
      setPassword('');
      console.log("Sign Up Clicked! isActive:", true);
   };

   const handleSignInClick = () => {
      setIsActive(false);
      setEmail('');
      setPassword('');
      console.log("Sign In Clicked! isActive:", false);
   };

   return (
      <div className={`container ${isActive ? "right-panel-active" : ""}`}>
         <div className="form-container signUp-container">
            <div className="form">
               <h1>Sign Up</h1>
               <input type="text" placeholder="Name" value={username} onChange={(e) => setUsername(e.target.value)} />
               <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
               <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
               <button onClick={handleRegister}>Sign Up</button>
            </div>  
         </div>
         <div className="form-container signIn-container">
            <div className="form">
               <h1>Sign In</h1>
               <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
               <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
               <button onClick={handleLogin}>Sign In</button>
            </div>
         </div>
         <div className="overlay-container">
            <div className="overlay">
               <div className="overlay-panel overlay-left">
                  <h1>Welcome back!</h1>
                  <p>Already have an account? Please sign in with your personal information.</p>
                  <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>  
               </div>
               <div className="overlay-panel overlay-right">
                  <h1>Hello friend!</h1>
                  <p>Want to keep track of your chores? Sign up to get started today.</p>
                  <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Form;
