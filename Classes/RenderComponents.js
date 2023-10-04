export class RenderComponents {
    #output;
    #btnOutput;
    #outBoxLikes;
    /**
     * @param { Node } output 
     * @param { Node } btnOutput 
     * @param { Node } outBoxLikes 
     */
    constructor(output, btnOutput, outBoxLikes) {
        this.#output = output;
        this.#btnOutput = btnOutput;
        this.#outBoxLikes = outBoxLikes;
    }
    get output() { return this.#output }
    get btnOutput() { return this.#btnOutput }
    get outBoxLikes() { return this.#outBoxLikes }
    
    /**
     * @param { string } json 
     */
    async renderInf(json) {
        this.#output.insertAdjacentHTML('afterbegin', this.buildingPage(await json));
        this.#btnOutput.insertAdjacentHTML('afterbegin', `<button class="btnNext">Next photo</button>`);
        
    }

    /**
     * @param { string } json 
     * @returns { string }
     */
    buildingPage(json) {
        const result = [];
        json.map(el => { result.push(`<div class="imgBox">
        <img class="dogPhoto" data-address="${el.message}" src="${el.message}" alt="logo">
        <span class="comentBox">
            <img class="comment" src="https://cdn-icons-png.flaticon.com/128/2593/2593482.png" alt="logoComment">
        </span>
        <span class="userNav">
        <img class="likesNav like" src="https://cdn-icons-png.flaticon.com/128/10070/10070014.png" alt="logo">
        <img class="likesNav disLike" src="https://cdn-icons-png.flaticon.com/512/4837/4837019.png" alt="logo">
        </span>
        </div>`) });
        return result.join("");
    }
    
    /**
     * @param { Node } wrap 
     */
    renderModalWindow(wrap) {
        wrap.insertAdjacentHTML('afterbegin', `
        <div class="modalContainer">
            <div class="modalBox">
                <div class="modalHead">
                    <img 
                    class="closeModal" 
                    src="https://cdn-icons-png.flaticon.com/128/6276/6276642.png"   
                    alt="closeModalLogo">
                </div>
                <div class="modalBody">
                    <textarea name="textAreaModalWindows" 
                              id="textAreaModalWindows" 
                              cols="20" 
                              rows="10"
                              placeholder="Write a comment on this great photo...">
                    </textarea>
                </div>
                <div class="modalFooter">
                    <button class="sendBtn">Send</button>
                </div>
            </div>
        </div>`)
    }
}