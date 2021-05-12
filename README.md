# Graphi API
V 1.0

- [Graphi API](#graphdb-api)
	- [Endpoints](#endpoints)
	- [Functionality Endpoints](#functionality-endpoints)
	- [Default Request Model](#default-request-model)
	- [Default Response Model](#default-response-model)
	- [Requesting With Pagination](#requesting-with-pagination)
	- [User](#user)
		- [Login](#login)
		- [Register](#register)



## Endpoints
- [/user](#User) (listable, editable, removable)

## Default Request Model
The request data below is bare minimum request format,

```js
{
	data:{
        id:"contentID", /* For singular data requests */
		stringParameter:"value",
	}
}
``` 


## Default Response Model
The response data below is bare minimum response format,

```js
{
	success: true
	data:{ }
}
``` 

## Requesting With Pagination 
Listable contents can be paginated, otherwise will fall to default item count.
Only required parameter is **page** but page size can be defined with **limit** parameter.
```js
{
	method:"endpoint-method",
	data:{
		...
	},
	pagination:{
		page:n, /*numeric or false*/
		limit:n /*limit*/
	}
}
```
[Go Back](#graphdb-api)


## User
**/user**  Used for authentication


### Login User
Sample Request
```js
{
	method: "login",
	data: {
		email: "test@graphi.com",
		password: "aa"
	}
}
```
Sample Response 
```js
{
  "success": true,
  "message": "Auth Succesful welcome ismet okatar",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjAsImVtYWlsIjoidGVzdDFAZ3JhcGhpLmNvbSIsInBhc3N3b3JkIjoiYWEiLCJpYXQiOjE2MjA3ODM0OTB9.1kfspjCT5wy5aiPIz_ieMc6Z-D_5HrxhBylvvNgH29s",
    "user": {
      "fullName": "ismet okatar",
      "username": "oktarismet",
      "email": "test1@graphi.com",
      "password": "$2a$10$onTPDCUoN1rlV/jjVrdKlu65Zn7nkpSxWv5C0iKWM10McXxupd1k6",
      "_id": 0,
      "relations": []
    }
  }
}
```
### Register User
Sample Request
```js
{
	"method": "register",
	"data": {
		"fullName": "ismet okatar",
		"username": "oktarismet",
		"email": "test1@graphi.com",
		"password": "aa"
	}
}
```
Sample Response 
```js
{
  "success": true,
  "data": {}
}
```
[Go Back](#graphdb-api)

## Post
**/post**  Used for post operations


### Create Post
Sample Request
```js
{
	"method": "create",
	"data": {
		"userId": 0,
		"content": "Good Morning from Central Park"
	}
}
```
Sample Response 
```js
{
{
  "success": true,
  "data": {
    "users": [
      {
        "fullName": "ismet okatar",
        "username": "oktarismet",
        "email": "test1@graphi.com",
        "password": "$2a$10$JLE3wSgQTuWDJR8cgvTf6.ELsYbcJfYe5dAgh0Ru77bAQ2lpL4gdG",
        "_id": 0,
        "relations": [ ]
      }
    ]
  }
}
```
### Update Post
Sample Request
```js
{
	"method": "update",
	"data": {
		"postId": 0,
		"content": "Good Night from 50th Avenue"
	}
}
```
Sample Response 
```js
{
	"method": "update",
	"data": {
		"postId": 0,
		"content": "Good Night from 50th Avenue"
	}
}
```
### Get Post by Id
Sample Request
```js
{
	"method": "getById",
	"data": {
		"postId": 0
	}
}
```
Sample Response 
```js
{
  "success": true,
  "data": {
    "content": "Good Night from 50th Avenue",
    "_id": 0,
    "relations": []
  }
}
```
### Get Post by Filtering
Sample Request
```js
{
	"method": "getFiltered",
	"data": {
		"content": "G"
	}
}
```
Sample Response 
```js
{
  "success": true,
  "data": [
    {
      "content": "Good Night from 50th Avenue",
      "_id": 0,
      "relations": []
    },
    {
      "content": "Good Nigth from Central Park",
      "_id": 1,
      "relations": []
    }
  ]
}
```
### Delete Post by Id
Sample Request
```js
{
	"method": "getById",
	"data": {
		"postId": 0
	}
}
```
Sample Response 
```js
{
  "success": true,
  "data": {
    "id": "2"
  }
}
```
