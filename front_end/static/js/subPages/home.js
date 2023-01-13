import defaultPage from "./defaultPage.js";

export default class extends defaultPage {
    constructor() {
        super();
        this.setTitle("Parki Narodowe");
    }
    async getHtml(){
        try{
            return `
            siema
            
            
            
            `;
        }catch(error){
            console.log(error);
        };
    
    }
}