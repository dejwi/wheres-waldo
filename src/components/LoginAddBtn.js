import { useAuthState} from "react-firebase-hooks/auth";
import {auth, firestore} from './firebase';
import firebase from 'firebase/compat/app';


function LoginAddBtn(props){
    // time level
    // auth uid displayName
    const [user] = useAuthState(auth);

    function SignIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    function AddRecord(){
        const messagesRef = firestore.collection('leaderboard')
            .doc(props.level).collection('data').doc(user.uid);
        messagesRef.set({
            time: props.time,
            uid: user.uid,
            name: user.displayName
        },{merge: true});
    }

    console.log(user);
    return (user ? <button onClick={AddRecord}>Add to leaderboard</button>
        : <button onClick={SignIn}>Login</button>)
}
export default LoginAddBtn;
