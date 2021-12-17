import { Link, useParams } from 'react-router-dom';
import {
    ChangeEvent,
    FormEvent,
    Fragment,
    useEffect,
    useState,
} from 'react';
import { getUserById, updateUser } from '../../../store/users/actions';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../store';
import { IUpdateUserRequest } from '../../../store/users/types';
import { UrlConstants } from '../../../constants';
import { validateEmail } from '../../../helpers';
import LoadingOverlay from 'react-loading-overlay';

export const EditUser = () => {
    let { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const user = useSelector((state: AppState) => state.users.editUser);

    useEffect(() => {
        dispatch(getUserById(id));
    }, [dispatch, id]);

    useEffect(() => {
        setFormInputs({
            name: user !== null ? user.name : '',
            phone: user !== null ? user.phone : '',
            email: user !== null ? user.email : '',
        });
    }, [user]);

    const [formInputs, setFormInputs] = useState({
        email: '',
        name: '',
        phone: '',
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { email, name, phone } = formInputs;

    const loading = useSelector<AppState>((state) => state.users.loading) as boolean;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormInputs((inputs) => ({ ...inputs, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitted(true);
        if (email && name && phone) {
            const user: IUpdateUserRequest = {
                email: email,
                name,
                phone,
            };
            dispatch(updateUser(id, user));
        }
    };

    return (
        <Fragment>
            <h1 className='h3 mb-2 text-gray-800'>Update user</h1>
            <div className='card shadow mb-4'>
                <div className='card-header py-3'>
                    <h6 className='m-0 font-weight-bold text-primary'>
                        User information
                    </h6>
                </div>
                <LoadingOverlay
                    active={loading && !formSubmitted}
                    spinner
                    text='Loading...'
                >
                    <div className='card-body'>
                        <div className="row">
                            <div className="col-sm-6">
                                <form onSubmit={handleSubmit}>
                                    <div className='form-group'>
                                        <label>Name</label>
                                        <input
                                            type='text'
                                            className={
                                                'form-control ' +
                                                (formSubmitted && !name ? 'is-invalid' : '')
                                            }
                                            value={name}
                                            name='name'
                                            onChange={handleChange}
                                        />
                                        {formSubmitted && !name && (
                                            <div className='invalid-feedback'>First name is required</div>
                                        )}
                                    </div>
                                    <div className='form-group'>
                                        <label>Phone</label>
                                        <input
                                            type='phone'
                                            className={
                                                'form-control ' +
                                                (formSubmitted && !phone ? 'is-invalid' : '')
                                            }
                                            value={phone}
                                            name='phone'
                                            onChange={handleChange}
                                        />
                                        {formSubmitted && !phone && (
                                            <div className='invalid-feedback'>Last name is required</div>
                                        )}
                                    </div>
                                    <div className='form-group'>
                                        <label>Email</label>
                                        <input
                                            type='text'
                                            className={
                                                'form-control ' +
                                                (formSubmitted && (!email || !validateEmail(email))
                                                    ? 'is-invalid'
                                                    : '')
                                            }
                                            value={email}
                                            name='email'
                                            placeholder='name@example.com'
                                            onChange={handleChange}
                                        />
                                        {formSubmitted && !email && (
                                            <div className='invalid-feedback'>Email is required</div>
                                        )}
                                        {formSubmitted && !validateEmail(email) && (
                                            <div className='invalid-feedback'>Email is not valid</div>
                                        )}
                                    </div>
                                    <div className='form-group'>
                                        <Link className='btn btn-danger mr-2' to={UrlConstants.USERS_LIST}>
                                            Cancel
                                        </Link>
                                        <button className='btn btn-primary' type='submit'>
                                            {loading && formSubmitted && (
                                                <span className='spinner-border spinner-border-sm mr-1'></span>
                                            )}
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </LoadingOverlay>
            </div>
        </Fragment>
    );
};