# Bidding Battles
This is a demand driven marketplace built using React for the frontend, flask for the backend, and Firestore for the database. The platform allows buyers to post their requirements with a budget, and sellers can bid to fulfill those requirements.

## Features

### Users
- Users can sign up on the platform.
- Users can invite more users to the platform via CSV file or manual data entry but are limited to inviting a maximum of 25 users per day.
- Each user must verify their email address during the signup process to access the platform's features.

### Item Request & Bid
- Users can post their requirements as an item with the following information:
    - Name
    - Description
    - Date and time (in increments of 1 hour) for  closure (must be between 48 and 730 hours)
    - Item status (pre-owned/new/refurbished)
    - Age (not older than x months)
    - Number of items
    - Maximum price
- Users can bid for an item by providing product details (maximum of 6 photos and other details).
- Once the bidding session closes, an eligible bidder/seller with the minimum sell price will be selected as the bid winner.

### Live Bidding Session
- The buyer can see how many bids are being placed in real-time when the bidding session starts and can view the details of those bids.
- Bidders can place a bid or modify their existing bids and see the lowest bid amount currently present.
- Once the bidding session closes, and the winner will be decided. The contact details of the winning bidder will be available to the buyer.

## Installation and Setup Instructions

- Clone down this repository using `git clone REPOSITORY-LINK`
- You will need `node v18.15.0+` and `npm v9.5.0+` installed globally on your machine. Click [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to see now to install node and npm.

### Installation:
1. cd to the project folder
2. `nvm use` 
3. `npm install`
4. set environment variables using env template

### To Start Server:
`npm start`

# Project Architecture
![Project-Architecture](https://github.com/shubhamgoel24/Bidding-Battles-FE/assets/67507184/0aa8f3d3-81f8-4a33-9f90-7c205ea3831b)
