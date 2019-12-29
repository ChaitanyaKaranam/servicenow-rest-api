let axios= require('axios');

function ServiceNow(instance,userid,password){
    this.instance=instance;
    this.userid=userid;
    this.password=password;
}

const getInstance = instance => instance.indexOf(".") >= 0 ? instance : `${instance}.service-now.com`;

//Authenticate ServiceNow instances
ServiceNow.prototype.Authenticate=function(){
    const options={
        url:`https://${getInstance(this.instance)}/api/now/v2/table/sys_user?user_name=${this.userid}`,
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
        console.log('Authenticated');
    },(rej)=>{
        console.log(rej);
    });
}

// Add custom network options
ServiceNow.prototype.setNetworkOptions = function(options){
    if(Object.keys(options).length > 0){
        axios = axios.create(options);
    }else{
        console.log('Invalid Options')
    }
}


//GET - Sample data to check the fields and filters
ServiceNow.prototype.getSampleData=function(type,callback){
    const options={
        url:`https://${getInstance(this.instance)}/api/now/v2/table/${type}?sysparm_limit=1`,
        method:'get',
        auth:{
            username:`${this.userid}`,
            password:`${this.password}`
        }
    };
    axios(options).then((val)=>{
        if(callback == undefined){
            console.log();
            console.log('Fix below errors');
            console.log();
            console.log('(1) ==> Cannot find Callback function...');
            console.log('*********** Sample Request **********');
            console.log(`ServiceNow.getSampleData('change_request',(res)=>console.log(res))`);
            console.log();
        }else{
            callback(val.data.result);
        }
    }).catch((err)=>{
        if(callback == undefined){
            console.log();
            console.log('Fix below errors');
            console.log();
            console.log('(1) ==> Cannot find Callback function...');
            console.log('*********** Sample Request **********');
            console.log(`ServiceNow.getSampleData('change_request',(res)=>console.log(res))`);
            console.log();
            console.log('(2) ==> Bad Request...');
            console.log(err);
        }else{
            callback(err);
        }
    });
}

//GET-Service now Table data
ServiceNow.prototype.getTableData=function(fields,filters,type,callback){
    let sysparm_fields='sysparm_fields=';
    let sysparm_query='sysparm_query=';
    let url=`https://${getInstance(this.instance)}/api/now/v2/table/${type}?sysparm_display_value=true`;
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
        if(callback == undefined){
            console.log();
            console.log('Fix below errors');
            console.log();
            console.log('(1) ==> Cannot find Callback function...');
            console.log('*********** Sample Request **********');
            console.log(`ServiceNow.getTableData(fields,filters,'incident',(res)=>console.log(res))`);
            console.log();
        }else{
            callback(val.data.result);
        }

    }).catch((err)=>{
        if(callback == undefined){
            console.log();
            console.log('Fix below errors');
            console.log();
            console.log('(1) ==> Cannot find Callback function...');
            console.log('*********** Sample Request **********');
            console.log(`ServiceNow.getTableData(fields,filters,'incident',(res)=>console.log(res))`);
            console.log();
            console.log('(2) ==> Bad Request...');
            console.log(err);
        }else{
            callback(err);
        }
    });
}


//GET-Service now Table stats
ServiceNow.prototype.getTableStats=function(type,callback){
    let url=`https://${this.instance}.service-now.com/api/now/stats/${type}?sysparm_count=true`;


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
        if(callback == undefined){
            console.log();
            console.log('Fix below errors');
            console.log();
            console.log('(1) ==> Cannot find Callback function...');
            console.log('*********** Sample Request **********');
            console.log(`ServiceNow.getTableData(fields,filters,'incident',(res)=>console.log(res))`);
            console.log();
        }else{
            callback(val.data.result);
        }

    }).catch((err)=>{
        if(callback == undefined){
            console.log();
            console.log('Fix below errors');
            console.log();
            console.log('(1) ==> Cannot find Callback function...');
            console.log('*********** Sample Request **********');
            console.log(`ServiceNow.getTableData(fields,filters,'incident',(res)=>console.log(res))`);
            console.log();
            console.log('(2) ==> Bad Request...');
            console.log(err);
        }else{
            callback(err);
        }
    });
}

//POST- Create new record in ServiceNow Table
ServiceNow.prototype.createNewTask=function(data,type,callback){
    const options={
        url:`https://${getInstance(this.instance)}/api/now/table/${type}?sysparm_input_display_value=true&sysparm_display_value=true`,
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
        if(callback == undefined){
            console.log();
            console.log('Fix below errors');
            console.log();
            console.log('(1) ==> Cannot find Callback function...');
            console.log('*********** Sample Request **********');
            console.log(`ServiceNow.createNewTask(data,'incident',(res)=>console.log(res))`);
            console.log();
        }else{
            callback(val.data.result);
        }
    }).catch((err)=>{
        if(callback == undefined){
            console.log();
            console.log('Fix below errors');
            console.log();
            console.log('(1) ==> Cannot find Callback function...');
            console.log('*********** Sample Request **********');
            console.log(`ServiceNow.createNewTask(data,'incident',(res)=>console.log(res))`);
            console.log();
            console.log('(2) ==> Bad Request...');
            console.log(err);
        }else{
            callback(err);
        }

    });

}

//GET- Sysid for table records for reference
ServiceNow.prototype.getSysId=function(type,number,callback){
    const options={
        url:`https://${getInstance(this.instance)}/api/now/v2/table/${type}?sysparm_query=number=${number}&sysparm_fields=sys_id`,
        method:'get',
        auth:{
            username:`${this.userid}`,
            password:`${this.password}`
        }
    };
    axios(options).then((val)=>{
        if(callback == undefined){
            console.log();
            console.log('Fix below errors');
            console.log();
            console.log('(1) ==> Cannot find Callback function...');
            console.log('*********** Sample Request **********');
            console.log(`ServiceNow.getSysId('incident','INC0000016',(res)=>console.log(res))`);
            console.log();
        }else{
            callback(val.data.result[0].sys_id);
        }
    }).catch((err)=>{
        if(callback == undefined){
            console.log();
            console.log('Fix below errors');
            console.log();
            console.log('(1) ==> Cannot find Callback function...');
            console.log('*********** Sample Request **********');
            console.log(`ServiceNow.getSysId('incident','INC0000016',(res)=>console.log(res))`);
            console.log();
            console.log('(2) ==> Bad Request...');
            console.log(err);
        }else{
            callback(err);
        }
    });
}

//POST - Update task record in ServiceNow
ServiceNow.prototype.UpdateTask =function(type,number,data,callback){
    this.getSysId(type,number,(sys_id)=>{
        const options={
            url:`https://${getInstance(this.instance)}/api/now/table/${type}/${sys_id}?sysparm_input_display_value=true&sysparm_display_value=true`,
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
            if(callback == undefined){
                console.log();
                console.log('Fix below errors');
                console.log();
                console.log('(1) ==> Cannot find Callback function...');
                console.log('*********** Sample Request **********');
                console.log(`ServiceNow.UpdateTask('incident','INC0010006',data,(res)=>console.log(res))`);
                console.log();
            }else{
                callback(val.data.result);
            }
        }).catch((err)=>{
            if(callback == undefined){
                console.log();
                console.log('Fix below errors');
                console.log();
                console.log('(1) ==> Cannot find Callback function...');
                console.log('*********** Sample Request **********');
                console.log(`ServiceNow.UpdateTask('incident','INC0010006',data,(res)=>console.log(res))`);
                console.log();
                console.log('(2) ==> Bad Request...');
                console.log(err);
            }else{
                callback(err);
            }
        });
    });
}

//DELETE - Delete record from Servicenow table
ServiceNow.prototype.DeleteTask = function(type,number,callback){
    this.getSysId(type,number,(sys_id)=>{
        const options={
            url:`https://${getInstance(this.instance)}/api/now/table/${type}/${sys_id}`,
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
            if(callback == undefined){
                console.log();
                console.log('Fix below errors');
                console.log();
                console.log('(1) ==> Cannot find Callback function...');
                console.log('*********** Sample Request **********');
                console.log(`ServiceNow.DeleteTask('incident','INC0010006',(res)=>console.log(res))`);
                console.log();
            }else{
                callback(res);
            }
        }).catch((err)=>{
            if(callback == undefined){
                console.log();
                console.log('Fix below errors');
                console.log();
                console.log('(1) ==> Cannot find Callback function...');
                console.log('*********** Sample Request **********');
                console.log(`ServiceNow.DeleteTask('incident','INC0010006',(res)=>console.log(res))`);
                console.log();
                console.log('(2) ==> Bad Request...');
                console.log(err);
            }else{
                callback(err);
            }
        });
    });
}

module.exports=ServiceNow;
