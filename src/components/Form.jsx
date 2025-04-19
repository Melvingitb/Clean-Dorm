import { useState } from "react";
import "../css/form.css";

function Form() {
   const [isActive, setIsActive] = useState(false);

   const handleSignUpClick = () => {
      setIsActive(true);
      console.log("Sign Up Clicked! isActive:", true);
   };

   const handleSignInClick = () => {
      setIsActive(false);
      console.log("Sign In Clicked! isActive:", false);
   };

   return (
      <div className={`container ${isActive ? "right-panel-active" : ""}`}>
         <div className="form-container signUp-container">
            <div className="form">
               <h1>Sign Up</h1>
               <input type="text" placeholder="Name" />
               <input type="email" placeholder="Email" />
               <input type="password" placeholder="Password" />
               <button>Sign Up</button>
            </div>  
         </div>
         <div className="form-container signIn-container">
            <div className="form">
               <h1>Sign In</h1>
               <input type="email" placeholder="Email" />
               <input type="password" placeholder="Password" />
               <button>Sign In</button>
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
