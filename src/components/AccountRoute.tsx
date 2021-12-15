import { RouteProps } from 'react-router-dom';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

import { AccountState } from '../store/account/types';
import { AppState } from '../store';
import { Login } from '../pages/Account/Login';

export const AccountRoute = ({
    children
}: RouteProps): any => {
    const account: AccountState = useSelector((state: AppState) => state.account);

    return account.token ? <Navigate to="/admin/home" /> : <Login />;
};