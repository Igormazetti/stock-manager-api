# API Routes Documentation

Base URL: `http://localhost:6060`

## Authentication

All routes (except company registration and login) require authentication via Bearer token in the header:
```
Authorization: Bearer <token>
```

---

## Company Routes (`/company`)

### Register Company
**POST** `/company/create`
```json
{
  "name": "My Company",
  "email": "company@example.com",
  "password": "securepassword123"
}
```

### Login
**POST** `/company/login`
```json
{
  "email": "company@example.com",
  "password": "securepassword123"
}
```
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Product Routes (`/products`)

### List Products
**GET** `/products?skip=0&name=Product&order=maior`

**Query Params:**
- `skip`: Pagination offset (default: 0)
- `name`: Filter by product name (optional)
- `order`: Sort by quantity - `maior` (desc), `menor` (asc), `sem` (out of stock)

**Response:**
```json
{
  "status": 200,
  "products": [...],
  "pages": 5
}
```

### Create Product
**POST** `/products/create`
```json
{
  "title": "Product Name",
  "value": 100.50,
  "originalValue": 80.00,
  "description": "Product description",
  "quantity": 50,
  "imgUrl": "https://example.com/image.jpg"
}
```

### Update Product
**PATCH** `/products/update/:id`
```json
{
  "title": "Updated Name",
  "value": 120.00,
  "originalValue": 90.00,
  "quantity": 45
}
```

---

## Client Routes (`/clients`)

### List Clients
**GET** `/clients?skip=0&name=John`

**Query Params:**
- `skip`: Pagination offset (default: 0)
- `name`: Filter by client name (optional)

**Response:**
```json
{
  "status": 200,
  "clients": [...],
  "pages": 3
}
```

### Create Client
**POST** `/clients/create`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "address": "123 Main St, City, State",
  "observations": "VIP client, prefers morning deliveries"
}
```

### Update Client
**PATCH** `/clients/update/:id`
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "address": "456 New Address",
  "observations": "Updated preferences"
}
```

### Delete Client
**DELETE** `/clients/delete/:id`

---

## Sales Routes (`/sales`)

### Create Sale
**POST** `/sales/create`
```json
{
  "client": "Client Name",
  "products": [
    {
      "productId": "uuid",
      "quantity": 2
    }
  ]
}
```

### List Sales
**GET** `/sales?skip=0`

**Query Params:**
- `skip`: Pagination offset (default: 0)

---

## Employee Routes (`/employee`)

### List Employees
**GET** `/employee?skip=0&name=John&active=true`

**Query Params:**
- `skip`: Pagination offset (default: 0)
- `name`: Filter by employee name (optional)
- `active`: Filter by active status (optional)

### Create Employee
**POST** `/employee/create`
```json
{
  "name": "Employee Name",
  "active": true
}
```

### Update Employee
**PATCH** `/employee/update/:id`
```json
{
  "name": "Updated Name",
  "active": false
}
```

### Delete Employee
**DELETE** `/employee/delete/:id`

---

## Error Responses

All endpoints may return error responses in this format:
```json
{
  "status": 404,
  "errorMessage": "Resource not found"
}
```

Common status codes:
- `200`: Success
- `404`: Not found
- `422`: Validation error
- `401`: Unauthorized
- `500`: Server error
