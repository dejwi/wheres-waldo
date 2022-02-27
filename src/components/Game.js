import styled from "styled-components";

const Container = styled.div`
      position: relative;
`;

// props - data:leveldata
function Game(props){
    const data = props.data;

    const logClick = (e) =>{
        const pos = {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY};
        if (pos.x >= data.posX && pos.x <= data.posX + data.width){
            if (pos.y >= data.posY && pos.y <= data.posY + data.height){
                console.log('found');
            }
        }
    };

    return (<div>
        <h1>Find Waldo</h1>
        <Container>
            <img src={data.imageUrl} alt='find waldo' onClick={logClick}/>
        </Container>

    </div>);
}
export default Game;
