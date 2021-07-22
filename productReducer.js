import {
    CHECK,
    GETHOMEDATA,
    GETHOMEDATASUCCESS,
    GETHOMEDATAFAILED, 
    PRODUCTBYCATEGORY, 
    PRODUCTBYCATEGORYSUCCESS, 
    PRODUCTBYCATEGORYFAILED,
    PRODUCTDETAILSBYID,
    PRODUCTDETAILSBYIDSUCCESS,
    PRODUCTDETAILSBYIDFAILED
} from '../actions/ProductActions'

const initialState = { fetching: false, success: false, error: false };


export function GetHomeData(state = initialState, action) {

    switch (action.type) {

        case GETHOMEDATA: {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false,

            });
        }
        case GETHOMEDATASUCCESS: {
            return Object.assign({}, state, {
                fetching: false,
                success: true,
                error: false,

            },
                { details: action.payload });
        }
        case GETHOMEDATAFAILED: {
            return Object.assign({}, state, {
                fetching: false,
                success: false,
                error: true,


            },
                { details: action.payload });
        }
        default: {
            return initialState;
        }
    }
}

export function GetProductByCategory(state = initialState, action) {
    
    switch (action.type) {

        case PRODUCTBYCATEGORY: {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false,

            });
        }
        case PRODUCTBYCATEGORYSUCCESS: {
            return Object.assign({}, state, {
                fetching: false,
                success: true,
                error: false,

            },
                { details: action.payload });
        }
        case PRODUCTBYCATEGORYFAILED: {
            return Object.assign({}, state, {
                fetching: false,
                success: false,
                error: true,


            },
                { details: action.payload });
        }
        default: {
            return initialState;
        }
    }
}

export function ProductDetailsById(state = initialState, action) {
  
    switch (action.type) {

        case PRODUCTDETAILSBYID: {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false,

            });
        }
        case PRODUCTDETAILSBYIDSUCCESS: {
            return Object.assign({}, state, {
                fetching: false,
                success: true,
                error: false,

            },
                { details: action.payload });
        }
        case PRODUCTDETAILSBYIDFAILED: {
            return Object.assign({}, state, {
                fetching: false,
                success: false,
                error: true,


            },
                { details: action.payload });
        }
        default: {
            return initialState;
        }
    }
}

export function Check(state = initialState, action) {
   
    switch (action.type) {
        case CHECK: {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false,

            }, { details: action.payload });
        }

        default: {
            return initialState;
        }
    }
}