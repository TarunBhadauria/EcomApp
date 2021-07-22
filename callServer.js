const  axios  = require("axios")

const callServer={
 request : async (method,url,body,success)=>{
let config={
method:method,
headers:{
    Accept:"/*/",
    "Content-Type":"application/json"
},
// credentials:"Include",
}

if (body !==""){
    
    var new_body=(JSON.stringify(body))
    config={...config,body:new_body}
}

await fetch(url,config).then((res)=>res.json()).then(result=>{
   
    success(result);

})
},

    requestImage: async (url,body,success)=>{
        let config={
        
        headers:{
          
            "Content-Type":"multipart/form-data"
        },
        // credentials:"Include",
        }
        await axios.post(url,body,config).then(result=>{
            success(result);
        })
}
}

module.exports = callServer;