import { axios } from '@/utils/faucetReqeust'
 
const api = { 
    tokentransfer: '/tokenfaucet/api/v1/tokentransfer',  
}

/**水龙头 */
export function getToken(parameter){
    return new Promise((resolve, reject) => { 
       /*  axios.post(api.tokentransfer,parameter)
        .then(function (result) {
            if (result) {
                resolve(result)
            } else {
                reject(undefined)
            }
        });   */
        axios.post(api.tokentransfer,parameter)
        .then(function (result) {
            debugger
            if (result) {
                resolve(result)
            } else {
                reject(undefined)
            }
        }).catch((err)=>{
            debugger
            reject(err)
        }); 
    });
}
 
  