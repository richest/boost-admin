import { Navigate} from 'react-router-dom';
import { REDIRECT_UNAUTH_ROUTE, REDIRECT_AUTH_ROUTE } from '../app/constants';

export function AuthRouteHelper({children, isAuthenticated,  ...rest}) {
    return isAuthenticated ? children:<Navigate to={REDIRECT_UNAUTH_ROUTE} />
}

export function ProtectedRouteHelper({children, isAuthenticated, ...rest}) {
   return !isAuthenticated ? children:<Navigate to={REDIRECT_AUTH_ROUTE} />
}