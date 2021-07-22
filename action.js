
import {Base_url} from "./Serverconfig";
var Server = require('./callServer');
var serverData={
    showData :(body,success)=>{
        Server.request("GET",`${Base_url}dashboard`,"",(result)=>{
            success(result);
        })
        },
     displayProducts :(body,success)=>{
         console.log("Display PRoduct Server Called");
            Server.request("GET",`${Base_url}showproducts`,"",(result)=>{
                success(result);
            })
            },
     placeOrder :(body,success)=>{
         
         console.log("placeOrder Product Server Called");
            Server.request("POST",`${Base_url}placeorder`,body,(result)=>{
                success(result);
             
            })
            },
     checkLogin :(body,success)=>{
         
         console.log("checkLogin Product Server Called");
            Server.request("POST",`${Base_url}login`,body,(result)=>{
                success(result);
             
            })
            },
     checkSignup :(body,success)=>{
         
         console.log("checkLogin Product Server Called");
            Server.request("POST",`${Base_url}signup`,body,(result)=>{
                success(result);
              
            })
            }

}
export default serverData;
// export const registerUser = (body,success)=>{

// Server.request("Post",`${Base_url}user/register1`,body,(result)=>{
//     success(result);
// });


// export const submitInfo = (body,success)=>{
// console.log("Data In action" , JSON.stringify(body))
// Server.requestImage(`${Base_url}addproducts`,body,(result)=>{
//     success(result);
// })
// }
// export const sendImage = (body,success)=>{
// console.log("Data In action" , JSON.stringify(body))
// Server.requestImage(`${Base_url}updatepicture`,body,(result)=>{
//     success(result);
// })
// }
// export const updateImage =(success)=>{
//     Server.requestImage("POST",`${Base_url}updatepicture`,"",(result)=>{
//         success(result);
//     })
//     }

// export const EditData =(body,success)=>{
// Server.request("POST",`${Base_url}editproducts`,body,(result)=>{
//     success(result);
// })

// }
