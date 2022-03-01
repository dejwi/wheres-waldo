import styled from "styled-components";
import { useState, useEffect } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import {firestore} from './components/firebase';
import {Link} from 'react-router-dom';
import './styles/main.scss';
import {ReactComponent as leaderboard} from "./components/leaderboard.svg";

const Gimg = styled.img`
  height: 10rem;
  width: auto;
`;

const Licon = styled(leaderboard)`
  width: 1.5rem;
  height: 1.5rem;
`;

function LboardLink(props){
    return(
    <Link className='licon' to={`/leaderboard/${props.name}`}><Licon/></Link>);
}

function App() {
    const [data, setData] = useState([]);
    useEffect(() =>{
        firestore.collection('waldos').get().then(snapshot => {
            setData( snapshot.docs.map(e =>
                ({...e.data(), id: e.id}) ));
        });
    },[]);

  return (
    <div className="selection">
        <h2>Choose a map to play!</h2>
        <div className="maps">
            {data.map(e =>
                <Link key={e.id} to={`/play/${e.name}`}>
                    <LboardLink  name={e.name}/>
                    <Gimg src={e.imageUrl}/>
                </Link>
            )}
        </div>

    </div>
  );
}

export default App;
