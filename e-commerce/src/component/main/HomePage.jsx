import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assert/css/homepage.css';
import { CartContext } from '../cart/CartContext';
import '../../assert/css/category.css';
import { useTranslation } from "react-i18next";
import { LanguageContext } from '../../languges/LangugeContext';
import Magnifier from '../../utility/Magnifier';
const Rating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<span key={i} className="star filled">&#9733;</span>);
    } else {
      stars.push(<span key={i} className="star">&#9733;</span>);
    }
  }
  return <div>{stars}</div>;
};
const HomePage = ({ search, setSearch }) => {
  const [productData, setProductData] = useState([]);
  const [cart, setCart] = useState([]);
  const { cartCount, setCartCount } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { t, i18n } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const { translate } = useContext(LanguageContext);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProductData(response.data.products);
        const uniqueCategories = [...new Set(response.data.products.map((product) => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        if (error.code === 'ERR_NETWORK') {
          console.error('Network error:', error);
        } else {
          console.error(error);
        }
      }
    };
    fetchProducts();
  }, [search]);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
    setCartCount(cartItems.length);
  }, [setCartCount]);

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const productAlreadyInCart = existingCart.some((item) => item.id === product.id);

    if (!productAlreadyInCart) {
      const newCart = [...existingCart, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(newCart));
      setCart(newCart);
      setCartCount(newCart.length);
      toast.success(translate('homepage.addToCartSuccess', { product: product.title }), { 
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.info(translate('homepage.alreadyInCart', { product: product.title }), { 
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null); 
  };

  const [showProductDetails, setShowProductDetails] = useState(false);

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const closeProductDetails = () => {
    setShowProductDetails(false);
    setSelectedProduct(null);
  };
  return (
    <div className="bg-slate-500">
      <ToastContainer />
      <Row>
        <Col sm={2} md={2} lg={2}>
          <h2>{translate('homepage.categories')}</h2>
          <nav className="category-nav">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </nav>
        </Col>
        {/* <div>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('fr')}>French</button>
          </div> */}
        <Col sm={10} md={10} lg={10}>
          {selectedProduct ? (
            // Product details view
            <Modal show={showProductDetails} onHide={closeProductDetails}>
              <Modal.Header closeButton>
                <Modal.Title>{selectedProduct.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Card className="mb-3 card-custom">
                  <Row>
                    <Col md={6}>
                      <Magnifier variant="top" src={selectedProduct.images[0]} alt={selectedProduct.title} className="img-fluid" />
                    </Col>
                    <Col md={6}>
                      <Card.Body>
                        <Card.Title>{selectedProduct.title}</Card.Title>
                        <Card.Text className='font-bold'>Price: ${selectedProduct.price}</Card.Text>
                        <Card.Text>Category: {selectedProduct.category}</Card.Text>
                        <Card.Text>{selectedProduct.description}</Card.Text>

                        {/* Tags */}
                        <Card.Text>
                          Tags:
                          {selectedProduct.meta.tags?.map((tag, index) => (
                            <span key={index} className="badge badge-secondary mr-2">{tag}</span>
                          ))}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                  <Row>
                    {selectedProduct.reviews?.map((review, index) => (
                      <Col md={4} key={index}>
                        <div className="review mb-3">
                          <h6>{review.reviewerName}</h6>
                          <Rating rating={review.rating} />
                          <p>{review.comment}</p>
                          <small>{review.date}</small>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => addToCart(selectedProduct)}>Add to Cart</Button>
                <Button variant="secondary" onClick={closeProductDetails}>Close</Button>
              </Modal.Footer>
            </Modal>
          ) : (
            // Products list view
            <Row>
              {productData
                ?.filter((product) => selectedCategory ? product.category === selectedCategory : true)
                .map((product) => (
                  <Col key={product.id} sm={6} md={4} lg={3}>
                    <Card className="mb-3 card-custom" onClick={() => openProductDetails(product)}>
                      <Card.Img variant="top" src={product.images[0]} alt={product.title} height={"350px"} />
                      <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text className='font-bold'>Price: ${product.price}</Card.Text>
                        <Card.Text>Category: {product.category}</Card.Text>
                        <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
