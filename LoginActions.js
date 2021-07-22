import serverData from '../api/ServerData';

export const GETLOGIN = 'GETLOGIN';
export const GETLOGINSUCCESS = 'GETLOGINSUCCESS';
export const GETLOGINFAILED = 'GETLOGINFAILED';

export const GETLOGOUT = 'GETLOGOUT';
export const GETLOGOUTSUCCESS = 'GETLOGOUTSUCCESS';
export const GETLOGOUTFAILED = 'GETLOGOUTFAILED';

export const GETSIGNUP = 'GETSIGNUP';
export const GETSIGNUPSUCCESS = 'GETSIGNUPSUCCESS';
export const GETSIGNUPFAILED = 'GETSIGNUPFAILED';

export const SOCIALLOGIN = 'SOCIALLOGIN';
export const SOCIALLOGINSUCCESS = 'SOCIALLOGINSUCCESS';
export const SOCIALLOGINFAILED = 'SOCIALLOGINFAILED';

export const SOCIALREGISTER = 'SOCIALREGISTER';
export const SOCIALREGISTERSUCCESS = 'SOCIALREGISTERSUCCESS';
export const SOCIALREGISTERFAILED = 'SOCIALREGISTERFAILED';




export function GetLogin(body) {
    return async dispatch => {
        dispatch({
            type: GETLOGIN,
            payload: {},
        });

        await serverData.GetLogin(
            body,
            (data) => {
                dispatch({
                    type: GETLOGINSUCCESS,
                    payload: data,
                })
            },
            error => {
                dispatch({
                    type: GETLOGINFAILED,
                    payload: error,
                });
            }
        );
    }
}

export function GetLogout(body) {
    return async dispatch => {
        dispatch({
            type: GETLOGOUT,
            payload: {},
        });

        await serverData.GetLogout(
            body,
            (data) => {
                dispatch({
                    type: GETLOGOUTSUCCESS,
                    payload: data,
                })
            },
            error => {
                dispatch({
                    type: GETLOGOUTFAILED,
                    payload: error,
                });
            }
        );
    }
}

export function GetSignup(body) {
    console.log("Action Called action");
    return async dispatch => {
        dispatch({
            type: GETSIGNUP,
            payload: {},
        });

        await serverData.GetSignup(
            body,
            (data) => {
                dispatch({
                    type: GETSIGNUPSUCCESS,
                    payload: data,
                })
            },
            error => {
                dispatch({
                    type: GETSIGNUPFAILED,
                    payload: error,
                });
            }
        );
    }
}

export function SocialLogin(body) {
    console.log("Action Called action");
    return async dispatch => {
        dispatch({
            type: SOCIALLOGIN,
            payload: {},
        });

        await serverData.SocialLogin(
            body,            
            (data) => {
                dispatch({
                    type: SOCIALLOGINSUCCESS,
                    payload: data,
                })

            },
            error => {
                dispatch({
                    type: SOCIALLOGINFAILED,
                    payload: error,
                });
            }
        );
    }
}


export function SocialRegister(body) {
    console.log("Action Called action");
    return async dispatch => {
        dispatch({
            type: SOCIALREGISTER,
            payload: {},
        });

        await serverData.SocialRegister(
            body,            
            (data) => {
                dispatch({
                    type: SOCIALREGISTERSUCCESS,
                    payload: data,
                })

            },
            error => {
                dispatch({
                    type: SOCIALREGISTERFAILED,
                    payload: error,
                });
            }
        );
    }
}


export function updateFcmToken(action) {
    serverData.updateFcmToken(action)

}

