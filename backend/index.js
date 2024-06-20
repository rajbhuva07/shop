require('./confing/db.js');
const express = require('express');
const stripe = require('stripe')('sk_test_51PQ5q0EoySXEK9DoJqPvZzIDdv2N25kQbUMKQdaseu2xhYoNzY7vYMJQWFxbVI77sBocfE905nqe2srk8sXd2fzs009irO2pUb');
const app = express();
const dotenv = require("dotenv").config()
const cors = require('cors');
const user = require('./modal/userSchema.js');
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(cors());
app.post('/signup', async (req, res) => {
    try {
      let finduser = await user.findOne({ email: req.body.email });
      if (finduser) {
        return res.status(400).json({ status: false,data:[], message: "User already exists" });
      }
      const userdata = await user.create(req.body);
      return res.status(201).json({ status: true,data:userdata, message: "Signed up successfully" });
    } catch (error) {
      return res.status(500).json({ status: false,data:[], message: "Internal Server Error" });
    }
  });
  app.post('/login', async (req, res) => {
    try {
      const finduser = await user.findOne({ email: req.body.email });
  
      if (!finduser) {
        return res.status(404).json({ status: false, message: "User not found" });
      }
  
      if (req.body.password!== finduser.password) {
        return res.status(401).json({ status: false, message: "Incorrect email and password" });
      }
      const token = jwt.sign({ email: finduser.email}, 'your-secret-key', { expiresIn: '1h' });
      return res.status(200).json({ status: true, data: finduser,token:token, message: "Login successful" });
    } catch (error) {
      return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  });
app.post('/create-checkout-session', async (req, res) => {
    try {
        if (!req.body.lineItems || !Array.isArray(req.body.lineItems)) {
            return res.status(400).json({ error: 'lineItems must be provided as an array' });
        }

        const lineItems = req.body.lineItems.map((item) => (

            {

                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.price_data.product_data.name,
                        metadata: {
                            description: item.price_data.product_data.metadata.description,
                            //   images: [item.price_data.product_data.metadata.images],
                        },
                    },
                    unit_amount: item.price_data.product_data.price * 100, // convert to cents
                },
                quantity: item.quantity,
            }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_address_collection: {
                allowed_countries: ['IN'],
            },
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:3000/success`,
            cancel_url: `http://localhost:3000/cancel`,
            payment_intent_data: {
                receipt_email: 'test@example.com',
                statement_descriptor: 'Chase West',
                statement_descriptor_suffix: 'https://www.amazon.in',
            },
        });

        res.status(200).json({ session: session.id });
    
    } catch (err) {
        console.error(err);
        res.status(err.statusCode || 500).json(err.message);
    }
});
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
