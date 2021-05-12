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
```js
{
	method: "login",
	data: {
		email: "test@graphi.com",
		password: "aa"
	}
}
```
[Go Back](#graphdb-api)

