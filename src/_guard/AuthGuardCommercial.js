
import { Navigate } from 'react-router-dom';
import { connexionService } from '../_services/connexion.service';

const AuthGuardCommercial = ({ children }) => {
    if (connexionService.isLogged() === false) {
        return <Navigate to="/auth/login" />;
    }
    return children;
};

export default AuthGuardCommercial;
