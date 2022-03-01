import {auth} from "./firebase";
import styled from "styled-components";
import {ReactComponent as LSvg} from "./logout.svg";

const LogoutSvg = styled(LSvg)`
  width: 0.8rem;
  height: 0.8rem;
  cursor: pointer;
`;
function LoginInfo(props){

    return(<div style={{display: "flex", gap: "0.5rem", alignItems: "center"}}>
        <span>Logged as: {props.name}</span>
        <LogoutSvg onClick={()=>auth.signOut()} />
    </div>)
}
export default LoginInfo;
