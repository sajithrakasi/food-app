# Food Order App

A full stack food ordering application built using React, TypeScript, Node.js, and Express.

## Features

- Browse food menu
- Add items to cart
- Update cart quantity
- Remove items from cart
- Checkout with validation
- Place orders
- Real-time order tracking
- Delivery status updates
- Responsive UI
- Toast notifications

---

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Zustand
- React Router DOM
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- TypeScript
- CORS

---

## Folder Structure

client/
server/

---

## Installation

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

---

## Frontend Runs On

```txt
http://localhost:5173
```

## Backend Runs On

```txt
http://localhost:5000
```

---

## API Endpoints

### Get Menu

```http
GET /api/menu
```

### Create Order

```http
POST /api/orders
```

### Track Order

```http
GET /api/orders/:id
```

---

## Order Tracking Flow

- Order Received
- Preparing
- Out for Delivery
- Delivered

---

## Improvements Added

- Empty cart state
- Checkout validation
- Auto tracking updates
- Persistent order tracking
- Responsive design
- Professional UI enhancements

---

## Author

Sajithra