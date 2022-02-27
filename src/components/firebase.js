import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'

import firebase_config from '../firebase-config.json';

if (!firebase.apps.length) {
    firebase.initializeApp(firebase_config);
}

// export const auth = firebase.auth();
export const firestore = firebase.firestore();