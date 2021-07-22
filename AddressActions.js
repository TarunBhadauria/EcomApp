import serverData from '../api/ServerData';

export const ADDADDRESS = "ADDADDRESS";
export const ADDADDRESSSUCCESS = "ADDADDRESSSUCCESS";
export const ADDADDRESSFAILED = "ADDADDRESSFAILED";

export const SHOWADDRESS = "SHOWADDRESS";
export const SHOWADDRESSSUCCESS = "SHOWADDRESSSUCCESS";
export const SHOWADDRESSFAILED = "SHOWADDRESSFAILED";
 
export const EDITADDRESS = "EDITADDRESS";
export const EDITADDRESSSUCCESS = "EDITADDRESSSUCCESS";
export const EDITADDRESSFAILED = "EDITADDRESSFAILED";
 
export const DELETEADDRESS = "DELETEADDRESS";
export const DELETEADDRESSSUCCESS = "DELETEADDRESSSUCCESS";
export const DELETEADDRESSFAILED = "DELETEADDRESSFAILED";
 


export function AddAddress(body) {
    console.log("Action Called action");
    return async dispatch => {
        dispatch({
            type: ADDADDRESS,
            payload: {},
        });

        await serverData.AddAddress(
            body,
            (data) => {
                dispatch({
                    type: ADDADDRESSSUCCESS,
                    payload: data,
                })
            },
            error => {
                dispatch({
                    type: ADDADDRESSFAILED,
                    payload: error,
                });
            }
        );
    }
}

export function ShowAddress(body) {
    console.log("Action Called action");
    return async dispatch => {
        dispatch({
            type: SHOWADDRESS,
            payload: {},
        });

        await serverData.ShowAddress(
            body,
            (data) => {
                dispatch({
                    type: SHOWADDRESSSUCCESS,
                    payload: data,
                })
            },
            error => {
                dispatch({
                    type: SHOWADDRESSFAILED,
                    payload: error,
                });
            }
        );
    }
}

export function EditAddress(body) {
    console.log("Action Called action");
    return async dispatch => {
        dispatch({
            type: EDITADDRESS,
            payload: {},
        });

        await serverData.EditAddress(
            body,
            (data) => {
                dispatch({
                    type: EDITADDRESSSUCCESS,
                    payload: data,
                })
            },
            error => {
                dispatch({
                    type: EDITADDRESSFAILED,
                    payload: error,
                });
            }
        );
    }
}

export function DeleteAddress(body) {
    console.log("Action Called action");
    return async dispatch => {
        dispatch({
            type: DELETEADDRESS,
            payload: {},
        });

        await serverData.DeleteAddress(
            body,
            (data) => {
                dispatch({
                    type: DELETEADDRESSSUCCESS,
                    payload: data,
                })
            },
            error => {
                dispatch({
                    type: DELETEADDRESSFAILED,
                    payload: error,
                });
            }
        );
    }
}
