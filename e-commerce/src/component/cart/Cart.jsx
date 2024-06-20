import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';

import easyinvoice, { generateInvoice } from 'easyinvoice';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CartContext } from './CartContext';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const { cartCount, setCartCount } = useContext(CartContext);
    
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCartItems = storedCartItems.map(item => ({
            ...item,
            quantity: item.quantity || 1
        }));
        setCartItems(updatedCartItems); 
    }, []);
    
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCartCount(cartItems.length);
      }, [localStorage.getItem('cart')]);

    const increaseQuantity = (index) => {
        const newCart = [...cartItems];
        newCart[index].quantity += 1;
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const decreaseQuantity = (index) => {
        const newCart = [...cartItems];
        if (newCart[index].quantity > 1) {
            newCart[index].quantity -= 1;
            setCartItems(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    };

    const deleteItem = (index) => {
        const newCart = [...cartItems];
        newCart.splice(index, 1);
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };
    const calculateTotalPrice = (product) => {
        return product.price * product.quantity;
    };
    const calculateTotalCost = () => {
        return cartItems.reduce((total, product) => total + calculateTotalPrice(product), 0);
    };
    useEffect(() => {
       
        const calculateTotalCost = () => {
            let total = 0;
            cartItems.forEach(item => {
                total += item.price * item.quantity;
            });
            return total;
        };
        setTotalCost(calculateTotalCost());
    }, [cartItems]);

    const handlePayment = async () => {
        const lineItems = cartItems.map((item) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.title,
                    metadata: {
                        description: item.description,
                        images: [item.images],
                    },
                    price: item.price,
                },
                unit_amount: item.price * 100, // convert to cents
            },
            quantity: item.quantity,
        }));

        const response = await fetch('http://localhost:3001/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lineItems }),
        });


        const responseData = await response.json();
        const sessionId = responseData.session;
        console.log('responseData ID:', responseData);

        console.log('Session ID:', sessionId);
        const stripe = await loadStripe('pk_test_51PQ5q0EoySXEK9Do84HFvP6uqrQGqipzc14FC1rYtucSN0172pFZR1TFVeBf3TqP2ivyWvlQ4OJGUcar8SudT55g00L6n7447C');

        localStorage.removeItem('cart');
        const result = await stripe.redirectToCheckout({
            sessionId: sessionId,
        });
       console.log("result-------------------------------------------------",result)
        if (result.success) { 
            setCartItems([]);
          }
    };


    const generateInvoice = async () => {
        try {
            const doc = new jsPDF();

         
            doc.setProperties({
                title: 'Bill',
                subject: 'Invoice Subject',
                author: 'Amzon Inc',
                keywords: 'invoice, payment',
            });
 

            doc.setFontSize(22);
            doc.text('Invoice', 105, 20, { align: 'center' });

           
            doc.setFontSize(12);
            doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 30);

          
            doc.text('Customer:', 10, 40);
            doc.text('Cloudus Infotech', 20, 50);
            doc.text('Address: utran,surat', 20, 60);

          
            doc.autoTable({
                startY: 70,
                head: [['Product', 'Quantity', 'Price', 'Total']],
                body: cartItems.map(item => [item.title, item.quantity, item.price, item.quantity * item.price]),
                theme: 'grid',
                styles: {
                    cellPadding: 2,
                    fontSize: 10,
                    fontStyle: 'normal',
                    textColor: [0, 0, 0],
                    overflow: 'linebreak',
                    columnWidth: 'auto'
                },
                columnStyles: {
                    0: { cellWidth: 60 },
                    1: { cellWidth: 20 },
                    2: { cellWidth: 30 },
                    3: { cellWidth: 30 },
                },
                headStyles: { fillColor: [0, 51, 102] },
            });

         
            const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
            doc.text(`Total: ${total.toFixed(2)}`, 10, doc.autoTable.previous.finalY + 10);

           
            doc.save('invoice.pdf');
            localStorage.removeItem('cart'); 
            setCartItems([]);
        } catch (error) {
            console.error("Error generating invoice:", error);
            alert("There was an error generating the invoice. Please try again.");
        }
    };



    // const cartItems = [
    //     { title: 'Product 1', quantity: 2, price: 1500 },
    //     { title: 'Product 2', quantity: 1, price: 3000 },
    // ];


    // const generateInvoice = () => {
    //     const data = {
    //       documentTitle: 'Invoice', // Title of the invoice
    //       currency: 'INR', // Currency of the invoice
    //       taxNotation: 'gst', // Tax notation (gst, vat, pst, etc.)
    //       marginTop: 25, // Margin from the top of the page
    //       marginLeft: 25, // Margin from the left of the page
    //       marginRight: 25, // Margin from the right of the page
    //       logo: 'https://example.com/logo.png', // URL of your company logo
    //       sender: {
    //         company: 'RKcompany',
    //         address: '2210-sgfdhsdv-avsdasdvg,7979',
    //         zip: '123456',
    //         city: 'surat',
    //         country: 'india',
    //         email: 'rk@yourcompany.com',
    //         phone: '+1234567890',
    //       },
    //       client: {
    //         company: 'Client Company Name',
    //         address: 'Client Company Address',
    //         zip: '654321',
    //         city: 'Client City',
    //         country: 'Client Country',
    //         email: 'client@example.com',
    //         phone: '+9876543210',
    //       },
    //       invoiceNumber: '123456', // Invoice number
    //       invoiceDate: new Date().toISOString(), // Invoice date
    //       products: cartItems.map(product => ({
    //         quantity: product.quantity,
    //         description: product.title,
    //         tax: 18, // Tax percentage
    //         price: product.price,
    //       })),
    //       bottomNotice: 'Thank you for your business.', // Message at the bottom of the invoice
    //     };

    //     easyinvoice.createInvoice(data, (result) => {
    //       // The invoice is created successfully
    //       console.log(result);
    //       // Generate PDF blob
    //       const pdfBlob = new Blob([result.pdf], { type: 'application/pdf' });
    //       // Create a URL for the PDF blob
    //       const pdfUrl = URL.createObjectURL(pdfBlob);
    //       // Open the PDF in a new tab
    //       window.open(pdfUrl);
    //     });
    //   };

    // const handlePayment = async () => {
    //     const stripe = await stripePromise;
    //     const lineItems = cartItems.map(item => ({
    //         price_data: {
    //             currency: 'inr',
    //             product: item.id, 
    //             unit_amount:item.price , 
    //         },
    //         quantity: item.quantity,
    //     }));

    //     const response = await fetch('http://localhost:3001/create-checkout-session', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(lineItems), // Send formatted line items to server
    //     });

    //     const session = await response.json();
    //     const result = await stripe.redirectToCheckout({
    //         sessionId: session.id,
    //     });

    //     if (result.error) {
    //         // Handle errors
    //         console.error(result.error);
    //     }
    // };


    return (
        <div>
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>-Product-</th>
                            <th>title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>list</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((product, index) => (
                            <tr key={product.id}>
                                <td>
                                    <Card.Img
                                        style={{ width: '6rem' ,height: '6rem'}}
                                        src={product.images[0]}
                                        alt={product.name}
                                    />
                                    <div></div>
                                </td>
                                <td>{product.title}</td>
                                <td>{product.price.toFixed(2)}</td>
                                <td>{product.quantity}</td>
                                <td>{calculateTotalPrice(product).toFixed(2)}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => increaseQuantity(index)}
                                    >
                                        +1
                                    </Button>{' '}
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => decreaseQuantity(index)}
                                    >
                                        -1
                                    </Button>

                                </td>
                                <td>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => deleteItem(index)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            <hr />
            <h4>Total Cost: {calculateTotalCost().toFixed(2)}</h4>
            <Button onClick={() => handlePayment()}>Proceed to Payment</Button>
            <Button onClick={generateInvoice}>Generate Invoice</Button>
            {/* <Button onClick={handlePayment}>Generate Invoice & Pay</Button> */}
            </div>
            )}

        </div>
    )
}

export default Cart
