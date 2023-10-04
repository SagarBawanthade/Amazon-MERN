import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';
import axios from 'axios';
import { Store } from '../Store';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';


function Product(props) {

    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, } = state;
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity },
        });
        navigate("/cart");
    };




    const { product } = props;
    return (
        <>
            <Card>
                <NavLink to={`/product/${product.slug}`}>
                    <img src={product.image} className="card-img-top" alt={product.name} />
                </NavLink>
                <Card.Body>
                    <NavLink to={`/product/${product.slug}`}>
                        <Card.Title>{product.name}</Card.Title>
                    </NavLink>
                    <Rating rating={product.rating} numReviews={product.numReviews} />
                    <Card.Text><strong>${product.price}</strong></Card.Text>
                    {product.countInStock > 0 ?
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <div className="d-grid">
                                        <button onClick={addToCartHandler} className="Button">Add to Card</button>
                                    </div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        : (
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <div className="d-grid">
                                            <Button disabled variant="primary">Out of Stock</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                </Card.Body>
            </Card></>
    )
}

export default Product;