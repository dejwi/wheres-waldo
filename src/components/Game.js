import {useState, useEffect} from "react";
import {firestore} from "./firebase";
import { useParams } from "react-router-dom";
import FoundPopup from "./FoundPopup";

function Game(){
    const params = useParams();
    const [data, setData] = useState({});
    const [time,setTime] = useState(0.00);

    const [popup,setPopup] = useState(false);
    const [intervalov,setIntervalov] = useState(false);
    // ^ need to fix problem when interval stop and goes on again

    useEffect(() => {
        const query = firestore.collection('waldos')
            .where('name','==',params.level);
        query.get().then(snap => snap.docs[0].data()).then(dat => setData(dat));
    },[]);


    let inv;
    useEffect(()=>{
        inv = setInterval(()=>{
            setTime( Math.round((parseFloat('0.1')
                + parseFloat(time))*100)/100);
        },100);

        if(intervalov) clearInterval(inv);
        return ()=> {clearInterval(inv);};
    });

    const logClick = (e) =>{
        // postion relative to the element
        const rect = e.target.getBoundingClientRect();
        const pos = {x: e.clientX - rect.left, y: e.clientY - rect.top};

        if (pos.x >= data.posX && pos.x <= data.posX + data.width){
            if (pos.y >= data.posY && pos.y <= data.posY + data.height){
                clearInterval(inv);
                setIntervalov(true);
                setPopup(true);
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
    return (<div className="game">
        <h1>Find Waldo</h1>
        <h5>Be fast!</h5>
        <span>{time}s</span>

        <img src={data.imageUrl} alt='find waldo' onClick={logClick}/>
        {/*<button onClick={addLeaderboard} >Add to leaderboard</button>*/}
        {popup ? (
            <div className="popupCont">
                <FoundPopup time={time} path={data.name}/>
            </div>
        ) : null}
    </div>);
}
export default Game;
