# ServiceNow REST API
[![MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

Node.JS wrapper library for ServiceNow REST API.

### Installing

Run `npm install servicenow-rest-api` to install the package.

## Supported REST API calls

In this package, wrappers are available for below REST interfaces.

| API       | GET                                | POST                     | PUT                               | DELETE                            |
|-----------|------------------------------------|--------------------------|-----------------------------------|-----------------------------------|
| Table API | /now/v2/table/{tableName}          | now/v2/table/{tableName} | now/v2/table/{tableName}/{sys_id} | now/v2/table/{tableName}/{sys_id} |
|           | /now/v2/table/{tableName}/{sys_id} |                          |                                   |                                   |


## Usage

### Initializing ServiceNow Package

1. Install package by running 

   `npm install servicenow-rest-api`

2. Get the package in your module.

   `const sn=require('servicenow-rest-api');`

3. Create a ServiceNow object. ServiceNow object takes three parameters.
  * ServiceNow instance
  * UserID
  * Password
  
   `const ServiceNow=new sn('devserver','admin','_password');`  

4. Call Authenticate Method.

   `ServiceNow.Authenticate();`
   
Code Snippet for initializing.

```
const sn=require('servicenow-rest-api');

const ServiceNow=new sn('devserver','admin','_password');

ServiceNow.Authenticate();

```

## Functions

### ServiceNow.Authenticate

| Parameters                   |
|------------------------------|
| Callback function (optional) |

#### Request

```
ServiceNow.Authenticate(res=>{
    console.log(res.status);
});
```
#### Response

res.status

```
200
```

For complete response use res.raw

```
{ status: 200,
  statusText: 'OK',
  headers:
   { 'set-cookie':
      [_cookieinfo],
     'x-is-logged-in': 'true',
     'x-total-count': '1',
     pragma: 'no-store,no-cache',
     'cache-control': 'no-cache,no-store,must-revalidate,max-age=-1',
     expires: '0',
     'content-type': 'application/json;charset=UTF-8',
     'transfer-encoding': 'chunked',
     .
     .
     .
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
