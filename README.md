![Screenshot_2024-03-22_190403-removebg-preview](https://github.com/yogarn/schofinity/assets/144443155/7c0fd7e6-1277-4565-9885-a1be6149dd71)
# Schofinity
> Schofinity is a platform that provides scholarship information and assists users in preparing to apply for scholarships through various programs such as Bootcamp, Workshops, and Mentoring.
## Features
The Schofinity platform provides many API products, tools, and resources that enable you to:
- Get comprehensive scholarship information
- Adding scholarships to favorites
- Offering scholarships Timeline + Reminder features
- Displaying scholarships based on categories
- Filtering scholarships to be displayed when searched
- Assisting in preparing for scholarships (Bootcamp, Workshops, Mentoring)
## Getting Started / Prerequisites
To start using our API you can either simply use existing deployed API in the url provided below or following installation steps.

API Base URL: `https://schofinity-c284f28bf9dd.herokuapp.com/v1/`.
Please follow our documentation provided at the end of this document for further information about how to user our API. If you wish to use this API on your own server, you can follow instruction step provided below.

Before you continue to installation step, there is a few things you may need to configure first. This API requires you to configure:
1. MySQL Database
2. [Supabase Storage](https://supabase.com/)
3. [Gmail SMTP](https://nodemailer.com/usage/using-gmail/)
4. [Midtrans](https://docs.midtrans.com/)
## Installation
### Clone Repository and Install Required Packages
```
git clone https://github.com/yogarn/schofinity.git
cd schofinity
npm i
```
### Configure .env file
After configuring supabase, Gmail smtp, and midtrans, you need to create `.env` file. You can also just rename existing `.env.example` in root folder to `.env`. Then, you need to fill all the empty field in that example file. If you left one of the field empty when it not supposed to, the server may crash immediately. 
### Migration
Make sure you already have sequelize-cli installed in your machine. You can install it by `npm i sequelize-cli`. You also need to create a database and configure it in your `.env` file, otherwise, the migration step below won't work at all.
```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
### Start Server
After completing all the required step above, you can run the server by following instruction below.
```
npm start
```
If you want to start your API under development mode, you can start it using nodemon by executing the following command.
```
npm run dev
```
## API Documentation
For further information about our API and its features, you can visit this [postman documentation](https://documenter.getpostman.com/view/32730747/2sA35A8RHC).
