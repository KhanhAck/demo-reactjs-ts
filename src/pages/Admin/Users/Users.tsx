import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../store';
import { IUser } from '../../../store/users/types';
import { deleteUsers, loadUsers } from '../../../store/users/actions';
import { Link } from 'react-router-dom';
import { UrlConstants } from '../../../constants';
import swal from 'sweetalert';
import LoadingOverlay from 'react-loading-overlay';

export const Users = () => {
    const users: IUser[] = useSelector((state: AppState) => state.users.items);
    const loading = useSelector<AppState>((state) => state.users.loading) as boolean;

    const [searchKeyword, setSearchKeyword] = useState('');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUsers(searchKeyword));
    }, [dispatch]);

    const userElements: JSX.Element[] = users.map((user) => {
        return (
            <tr key={`user_${user.id}`}>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td className="text-center">
                    <Link
                        to={UrlConstants.USER_EDIT + user.id}
                        className='btn btn-sm btn-primary mr-2'
                    >
                        <i className='fas fa-fw fa-wrench'></i>
                    </Link>
                    <a href="javascript:void(0);" onClick={() => handleDelete(user.id)}
                        className="btn btn-sm btn-danger">
                        <i className='fas fa-trash'></i>
                    </a>
                </td>
            </tr>
        );
    });

    const handleDelete = (id: any) => {
        swal({
            title: 'Confirm',
            text: 'Do you want to delete user?',
            icon: 'warning',
            buttons: ['No', 'Yes'],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deleteUsers(id));
            }
        });
    };

    const handleKeywordPress = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    };

    return (
        <Fragment>
            <div>
                <h1 className='h3 mb-2 text-gray-800'>List Users</h1>

                {/* DataTales Example */}
                <div className='card shadow mb-4'>
                    <div className='card-header py-3'>
                        <h6 className='m-0 font-weight-bold text-primary'>
                            List Users
                        </h6>
                    </div>
                    <div className='card-body'>
                        <div className="row">
                            <div className="col-sm-12 form-group">
                                <form className="form-inline">
                                    <input type="text" className="form-control mr-2" placeholder="Keyword..."
                                        value={searchKeyword}
                                        onChange={handleKeywordPress}
                                    />
                                    <button type="button" className="btn btn-primary mr-2"
                                        onClick={() =>
                                            dispatch(loadUsers(searchKeyword))
                                        }
                                    >Search</button>
                                    <Link
                                        to={UrlConstants.USER_ADD}
                                        className='btn btn-success'
                                    >
                                        <span className='fa fa-plus'></span> Add new
                                    </Link>
                                </form>
                            </div>
                        </div>
                        <div className='table-responsive'>
                            <LoadingOverlay
                                active={loading}
                                spinner
                                text='Loading...'
                            >
                                <table
                                    className='table table-bordered'
                                    id='dataTable'
                                    width='100%'
                                    cellSpacing={0}
                                >
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>{userElements}</tbody>
                                </table>
                            </LoadingOverlay>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};