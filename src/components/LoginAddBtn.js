import { useAuthState} from "react-firebase-hooks/auth";
import {auth, firestore} from './firebase';
import firebase from 'firebase/compat/app';
import styled from "styled-components";

const AddLeaderbd = styled.button`
  cursor: pointer;
  border: none;
  background: #262626;
  color: #ffffff;
  margin-top: 0.2rem;
  border-radius: 5px;
  padding: 0.2rem 0.6rem;
  font-size: 0.8rem;
`;
const LoginBtn = styled.button`
  cursor: pointer;
  border: none;
  background: rgba(67, 189, 28, 0.56);
  color: #232323;
  margin-top: 0.2rem;
  border-radius: 5px;
  padding: 0.2rem 1rem;
  font-size: 0.8rem;
`;

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
    return (user ? <AddLeaderbd onClick={AddRecord}>Add to leaderboard</AddLeaderbd>
        : <LoginBtn onClick={SignIn}>Login</LoginBtn>)
}
export default LoginAddBtn;
