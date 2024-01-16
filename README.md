## Tech Stack 💻

- node
- express
- mongodb
- mongoose
- JWT

## How to run locally ?

1.  clone
    ```
     git clone https://github.com/akshay-puranik/Library_backend.git
    ```
2.  Install node_modules
    ```
     npm i
    ```
3.  start it
    ```
    npm run dev
    ```

## Routes

# User

Sign Up:
```
curl --location 'http://localhost:8090/v1/library/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"new user",
    "email":"user@gmail.com",
    "password":"newpassword"
}'
```

Sign In:
```
curl --location 'http://localhost:8090/v1/library/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"user@gmail.com",
    "password":"newpassword"
}'
```

# Admin

Add Book:
```
curl --location 'http://localhost:8090/v1/library/book' \
--header 'access-token:<ACCESS TOKEN HERE>' \
--header 'Content-Type: application/json' \
--data '{
    "title": "New Book",
    "author": "Checking JSON",
    "genre": "Fiction",
    "publishedOn": 1504185600,
    "availableCopies": 20,
    "totalCopies": 25
}'
```

Update Book Details:
```
curl --location --request PUT 'http://localhost:8090/v1/library/65a4bc72fc98f7aacc98b49f' \
--header 'access-token:<ACCESS TOKEN HERE>' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Updated Book",
    "author": "Checking Update",
    "genre": "Non Fiction"
}'
```

# Protected User Routes

Book List
```
curl --location 'http://localhost:8090/v1/library/books?page=0&size=4' \
--header 'access-token:<ACCESS TOKEN HERE>'
```

Book Details
```
curl --location 'http://localhost:8090/v1/library/books/<BOOK ID HERE>' \
--header 'access-token:<ACCESS TOKEN HERE>'
```

Checkout Book
```
curl --location 'http://localhost:8090/v1/library/checkout/<BOOK ID HERE>' \
--header 'access-token:<ACCESS TOKEN HERE>' \
--header 'Content-Type: application/json' \
--data '{
    "returnDate":1707952394
}
'
```

Return Book
```
curl --location --request POST 'http://localhost:8090/v1/library/return-book/<BOOK ID HERE>' \
--header 'access-token:<ACCESS TOKEN HERE>' \
--data ''
```
