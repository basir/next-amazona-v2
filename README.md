# Build Full-ECommerce By Next.js 13+, App Router, Server Components and Actions

|                |                                                        |
| -------------- | ------------------------------------------------------ |
| Tech           | Nextjs 13+, Server Components & Actions, Route Handler |
| UI             | Tailwind, DaisyUI, Chart.js                            |
| Database       | MongoDB, Mongoose                                      |
| Payment        | PayPal, Stripe                                         |
| Deployment     | Github, Vercel, MongoDB Atlas                          |
| Authentication | Auth.js, Google Auth                                   |
| Others         | Cloudinary, Zustand, SWR                               |

![next amazona v2](/public/app.jpg)

## Resources

- Youtube Video : https://youtu.be/---
- Demo Website :  https://next-amazona-v2.vercel.app/
- Source Code   :  https://github.com/basir/next-amazona-v2
- Full Course: [basir.thinkific.com](https://basir.thinkific.com/courses/build-ecommerce-website-like-amazon-by-next-js?coupon=SAVE90)

## What you will learn

- NextJS basics like setting up project, creating pages and data fetching
- NextJS advanced topics like app router, server component & actions, image optimization,
- Tailwind CSS and DaisyUI framework to build responsive website using custom theme, animation and carousel
- ReactJS including decomposing components, state management with Zustand and data fetching using swr
- Auth.js package to authenticate customers and admin users
- MongoDB and Mongoose to save and retrieve data like products, orders and users
- PayPal developer api to make online payment
- Deploy web applications on servers like Vercel and Netlify

## Full Course

Get this course by 90% discount on Thinkific:
https://basir.thinkific.com/courses/build-ecommerce-website-like-amazon-by-next-js?coupon=SAVE90

## Run Locally

1. Clone repo

   ```shell
    $ git clone git@github.com:basir/next-amazona-v2.git
    $ cd next-amazona-v2
   ```

2. Create .env File

   - duplicate .env.example and rename it to .env

3. Setup MongoDB

   - Local MongoDB
     - Install it from [here](https://www.mongodb.com/try/download/community)
     - In .env file update MONGODB_URI=mongodb://localhost/amazona
   - OR Atlas Cloud MongoDB
     - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
     - In .env file update MONGODB_URI=mongodb+srv://your-db-connection

4. Install and Run

   ```shell
     npm install
     npm run dev
   ```

5. Seed Data

   - Run this on browser: http://localhost:3000/api/seed
   - It returns admin email and password and 6 sample products

6. Admin Login

   - Run http://localhost:3000/signin
   - Enter admin email "admin@example.com" and password "123456" and click Signin

## Promo

Welcome to version 2 of next.js amazona. it is coding course to build a full functional ecommerce website like amazon using next.js lastest features like App router, sever components and actions and route handler.

## Lessons

1. Introduction
2. Install Tools
3. Create Next App
4. Publish to Github
5. List Products
   1. create product type
   2. add data.ts
   3. add images
   4. render products
6. Create Product Details
   1. create product page
   2. create 3 columns
   3. show image in first column
   4. show product info in second column
   5. show add to cart action on third column
   6. add styles
