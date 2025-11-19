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
**POST** `/company`
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
  "status": 200,
  "company": {
    "id": "uuid",
    "name": "My Company",
    "email": "company@example.com",
    "valid": true
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Reset Password
**POST** `/company/reset-password`

**Authentication Required:** Yes (Bearer token)

```json
{
  "oldPassword": "currentpassword123",
  "newPassword": "newpassword456"
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Senha atualizada com sucesso!"
}
```

**Error Responses:**
- `404` - Company not found
- `401` - Current password is invalid

### Update Company Data
**PUT** `/company/update`

**Authentication Required:** Yes (Bearer token)

```json
{
  "name": "Updated Company Name",
  "email": "newemail@example.com",
  "logoUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..."
}
```

**Fields:**
- `name`: **Optional** - New company name
- `email`: **Optional** - New company email (must be unique)
- `logoUrl`: **Optional** - Logo image as Base64 string, file path, or URL

**Response:**
```json
{
  "status": 200,
  "company": {
    "id": "uuid",
    "name": "Updated Company Name",
    "email": "newemail@example.com",
    "logoUrl": "data:image/png;base64,...",
    "valid": true
  }
}
```

**Error Responses:**
- `404` - Company not found
- `422` - Email already registered

---

## Logo Image Storage

**Recommended Approach - Base64 Encoding:**

Convert your image to Base64 and send it in the request:

```json
{
  "logoUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..."
}
```

**Browser Example:**
```javascript
// Convert image file to Base64
const file = document.querySelector('input[type="file"]').files[0];
const reader = new FileReader();

reader.onload = function(event) {
  const base64String = event.target.result;
  // Send base64String as logoUrl in the API request
};

reader.readAsDataURL(file);
```

**Alternative Approaches:**
1. **File Path**: Store image path if saving to file system: `/uploads/company-logos/uuid.png`
2. **External URL**: Use image hosting service and store the URL directly
3. **Database Blob**: Store binary image data in a BLOB field (requires schema change)

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
  "code": "SKU-001",
  "value": 100.50,
  "originalValue": 80.00,
  "description": "Product description",
  "quantity": 50,
  "imgUrl": "https://example.com/image.jpg"
}
```

**Request Fields:**
- `title`: **Required** - Product name
- `code`: **Optional** - Product code/SKU
- `value`: **Required** - Current product price
- `originalValue`: **Required** - Original/cost price
- `description`: **Required** - Product description
- `quantity`: **Required** - Stock quantity
- `imgUrl`: **Optional** - Product image URL

### Update Product
**PATCH** `/products/update/:id`
```json
{
  "title": "Updated Name",
  "code": "SKU-002",
  "value": 120.00,
  "originalValue": 90.00,
  "quantity": 45
}
```

**Note:** All fields are optional. Only send fields you want to update.

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
  "clientId": "uuid",
  "discount": 50,
  "observation": "Optional notes about the sale",
  "products": [
    {
      "id": "uuid",
      "quantity": 2
    }
  ]
}
```

**Request Fields:**
- `clientId`: **Required** - UUID of the client
- `products`: **Required** - Array of products with `id` and `quantity`
- `discount`: **Optional** - Numeric discount value (default: 0)
- `observation`: **Optional** - Text notes about the sale

**Response:**
```json
{
  "status": 200
}
```

### List Sales
**GET** `/sales?skip=0&clientName=João&product=notebook&createdAt=2025-11-18`

**Query Params:**
- `skip`: Pagination offset (default: 0)
- `clientName`: Filter by client name - partial, case-insensitive match (optional)
- `product`: Filter by product name - partial, case-insensitive match (optional)
- `createdAt`: Filter by date (format: YYYY-MM-DD) - returns sales from that entire day (optional)

**Response:**
```json
{
  "status": 200,
  "sales": [
    {
      "id": "uuid",
      "clientId": "uuid",
      "company_id": "uuid",
      "discount": 50,
      "observation": "Sale notes",
      "createdAt": "2025-11-18T10:30:00Z",
      "subtotal": 500,
      "totalValue": 450,
      "Client": {
        "id": "uuid",
        "name": "Client Name",
        "email": "client@example.com",
        "address": "123 Main St",
        "observations": "client notes"
      },
      "Products": [
        {
          "id": "uuid",
          "product_id": "uuid",
          "sale_id": "uuid",
          "quantity_sold": 2,
          "Product": {
            "id": "uuid",
            "title": "Product Name",
            "value": 250,
            "originalValue": 200,
            "description": "Product description",
            "quantity": 48
          }
        }
      ]
    }
  ],
  "pages": 5
}
```

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
