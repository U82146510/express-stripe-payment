import { type Request,type Response,type NextFunction } from "express";
import Stripe from "stripe";
import dotenv from 'dotenv';



dotenv.config();

const stripe_api = process.env.stripe;
if(!stripe_api){
    console.error('missing stripe api');
    process.exit(1);
}

const hook = process.env.hook;
if(!hook){
    console.error('webook missing key');
    process.exit(1);
}

const stripe = new Stripe(stripe_api)

export const webhook = (req:Request,res:Response,next:NextFunction)=>{
    const sig = req.headers['stripe-signature'];
    let event:Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(req.body,sig!,hook);
    } catch (error:any) {
        console.error('webhook signature verification failed');
        res.status(400).json({message:'webhook error'});
        return;
    }
    

    try {
        if(event.type==='checkout.session.completed'){
            const session = event.data.object as Stripe.Checkout.Session;
            
            console.log("customer email",session.customer_email);
            console.log('Amount:',session.amount_total);
            res.status(200).send('Received')
        }
    } catch (error) {
        next(error)
    }
}