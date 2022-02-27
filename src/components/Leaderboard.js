import { useCollectionData } from 'react-firebase-hooks/firestore';
import {useState, useEffect} from "react";
import {firestore} from "./firebase";
import { useParams } from "react-router-dom";

function row(data){
    return(
        <div key={data.uid}>
            <span>{data.name}</span>
            <span>{data.time}</span>
        </div>
    );
}

function Leaderboard(){
    const params = useParams();

    const query = firestore.collection('leaderboard')
        .doc(params.level).collection('data');
    const [data] = useCollectionData(query);
    console.log(data);
    return (<div>
        {data ? data.map(e => row(e) ) : null}
    </div>);
}
export default Leaderboard;
