# Fugitive Hunter Game

A full-stack application where three cops try to capture a fugitive hiding in one of five cities. Each cop must select a unique city to investigate and a vehicle with sufficient range to make the round trip.

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Assumptions Made](#assumptions-made)

## Live Demo

The application is deployed on Netlify: [https://fugitive-hunter-game.netlify.app](https://fugitive-hunter-game.netlify.app)

Backend API is deployed on Render: [https://fugitive-hunter-game.onrender.com](https://fugitive-hunter-game.onrender.com)

## Features

- **Landing Page**: Start the game and view mission details
- **City Selection**: Each cop selects a unique city to investigate
- **Vehicle Selection**: Each cop selects a vehicle based on the required round-trip distance
- **Results Page**: Shows if the fugitive was captured and which cop was successful
- **In-Memory Data**: No database required, all data is stored in memory
- **Responsive Design**: Works on all device sizes

## Technologies Used

### Frontend

- React
- React Router
- Axios for API calls
- CSS for styling (no frameworks)

### Backend

- Node.js
- Express
- In-memory data structures

## Project Structure

```
yocket-assignment/
├── client/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── CityDetailCard/
│ │ │ ├── VehicleDetailCard/
│ │ ├── context/
│ │ ├── hooks/
│ │ ├── pages/
│ │ │ ├── CitySelection/
│ │ │ ├── LandingPage/
│ │ │ ├── ResultsPage/
│ │ │ ├── VehicleSelection/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── utils/
│ │ ├── App.js
│ │ ├── App.css
│ ├── package.json
│ └── .env
├── server/
│ ├── controllers/
│ ├── routes/
│ ├── utils/
│ ├── server.js
│ ├── package.json
│ ├── package-lock.json
│ └── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Clone the repository

```bash
git clone https://github.com/r1tikpatil/yocket-assignment
cd yocket-assignment/server
```

2. Install dependencies

```bash
npm install
```

3. Start the server

```bash
npm start
```

The server will start on http://localhost:8000

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder

```bash
cd ../client
```

2. Install dependencies

```bash
npm install
```

3. Create a .env file with the following content:

```
REACT_APP_API_URL=http://localhost:8000/api
```

4. Start the application

```bash
npm start
```

The application will open in your browser at http://localhost:3000

## Deployment Instructions

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the root directory: `server`
4. Set the start command: `node server.js`

### Frontend Deployment (Netlify)

1. Create a new site on Netlify
2. Connect your GitHub repository
3. Set the root directory: `client`
4. Set the build command: `npm run build`
5. Set the publish directory: `client/build`
6. Set environment variable: `REACT_APP_API_URL=https://fugitive-hunter-game.onrender.com/api`

## Assumptions Made

1. **Game Flow**: The game follows a sequential flow where each cop makes their city and vehicle selection in turn. The result is displayed after all three cops have made their selections or as soon as one cop finds the fugitive.

2. **Vehicle Availability**: Vehicles are shared resources. Once a cop selects a vehicle, its availability decreases. If there are no available vehicles of a certain type, other cops cannot select that vehicle.

3. **Round Trip Requirement**: Vehicles must have enough range to travel to the city and back (round trip). The distance to the city is multiplied by 2 to calculate the total trip distance.

4. **No Persistence**: Game state is stored in memory and resets when the server restarts.

5. **No Authentication**: No user accounts or authentication is implemented as per requirements.
