import styled from 'styled-components';
import {Link} from 'react-router-dom';
import LoginAddBtn from "./LoginAddBtn";

const Mcont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(255, 255, 255);
  padding: 1rem 1.4rem 0.5rem 1.4rem;
  border-radius: 8px;
`;
const Span = styled.span`
  font-size: 2.6rem;
`;
const P = styled.p`
  font-weight: 400;
  color: #2a2a2a;
`;
const LeadLink = styled(Link)`
  text-decoration: none;
  background: #518ddc;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
`;

function FoundPopup(props){
    const time = props.time;

    return (<Mcont className="fpopup">
        <Span>You found waldo!!</Span>
        <P>Your time: {time}s</P>
        <LeadLink to={`/leaderboard/${props.path}`}>View leaderboard</LeadLink>
        <LoginAddBtn time={time} level={props.path}/>
    </Mcont>);
}
export default FoundPopup;
