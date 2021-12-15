import { RouteProps, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AccountState } from '../store/account/types';
import { AppState } from '../store';

export const PrivateRoute = ({
    children
}: RouteProps): any => {
    const account: AccountState = useSelector((state: AppState) => state.account);

    return account.token ? children : <Navigate to="/login" />;
};