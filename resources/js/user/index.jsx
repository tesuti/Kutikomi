import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import Guest from "./navbar/guest";
import Auth from "./navbar/auth";
import{LoginUser} from '../User';

function Index() {
const userdetail =useContext(LoginUser);

    return(
        <>
            {!userdetail ? <Guest /> : <Auth />}
        </>
    )

}

export default Index;

