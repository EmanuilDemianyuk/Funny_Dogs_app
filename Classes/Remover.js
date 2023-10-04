export class Remover{
    /**
     * @param {Node} element 
     */
    static removeHTMLElement(element) { element.remove() }
    
    /**
     * @param {Node} element 
     */
    static removeAllHTMLElement(element) { 
        while(element.children.length > 0){
            element.firstChild.remove();
        }
    }
}