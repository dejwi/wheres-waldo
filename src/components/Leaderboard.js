import { useCollectionData } from 'react-firebase-hooks/firestore';import {useState, useEffect} from "react";
import {auth, firestore} from "./firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LoginInfo from "./LoginInfo";
import {Link} from "react-router-dom";

const RowD = styled.div`
  display: grid;
  font-size: 1.7rem;
  grid-template-columns: minmax(8ch,12ch) 5ch;
  padding: 0.4rem 1rem;
`;
const Mcont = styled.div`
  background: rgba(255, 255, 255, 0.25);
  border-radius: 5px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.1px);
`;
function row(data) {
    return (
        <RowD key={data.uid}>
            <span>{data.name}</span>
            <span>{data.time}s</span>
        </RowD>
    );
}
const Topbtn = styled(Link)`
  position: absolute;
  top: 0.5rem;
  border: none;
  border-radius: 5px;
  padding: 0.4rem 1.5rem;
  background: #313131;
  color: white;
  font-size: 1.1rem;
  text-decoration: none;
  cursor: pointer;
`;
function Leaderboard(props){
    const params = useParams();

    const [user] = useAuthState(auth);

    const query = firestore.collection('leaderboard')
        .doc(params.level).collection('data').limit(8).orderBy('time');
    const [data] = useCollectionData(query);

    return (<div className="leaderboard">
        <Topbtn to='/'>Menu</Topbtn>
        <h2>{params.level}</h2>
        <Mcont>
            {data ? data.map(e => row(e) ) : null}
        </Mcont>

        {user ? <LoginInfo name={user.displayName}/> : null}

    </div>);
}
export default Leaderboard;
