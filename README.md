# ServiceNow REST API
[![MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

Node.JS wrapper library for ServiceNow REST API.

[![NPM](https://nodei.co/npm/servicenow-rest-api.png)](https://npmjs.org/package/servicenow-rest-api)

## Table of Contents

- [Installing](#installing)
- [Basic Usage](#basic-usage)
    + [Request](#request)
    + [Response](#response)
- [Supported REST API calls](#supported-rest-api-calls)
- [Functions](#functions)
  * [1. ServiceNow.Authenticate](#1-servicenowauthenticate)
    + [Request](#request-1)
    + [Response](#response-1)
  * [2. ServiceNow.getSampleData](#2-servicenowgetsampledata)
    + [Request](#request-2)
    + [Response](#response-2)
  * [3. ServiceNow.getTableData](#3-servicenowgettabledata)
    + [Request](#request-3)
    + [Response](#response-3)
  * [4. ServiceNow.getSysId](#4-servicenowgetsysid)
    + [Request](#request-4)
    + [Response](#response-4)
  * [5. ServiceNow.createNewTask](#5-servicenowcreatenewtask)
    + [Request](#request-5)
    + [Response](#response-5)
  * [6. ServiceNow.UpdateTask](#6-servicenowupdatetask)
    + [Request](#request-6)
    + [Response](#response-6)
  * [7. ServiceNow.DeleteTask](#7-servicenowdeletetask)
    + [Request](#request-7)
    + [Response](#response-7)
- [Examples](#examples)
  * [1. Get critical incidents which are open for last 6 months.](#1-get-critical-incidents-which-are-open-for-last-6-months)
    + [Request](#request-8)
    + [Response](#response-8)
  * [2. Create an Emergency change to reboot server](#2-create-an-emergency-change-to-reboot-server)
    + [Request](#request-9)
    + [Response](#response-9)
  * [3. Elevate priority of ticket](#3-elevate-priority-of-ticket)
    + [Request](#request-10)
    + [Response](#response-10)
- [License](#license)


## Installing

Run `npm install servicenow-rest-api` to install the package.

## Basic Usage

#### Request

1. Get reference to servicenow package.
2. Initialize servicenow object.
3. Call authenticate function.
4. You can now access Servicenow data by calling functions.

```
const sn=require('servicenow-rest-api');

const ServiceNow=new sn('_INSTANCE','_USERID','_PASSWORD');

ServiceNow.Authenticate();

ServiceNow.getSampleData('change_request',(res)=>{    // 
    console.log(res);
});
```

#### Response

```
[ { parent: '',
    reason: '',
    made_sla: 'false',
    backout_plan: 'Current prod environment to be snapshotted with VmWare\n            prior to change.\n        ',
    watch_list: '',
    upon_reject: '',
    sys_updated_on: '2017-08-10 12:42:23',
    type: 'normal',
    conflict_status: '',
    approval_history: '',
    number: 'CHG0000001',
    test_plan: 'Multi-User testing on Sunday night',
    cab_delegate: '',
    sys_updated_by: 'admin',
    .
    .
    .
```

## Supported REST API calls

In this package, wrappers are available for below REST interfaces.

| API       | GET                                | POST                     | PUT                               | DELETE                            |
|-----------|------------------------------------|--------------------------|-----------------------------------|-----------------------------------|
| Table API | /now/v2/table/{tableName}          | now/v2/table/{tableName} | now/v2/table/{tableName}/{sys_id} | now/v2/table/{tableName}/{sys_id} |
|           | /now/v2/table/{tableName}/{sys_id} |                          |                                   |                                   |

## Functions

### 1. ServiceNow.Authenticate

| Parameters                   |
|------------------------------|
| Callback function            |

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
___

### 2. ServiceNow.getSampleData

This function can be used as a reference to get sample data for tables in ServiceNow. This can be used to check the fields in a table.

| Parameters        | Description                                                    |
|-------------------|----------------------------------------------------------------|
| type              | Table type in ServiceNow (incident,change_request)             |
| Callback function | Response will be available as a parameter to callback function |

#### Request

```
ServiceNow.getSampleData('change_request',(res)=>{
    console.log(res);
});
```

#### Response

```
[ { parent: '',
    made_sla: 'false',
    caused_by: '',
    watch_list: '',
    upon_reject: '',
    sys_updated_on: '2017-08-10 20:16:07',
    child_incidents: '',
    hold_reason: '',
    approval_history: '',
    number: 'INC0000001',
```

___


### 3. ServiceNow.getTableData

Access ServiceNow table data using this function.

| Parameters        | Description                                                                                          |
|-------------------|------------------------------------------------------------------------------------------------------|
| fields            | Fields that you want from ServiceNow table. Pass an empty array if you want to get all the fields    |
| filters           | Filters that has to be applied on ServiceNow table. Pass an empty array if filters are not required. |
| type              | type of table - incident, change_request                                                             |
| callback function | Response will be available as a parameter to this function                                           |                                           |

#### Request

```
const fields=[
    'number',
    'short_description',
    'assignment_group',
    'priority'
];

const filters=[
    'urgency=1'
];

ServiceNow.getTableData(fields,filters,'incident',function(res){
    console.log(res);
});
```

#### Response

```
https://devserver.service-now.com/api/now/v2/table/incident?sysparm_display_value=true&sysparm_fields=number,short_description,assignment_group,p
riority&sysparm_query=urgency=1
[ { number: 'INC0000025',
    short_description: 'Need to add more memory to laptop',
    assignment_group: '',
    priority: '1 - Critical' },
  { number: 'INC0000016',
    short_description: 'Rain is leaking on main DNS Server',
    assignment_group:
     { display_value: 'Hardware',
       link: 'https://dev16219.service-now.com/api/now/v2/table/sys_user_group/8a5055c9c61122780043563ef53438e3' },
    priority: '1 - Critical' },
    .
    .
    .
```

___


### 4. ServiceNow.getSysId

Used as a reference to get sys_id of a record in ServiceNow.

| Parameters        | Description                                                |
|-------------------|------------------------------------------------------------|
| type              | type of table - incident, change_request                   |
| number            | Ticket number in ServiceNow                                |
| callback function | Response will be available as a parameter to this function |

#### Request

```
ServiceNow.getSysId('incident','INC0000016',res=>{
    console.log(res);
});
```

#### Response

```
46e3e949a9fe19810069b824ba2c761a
```

___


### 5. ServiceNow.createNewTask

This is used to create a new task in ServiceNow.

| Parameters        | Description                                                |
|-------------------|------------------------------------------------------------|
| data              | Object that contains data for your record                  |
| type              | type of table - incident, change_request                   |
| callback function | Response will be available as a parameter to this function |

#### Request

```
const data={
    'short_description':'Need urgent attention!!',
    'urgency':'1',
    'priority':'1',
    'assignment_group':'Hardware'
};

ServiceNow.createNewTask(data,'incident',res=>{
    console.log(res);
});
```

#### Response

```
{ parent: '',
  made_sla: 'true',
  caused_by: '',
  watch_list: '',
  upon_reject: 'Cancel all future Tasks',
  sys_updated_on: '2017-10-30 22:24:30',
  child_incidents: '0',
  hold_reason: '',
  approval_history: '',
  number: 'INC0010006',
  resolved_by: '',
  sys_updated_by: 'admin',
  .
  .
  .
```

___


### 6. ServiceNow.UpdateTask

This is used to update existing record in ServiceNow.

| Parameters        | Description                                                |
|-------------------|------------------------------------------------------------|
| type              | type of table - incident, change_request                   |
| number            | Ticket number in ServiceNow                                |
| data              | Object that contains data for your record                  |
| callback function | Response will be available as a parameter to this function |

#### Request

```
const data={
    'work_notes':'Assigning this to different team',
    'assignment_group':'Network'
};

ServiceNow.UpdateTask('incident','INC0010006',data,res=>{
    console.log(res);
});
```

#### Response

```
{ parent: '',
  made_sla: 'true',
  caused_by: '',
  watch_list: '',
  upon_reject: 'Cancel all future Tasks',
  sys_updated_on: '2017-10-30 22:31:49',
  child_incidents: '0',
  hold_reason: '',
  approval_history: '',
  number: 'INC0010006',
  .
  .
  .
  work_notes: '2017-10-30 22:31:49 - System Administrator (Work notes)\nAssigning this to different team\n\n',
  short_description: 'Need urgent attention!!',
  close_code: null,
  correlation_display: '',
  delivery_task: '',
  work_start: '',
  assignment_group:
   { display_value: 'Network',
   .
   .
   .
   
```

___


### 7. ServiceNow.DeleteTask

To delete an existing record in ServiceNow table.

| Parameters        | Description                                                |
|-------------------|------------------------------------------------------------|
| type              | type of table - incident, change_request                   |
| number            | Ticket number in ServiceNow                                |
| callback function | Response will be available as a parameter to this function |

#### Request

```
ServiceNow.DeleteTask('incident','INC0010006',res=>{
    console.log(res.status);
});
```

#### Response

```
204
```

## Examples

### 1. Get critical incidents which are open for last 6 months.

#### Request

```
const sn = require('servicenow-rest-api');
const ServiceNow = new sn('devserver','admin','password');

ServiceNow.Authenticate();

const fields =[
    'number',
    'short_description',
    'assignment_group',
    'assigned_to'
];

const filters=[
    'priority=1',
    'state=In Progress',
    'opened_atONLast 6 months@javascript:gs.beginningOfLast6Months()@javascript:gs.endOfLast6Months()' //Opened on last 6 months
];

ServiceNow.getTableData(fields,filters,'incident',res=>{
    console.log(res);
});
```

#### Response

```
[ { number: 'INC0000003',
    short_description: 'Wireless access is down in my area',
    assignment_group:
     { display_value: 'Network',
       link: 'https://devserver.service-now.com/api/now/v2/table/sys_user_group/287ebd7da9fe198100f92cc8d1d2154e' },
    assigned_to:
     { display_value: 'Beth Anglin',
       link: 'https://devserver.service-now.com/api/now/v2/table/sys_user/46d44a23a9fe19810012d100cca80666' } },
  { number: 'INC0000050',
    short_description: 'Can\'t access Exchange server - is it down?',
    assignment_group:
     { display_value: 'Hardware',
       link: 'https://devserver.service-now.com/api/now/v2/table/sys_user_group/8a5055c9c61122780043563ef53438e3' },
       .
       .
       .       
```
___

### 2. Create an Emergency change to reboot server

#### Request

```
const sn = require('servicenow-rest-api');
const ServiceNow = new sn('devserver','admin','password');

ServiceNow.Authenticate();

const changeData={
    'short_description':'Reboot Server',
    'priority':'1',
    'risk':'High',
    'type':'Emergency',
    'assignment_group':'Hardware'
};
     

ServiceNow.createNewTask(changeData,'change_request',res=>{
    console.log(res);
});
```

#### Response

```
{ parent: '',
  reason: null,
  made_sla: 'true',
  backout_plan: '',
  watch_list: '',
  upon_reject: 'Cancel all future Tasks',
  sys_updated_on: '2017-11-03 07:37:23',
  type: 'Emergency',
  conflict_status: 'Not Run',
  approval_history: '',
  number: 'CHG0030003',
  .
  .
  .
  short_description: 'Reboot Server',
  close_code: null,
  correlation_display: '',
  delivery_task: '',
  work_start: '',
  assignment_group:
   { display_value: 'Hardware',
   .
   .
   .
```
___

### 3. Elevate priority of ticket

#### Request

```
const sn = require('servicenow-rest-api');
const ServiceNow = new sn('devserver','admin','password');

ServiceNow.Authenticate();

const incidentData={
    'work_notes':'Elevating priority of ticket as per business request',
    'urgency':'1',
    'impact':'1'
};
     
ServiceNow.UpdateTask('incident','INC0010007',incidentData,res=>{
    console.log(res);
});
```

#### Response

```
{ parent: '',
  made_sla: 'true',
  caused_by: '',
  watch_list: '',
  upon_reject: 'Cancel all future Tasks',
  sys_updated_on: '2017-11-03 08:25:17',
  child_incidents: '0',
  hold_reason: '',
  approval_history: '',
  number: 'INC0010007',
  .
  .
  .
  impact: '1 - High',
  active: 'true',
  work_notes_list: '',
  business_service: '',
  priority: '1 - Critical',
  .
  .
  .
   work_notes: '2017-11-03 08:25:17 - System Administrator (Work notes)\nElevating priority of ticket as per business request\n',
  short_description: 'Cannot connect to internet',
```


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details
