import serverData from '../api/ServerData';

export const CHECK = 'CHECK';
export const GETHOMEDATA = 'GETHOMEDATA';
export const GETHOMEDATASUCCESS = 'GETHOMEDATASUCCESS';
export const GETHOMEDATAFAILED = 'GETHOMEDATAFAILED';

export const PRODUCTBYCATEGORY = 'PRODUCTBYCATEGORY';
export const PRODUCTBYCATEGORYSUCCESS = 'PRODUCTBYCATEGORYSUCCESS';
export const PRODUCTBYCATEGORYFAILED = 'PRODUCTBYCATEGORYFAILED';

export const PRODUCTDETAILSBYID = 'PRODUCTDETAILSBYID';
export const PRODUCTDETAILSBYIDSUCCESS = 'PRODUCTDETAILSBYIDSUCCESS';
export const PRODUCTDETAILSBYIDFAILED = 'PRODUCTDETAILSBYIDFAILED';



export function GetHomeData(body) {
    console.log("Action Called action");
    return async dispatch => {
        dispatch({
            type: GETHOMEDATA,
            payload: {},
        });

        await serverData.GetHomeData(
            body,
            (data) => {
                dispatch({
                    type: GETHOMEDATASUCCESS,
                    payload: data,
                })
            },
            error => {
                dispatch({
                    type: GETHOMEDATAFAILED,
                    payload: error,
                });
            }
        );
    }
}
export function GetProductByCategory(body) {
    console.log("Action Called action");
    return async dispatch => {
        dispatch({
            type: PRODUCTBYCATEGORY,
            payload: {},
        });

        await serverData.GetProductByCategory(
            body,
            (data) => {
                dispatch({
                    type: PRODUCTBYCATEGORYSUCCESS,
                    payload: data,
                })
            },
            error => {
                dispatch({
                    type: PRODUCTBYCATEGORYFAILED,
                    payload: error,
                });
            }
        );
    }
}

export function ProductDetailsById(body) {
    console.log("Action Called action");
    return async dispatch => {
        dispatch({
            type: PRODUCTDETAILSBYID,
            payload: {},
        });

        await serverData.ProductDetailsById(
            body,
            (data) => {
                dispatch({
                    type: PRODUCTDETAILSBYIDSUCCESS,
                    payload: data,
                })
            },
            error => {
                dispatch({
                    type: PRODUCTDETAILSBYIDFAILED,
                    payload: error,
                });
            }
        );
    }
}



export function Check(action) {
    console.log("Action Called ", action);
    return async dispatch => {
        dispatch({
            type: CHECK,
            payload: { action },
        })
    }
}