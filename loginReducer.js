import {
    GETLOGIN,
    GETLOGINSUCCESS,
    GETLOGINFAILED,
    GETSIGNUP,
    GETSIGNUPSUCCESS,
    GETSIGNUPFAILED,
    GETLOGOUT,
    GETLOGOUTSUCCESS,
    GETLOGOUTFAILED,
    SOCIALLOGIN,
    SOCIALLOGINSUCCESS,
    SOCIALLOGINFAILED,
    SOCIALREGISTER,
    SOCIALREGISTERSUCCESS,
    SOCIALREGISTERFAILED
} from '../actions/LoginActions'

const initialState = { fetching: false, success: false, error: false };


export function GetLogin(state = initialState, action) {
    console.log('Login called reducer')
    switch (action.type) {

        case GETLOGIN: {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false,

            });
        }
        case GETLOGINSUCCESS: {
            return Object.assign({}, state, {
                fetching: false,
                success: true,
                error: false,

            },
                { details: action.payload });
        }
        case GETLOGINFAILED: {
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

export function GetLogout(state = initialState, action) {
    console.log('LogOut called reducer')
    switch (action.type) {

        case GETLOGOUT: {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false,

            });
        }
        case GETLOGOUTSUCCESS: {
            return Object.assign({}, state, {
                fetching: false,
                success: true,
                error: false,

            },
                { details: action.payload });
        }
        case GETLOGOUTFAILED: {
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

export function GetSignup(state = initialState, action) {

    switch (action.type) {

        case GETSIGNUP: {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false,

            });
        }
        case GETSIGNUPSUCCESS: {
            return Object.assign({}, state, {
                fetching: false,
                success: true,
                error: false,

            },
                { details: action.payload });
        }
        case GETSIGNUPFAILED: {
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

export function SocialLogin(state = initialState, action) {

    switch (action.type) {

        case SOCIALLOGIN: {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false,

            });
        }
        case SOCIALLOGINSUCCESS: {
            return Object.assign({}, state, {
                fetching: false,
                success: true,
                error: false,

            },
                { details: action.payload });
        }
        case SOCIALLOGINFAILED: {
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

export function SocialRegister(state = initialState, action) {

    switch (action.type) {

        case SOCIALREGISTER: {
            return Object.assign({}, state, {
                fetching: true,
                success: false,
                error: false,

            });
        }
        case SOCIALREGISTERSUCCESS: {
            return Object.assign({}, state, {
                fetching: false,
                success: true,
                error: false,

            },
                { details: action.payload });
        }
        case SOCIALREGISTERFAILED: {
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

