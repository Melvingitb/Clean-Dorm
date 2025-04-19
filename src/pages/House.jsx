import Canvas from '../components/Canvas'

function House() {
  const navigate = useNavigate();

  const handleLogout = async () => {
        try {
           await signOut(auth);
           navigate('/');
        } catch (err) {
           alert('Error logging out.');
        }
     };

  const [fakeHouse, setFakeHouse] = useState(null);

  const setHouse = () => {
    setFakeHouse({
      "attrs": {
        "width": 500,
        "height": 500
      },
      "className": "Stage",
      "children": [
        {
          "attrs": {},
          "className": "Layer",
          "children": [
            {
              "attrs": {
                "x": 50,
                "y": 60,
                "width": 100,
                "height": 100,
                "fill": "blue",
                "name": "Living Room"
              },
              "className": "Rect"
            },
            {
              "attrs": {
                "x": 200,
                "y": 60,
                "width": 40,
                "height": 40,
                "fill": "green",
                "name": "Bathroom"
              },
              "className": "Rect"
            }
          ]
        }
      ]
    });
  }
     
  const saveHouseToFirebase = async () => {
    // Parse JSON to get array of room names
    let rooms = [];

    let children = fakeHouse.children[0].children;

    children.forEach(function(element) {
      rooms.push(element.attrs.name);
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
        layout: fakeHouse,
        rooms: rooms
      });

      alert("House saved!");
    } catch (e) {
      console.log("Error saving house. Error: ", e);
      alert("Failed to save house.");
    }
  };

  return (
    <>
      <Canvas />
    </>
  )
}
  
export default House