import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { NavLink } from "react-router-dom";
import Axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { Store } from '../Store';
import { toast } from "react-toastify";
import { getError } from "../Util";



export default function SiginScreen() {

    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post('/api/users/signin', {
                email,
                password,
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');

        } catch (err) {
            toast(getError(err));

        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }

    }, [navigate, redirect, userInfo]);


    return (
        <Container className="small-container">
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        placeholder="Enter your email"
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        placeholder="Enter your Password"
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <div>
                    <button type="submit" className="Button">Sign In</button>
                </div>
                <div className="mb-3">
                    New customer?{' '}
                    <NavLink to={`/signup?redirect=${redirect}`}>Create your account</NavLink>
                </div>
            </Form>
        </Container>
    )
}
