import styled from "styled-components";
import {useState, useEffect} from "react";
import {firestore} from "./firebase";
import { useParams } from "react-router-dom";
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

function Game(){
    const params = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        const query = firestore.collection('waldos')
            .where('name','==',params.level);
        query.get().then(snap => snap.docs[0].data()).then(dat => setData(dat));
    },[]);

    const [time,setTime] = useState(0.00);
    let inv;
    useEffect(() => {
        inv = setInterval(()=>{
            setTime( Math.round((parseFloat('0.1')
                + parseFloat(time))*100)/100);
        },100);

        return ()=> {
            clearInterval(inv);
        };
    });

    const logClick = (e) =>{
        // postion relative to the element
        const rect = e.target.getBoundingClientRect();
        const pos = {x: e.clientX - rect.left, y: e.clientY - rect.top};

        if (pos.x >= data.posX && pos.x <= data.posX + data.width){
            if (pos.y >= data.posY && pos.y <= data.posY + data.height){
                console.log('found');
                clearInterval(inv);
            }
        }
    };
    const addLeaderboard = () => {
        const messagesRef = firestore.collection('leaderboard')
            .doc('beach').collection('data');
        messagesRef.add({
            time: time,
            uid: 'gdfgSEFfes',
            name: 'bruh'
        });
    };
    return (<div>
        <h1>Find Waldo</h1>
        <span>Time: {time}</span>

        <div>
            <img src={data.imageUrl} alt='find waldo' onClick={logClick}/>
            <button onClick={addLeaderboard} >Add to leaderboard</button>
        </div>


    </div>);
}
export default Game;
