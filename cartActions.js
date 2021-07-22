import { AsyncStorage } from "react-native";
import serverData from "../api/ServerData";

export const ADDTOCART = "AddToCart";
export const ADDTOCARTSUCCESS = "AddToCartSuccess";
export const ADDTOCARTFAILED = "AddToCartSuccess";

export const REMOVEFROMCART = "RemoveFromCart";
export const REMOVEFROMCARTSUCCESS = "RemoveFromCartSuccess";

export const PLACEORDER = "PLACEORDER";
export const PLACEORDERSUCCESS = "PLACEORDERSUCCESS";
export const PLACEORDERFAILED = "PLACEORDERFAILED";

export const GETMYORDRES = "GETMYORDRES";
export const GETMYORDRESSUCCESS = "GETMYORDRESSUCCESS";
export const GETMYORDRESFAILED = "GETMYORDRESFAILED";




export function addToCart(body) {
    console.log("Action Called");
    return async dispatch => {

        var items = JSON.parse(await AsyncStorage.getItem('cart'))
        if (items === null) {

            var arr = []
            arr.push({ data: body, count: 1 });
            await AsyncStorage.setItem('cart', JSON.stringify(arr))
        } else 
       
        {
            if(items.length>10){
            alert("You Can Add Only 10 products");
        
        }
        else{
        if (checkDuplicate(body.id)) {
            items.push({ data: body, count: 1 })
            await AsyncStorage.setItem("cart", JSON.stringify(items))
        }
        else {
            

        } }
        }


        var newdata = JSON.parse(await AsyncStorage.getItem('cart'))
        dispatch({
            type: ADDTOCARTSUCCESS,
            payload: { newdata },
        })
        function checkDuplicate(id) {
            for (let i = 0; i < items.length; i++) {
                if (id === items[i].data.id) {
                    // items.push({data:body,count:2})  
                    items[i].count += 1;
                    AsyncStorage.setItem("cart", JSON.stringify(items))
                    return false;
                }

            } return true;
        }


        

        //         await serverData.ChangeCartStatus(
        //             body,
        //             (data)=>{
        //                 dispatch({
        //                     type:ADDTOCARTSUCCESS,
        //             payload:data,
        //                 })
        //             },
        //             error=>{
        //                 dispatch({
        //                     type:ADDTOCARTFAILED ,
        //             payload:error,
        //                 });
        //             }
        //         );
    }
}


export function removeFromCart(body) {
    console.log("Action Called");
    return async dispatch => {

        var items = JSON.parse(await AsyncStorage.getItem('cart'))
       
        for (let i = 0; i < items.length; i++) {
            if (body.id === items[i].data.id) {
               if(items[i].count>1){
                items[i].count -= 1;
                AsyncStorage.setItem("cart", JSON.stringify(items))
                }
                else{
                    items.splice(i,1)
                    AsyncStorage.setItem("cart", JSON.stringify(items))
                }
            }
        }

        var newdata = JSON.parse(await AsyncStorage.getItem('cart'))
        dispatch({
            type: REMOVEFROMCARTSUCCESS,
            payload: { newdata }, 
        })
       
        


        

       
    }
}

export function PlaceOrder(body) {
    console.log("Place Order Action Called ");
    return async dispatch => {
        dispatch({
            type: PLACEORDER,
            payload: {},
        });

        await serverData.PlaceOrder(
            body,
            (data) => {
                dispatch({
                    type: PLACEORDERSUCCESS,
                    payload: data,
                })
            },
            error => {
                dispatch({
                    type: PLACEORDERFAILED,
                    payload: error,
                });
            }
        );
    }
}

export function GetMyOrders(body) {
    console.log("Action Called action");
    return async dispatch => {
        dispatch({
            type: GETMYORDRES,
            payload: {},
        });

        await serverData.GetMyOrders(
            body,
            (data) => {
                dispatch({
                    type: GETMYORDRESSUCCESS,
                    payload: data,
                })
            },
            error => {
                dispatch({
                    type: GETMYORDRESFAILED,
                    payload: error,
                });
            }
        );
    }
}
