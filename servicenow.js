const axios= require('axios');

function ServiceNow(instance,userid,password){
    this.instance=instance;
    this.userid=userid;
    this.password=password;
}

//Authenticate ServiceNow instances
ServiceNow.prototype.Authenticate=function(callback){
    const options={
        url:`https://${this.instance}.service-now.com/api/now/v2/table/sys_user?user_name=${this.userid}`,
        method:'get',
        auth:{
            username:`${this.userid}`,
            password:`${this.password}`
        }
    };
    axios(options).then((val)=>{
        var res={
            raw:val,
            status:val.status
        }
        callback(res);
    }).catch((err)=>{
        callback(err);
    });
}


//GET - Sample data to check the fields and filters
ServiceNow.prototype.getSampleData=function(type,callback){
    const options={
        url:`https://${this.instance}.service-now.com/api/now/v2/table/${type}?sysparm_limit=1`,
        method:'get',
        auth:{
            username:`${this.userid}`,
            password:`${this.password}`
        }
    };
    axios(options).then((val)=>{
        callback(val.data.result);
    }).catch((err)=>{
        callback(err);
    });
}

//GET-Service now Table data
ServiceNow.prototype.getTableData=function(fields,filters,type,callback){
    let sysparm_fields='sysparm_fields=';
    let sysparm_query='sysparm_query=';
    let url=`https://${this.instance}.service-now.com/api/now/v2/table/${type}?sysparm_display_value=true`;
    if(fields.length>0){
        fields.forEach(field=>{
            sysparm_fields+=field+','
        });
        sysparm_fields=sysparm_fields.replace(/,\s*$/,"");
        url=`${url}&${sysparm_fields}`;
    }
    if(filters.length>0){
        filters.forEach(filter=>{
            sysparm_query+=filter+'^'
        });
        sysparm_query=sysparm_query.replace(/\^\s*$/,"");
        url=`${url}&${sysparm_query}`; 
    }

    const options={
        url:url,
        method:'get',
        auth:{
            username:`${this.userid}`,
            password:`${this.password}`
        }
    };    
    console.log(url);
    axios(options).then((val)=>{
        callback(val.data.result);
    }).catch((err)=>{
        callback(err);
    });
}

//POST- Create new record in ServiceNow Table
ServiceNow.prototype.createNewTask=function(data,type,callback){
    const options={
        url:`https://${this.instance}.service-now.com/api/now/table/${type}?sysparm_input_display_value=true&sysparm_display_value=true`,
        method:'post',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        data:data,
        auth:{
            username:`${this.userid}`,
            password:`${this.password}`
        }
    }

    axios(options).then((val)=>{
        callback(val.data.result);
    }).catch((err)=>{
        callback(err);
    });    

}

//GET- Sysid for table records for reference
ServiceNow.prototype.getSysId=function(type,number,callback){
    const options={
        url:`https://${this.instance}.service-now.com/api/now/v2/table/${type}?sysparm_query=number=${number}&sysparm_fields=sys_id`,
        method:'get',
        auth:{
            username:`${this.userid}`,
            password:`${this.password}`
        }
    };
    axios(options).then((val)=>{
        callback(val.data.result[0].sys_id);
    }).catch((err)=>{
        callback(err);
    });    
}

//POST - Update task record in ServiceNow
ServiceNow.prototype.UpdateTask =function(type,number,data,callback){
    this.getSysId(type,number,(sys_id)=>{
        const options={
            url:`https://${this.instance}.service-now.com/api/now/table/${type}/${sys_id}?sysparm_input_display_value=true&sysparm_display_value=true`,
            method:'put',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            data:data,
            auth:{
                username:`${this.userid}`,
                password:`${this.password}`
            }
        }
        axios(options).then((val)=>{
            callback(val.data.result);
        }).catch((err)=>{
            callback(err);
        });
    });    
}

//DELETE - Delete record from Servicenow table
ServiceNow.prototype.DeleteTask = function(type,number,callback){
    this.getSysId(type,number,(sys_id)=>{
        const options={
            url:`https://${this.instance}.service-now.com/api/now/table/${type}/${sys_id}`,
            method:'delete',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            auth:{
                username:`${this.userid}`,
                password:`${this.password}`
            }
        }
        axios(options).then((val)=>{
            var res={
                raw:val,
                status:val.status
            }
            callback(res);
        }).catch((err)=>{
            callback(err);
        });
    });
}

module.exports=ServiceNow;