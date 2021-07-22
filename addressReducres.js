import {
   ADDADDRESS,
   ADDADDRESSSUCCESS,
   ADDADDRESSFAILED,
   SHOWADDRESS,
   SHOWADDRESSSUCCESS,
   SHOWADDRESSFAILED,
   EDITADDRESS,
   EDITADDRESSSUCCESS,
   EDITADDRESSFAILED,
   DELETEADDRESS,
   DELETEADDRESSSUCCESS,
   DELETEADDRESSFAILED
} from '../actions/AddressActions'

const initialState = { fetching: false, success: false, error: false };


export function AddAddress(state = initialState, action) {
    console.log('Login called reducer')
    switch (action.type) {

        case ADDADDRESS: {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false,

            });
        }
        case ADDADDRESSSUCCESS: {
            return Object.assign({}, state, {
                fetching: false,
                success: true,
                error: false,

            },
                { details: action.payload });
        }
        case ADDADDRESSFAILED: {
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

export function ShowAddress(state = initialState, action) {
    console.log('Login called reducer')
    switch (action.type) {

        case SHOWADDRESS: {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false,

            });
        }
        case SHOWADDRESSSUCCESS: {
            return Object.assign({}, state, {
                fetching: false,
                success: true,
                error: false,

            },
                { details: action.payload });
        }
        case SHOWADDRESSFAILED: {
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

export function EditAddress(state = initialState, action) {
    console.log('Login called reducer')
    switch (action.type) {

        case EDITADDRESS: {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false,

            });
        }
        case EDITADDRESSSUCCESS: {
            return Object.assign({}, state, {
                fetching: false,
                success: true,
                error: false,

            },
                { details: action.payload });
        }
        case EDITADDRESSFAILED: {
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

export function DeleteAddress(state = initialState, action) {
    console.log('Login called reducer')
    switch (action.type) {

        case DELETEADDRESS: {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false,

            });
        }
        case DELETEADDRESSSUCCESS: {
            return Object.assign({}, state, {
                fetching: false,
                success: true,
                error: false,

            },
                { details: action.payload });
        }
        case DELETEADDRESSFAILED: {
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

