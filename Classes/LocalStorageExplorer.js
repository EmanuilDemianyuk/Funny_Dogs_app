export class LocalStorageExplorer {
    /**
     * @param { string } key 
     * @param { string } json  
     * @returns { string }
     */
    static async setJsonData(key, json){
        const response = JSON.stringify(await json);
        window.localStorage.setItem(key, response);
        return json;
    }
    
    /**
     * @param { string } key 
     * @param { string } userEvent 
     * @param { string } userRequest 
     * @param { null / array } data 
     */
    static setArrayResponseData(key, userEvent, userRequest, data) {
        const userData = {
            status: userEvent,
            userRequest: userRequest
        };
        if(data === null) { 
            data = [] 
        }else {
           data = JSON.parse(data)
        }
        data.push(userData);
        window.localStorage.setItem(key, JSON.stringify(data));
    }
    /** 
     * @param { string } key 
     * @param { string } status 
     */
    static setKey(key, status) {
        window.localStorage.setItem(key, status);
    }
    /** 
     * @param { string } key 
     * @returns { string }
     */
    static getKey(key) {
        return window.localStorage.getItem(key);
    }
    /**
     * @param { string } key 
     */
    static removeKey(key = undefined) {
        (key === undefined)
        ? window.localStorage.clear()  
        : window.localStorage.removeItem(key)
    }
}