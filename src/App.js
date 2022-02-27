import { useState, useEffect } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import {firestore} from './components/firebase';
import './styles/main.scss';

function App() {
    const [data, setData] = useState([]);
    useEffect(() =>{
        firestore.collection('waldos').get().then(snapshot => {
            setData( snapshot.docs.map(e =>
                ({...e.data(), id: e.id}) ));
        });
    },[]);

  return (
    <div>
    </div>
  );
}

export default App;
