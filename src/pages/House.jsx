import Canvas from '../components/Canvas'

import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from '../components/firebase';
import { db } from "../components/firebase";
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function House() {
  const [currentHouse, setcurrentHouse] = useState(null);

  const navigate = useNavigate();

  const handleLogout = async () => {
        try {
           await signOut(auth);
           navigate('/');
        } catch (err) {
           alert('Error logging out.');
        }
     };

  const handleSaveHouse = async ( house ) => {
    console.log("HANDLESAVEHOUSE CALLED");
    saveHouseToFirebase(house);
  }
     
  const saveHouseToFirebase = async (house) => {
    console.log("SAVEHOUSE TO FIREBASE CALLED");
    console.log(typeof house);
    // Parse JSON to get array of room names
    let rooms = [];

    console.log("CHILDREN:", house);

    //let children = house.children[0].children;

    console.log("GOT HERE");
    house.forEach(function(element) {
      rooms.push(element.name);
    });

    // save to Firebase
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Must be logged in to save a house layout.");
        return;
      }

      const docRef = await addDoc(collection(db, "Houses"), {
        userId: user.uid,
        layout: house,
        rooms: rooms,
        createdAt: serverTimestamp()
      });

      alert("House saved!");
    } catch (e) {
      console.log("Error saving house. Error: ", e);
      alert("Failed to save house.");
    }
  };

  return (
    <>
      <div className="navbar">
        <a href="/chores">Chores</a>
      </div>
      <Canvas handleLogout={ handleLogout } handleSaveHouse={ handleSaveHouse } />
    </>
  )
}
  
export default House