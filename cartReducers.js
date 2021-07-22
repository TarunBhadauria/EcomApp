import {
    ADDTOCART,
    ADDTOCARTSUCCESS,
    ADDTOCARTFAILED,
    REMOVEFROMCART,
    REMOVEFROMCARTSUCCESS,
    PLACEORDER,
    PLACEORDERSUCCESS,
    PLACEORDERFAILED,
    GETMYORDRES,
    GETMYORDRESSUCCESS,
    GETMYORDRESFAILED
  } from "../actions/cartActions";

  const initialState ={fetching:false,success:false,error:false};

  export function addToCart(state=initialState,action){
switch(action.type){
    case ADDTOCART : {
        return Object.assign({},state,{
            fetching:true,
            success:false,
            error:false,

        });
    }
    case ADDTOCARTSUCCESS : {
        return Object.assign({},state,{
            fetching:false,
            success:true,
            error:false,

        },
        {details:action.payload},);
    }
    // case ADDTOCARTFAILED : {
    //     return Object.assign({},state,{
    //         fetching:false,
    //         success:false,
    //         error:true,
           

    //     },
    //     {details:action.payload},);
    // }
    default:{
        return initialState;
    }
}
  }


  export function removeFromCart(state=initialState,action){
switch(action.type){
    case REMOVEFROMCART : {
        return Object.assign({},state,{
            fetching:true,
            success:false,
            error:false,

        });
    }
    case REMOVEFROMCARTSUCCESS : {
        return Object.assign({},state,{
            fetching:false,
            success:true,
            error:false,

        },
        {details:action.payload},);
    }
    // case ADDTOCARTFAILED : {
    //     return Object.assign({},state,{
    //         fetching:false,
    //         success:false,
    //         error:true,
           

    //     },
    //     {details:action.payload},);
    // }
    default:{
        return initialState;
    }
}
  }

  export function PlaceOrder(state=initialState,action){
      console.log('Place Order Reducer Called')
switch(action.type){
    case PLACEORDER : {
        return Object.assign({},state,{
            fetching:true,
            success:false,
            error:false,

        });
    }
    case PLACEORDERSUCCESS : {
        return Object.assign({},state,{
            fetching:false,
            success:true,
            error:false,

        },
        {details:action.payload},);
    }
    case PLACEORDERFAILED : {
        return Object.assign({},state,{
            fetching:false,
            success:false,
            error:true,
           

        },
        {details:action.payload},);
    }
    default:{
        return initialState;
    }
}
  }

  export function GetMyOrders(state=initialState,action){
switch(action.type){
    case GETMYORDRES : {
        return Object.assign({},state,{
            fetching:true,
            success:false,
            error:false,

        });
    }
    case GETMYORDRESSUCCESS : {
        console.log('Reducer Called My Orders')
        return Object.assign({},state,{
            fetching:false,
            success:true,
            error:false,

        },
        {details:action.payload},);
    }
    case GETMYORDRESFAILED : {
        return Object.assign({},state,{
            fetching:false,
            success:false,
            error:true,
           

        },
        {details:action.payload},);
    }
    default:{
        return initialState;
    }
}
  }