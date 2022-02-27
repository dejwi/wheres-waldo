import { useState, useEffect } from "react";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from "react-firebase-hooks/auth";

import './styles/main.scss';
import Game from './components/Game';

import firebase_config from './firebase-config.json';
firebase.initializeApp(firebase_config);

const auth = firebase.auth();
const firestore = firebase.firestore();

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
        {data[0] ? <Game data={data[0]}/> : null}
    </div>
  );
}

export default App;
