import "bootstrap/dist/css/bootstrap.min.css";
import AuthUser from './AuthUser';
import Guest from './navbar/guest';
import Auth from './navbar/auth';

function Index() {
    const {getToken} = AuthUser();
    if(!getToken()){
    return <Guest />
    }
    return (
        <Auth />
    );

}

export default Index;

