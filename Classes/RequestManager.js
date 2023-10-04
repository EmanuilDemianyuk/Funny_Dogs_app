export class RequestManager{
    /**
     * 
     * @param { string } jsonObj 
     * @param { number } countLoaded  
     * @returns { Array } 
     */
    static async requestOperation(jsonObj, countLoaded) {
        let count = 0;
        const responses = [];
        
        while(countLoaded > count) {
            
            responses.push(await fetch(jsonObj)
            .then(response => response.json())) 
            // .then(response => message)
            ++count;
        }
        
        return await Promise.all(responses);
    }
}