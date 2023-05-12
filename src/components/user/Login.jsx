import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors } from '../../actions/productActions';
import { login } from '../../actions/userActions';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, loading, error } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/Shopping');
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [isAuthenticated, loading, error, alert, dispatch, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        const resp = dispatch(login(email, password));


    }

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={'Login'} />
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input type="email" id="email_field" className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input type="password" id="password_field" className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <Link to={'/Shopping/password/forgot'} className="float-right mb-4">Forgot Password?</Link>

                                <button id="login_button" type="submit" className="btn btn-block py-3">
                                    LOGIN
                                </button>

                                <Link to={'/Shopping/register'} className="float-right mt-3 mb-3">New User?</Link>
                            </form>
                        </div>
                    </div>

                </>
            )}

        </>
    )
}

export default Login