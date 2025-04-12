import {type Request,type Response,type NextFunction} from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe_secret = process.env.stripe;
if(!stripe_secret){
    throw new Error('missing stripe secret');
}

const stripe = new Stripe(stripe_secret);

export const payment = async (req:Request,res:Response,next:NextFunction)=>{
    const {amount,email} = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            line_items:[{
                price_data:{
                    currency:'usd',
                    product_data:{name:'Top-up Balance'},
                    unit_amount:amount,
                },
                quantity:1,
            },
        ],
            customer_email:email,
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });
        res.json({url:session.url});
    } catch (error) {
        next(error)
    }
};


