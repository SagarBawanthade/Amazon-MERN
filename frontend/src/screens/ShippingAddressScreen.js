import React, { useState, useContext, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Helmet } from "react-helmet-async";
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingAddressScreen() {

    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo, cart: { shippingAddress },
    } = state;

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [states, setStates] = useState(shippingAddress.states || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setAPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');



    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                state,
                city,
                postalCode,
                country,
            },
        });
        localStorage.setItem('shippingaddress',
            JSON.stringify({
                fullName,
                address,
                state,
                city,
                postalCode,
                country,
            })
        );
        navigate('/payment');
    }


    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping');
        }
    }, [userInfo, navigate])
    return (
        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className='container small-container'>
                <div>
                    <h1 className='my-3'>Shipping Address</h1>
                </div>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="states">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            value={states}
                            onChange={(e) => setStates(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="postalcode">
                        <Form.Label>PostalCode</Form.Label>
                        <Form.Control
                            value={postalCode}
                            onChange={(e) => setAPostalCode(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </Form.Group>

                    <div className="mb-3">
                        <button
                            type="submit"
                            className="Button">
                            Continue
                        </button>
                    </div>

                </Form>
            </div>

        </div>
    )
}

export default ShippingAddressScreen;