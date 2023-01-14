import defaultPage from "./defaultPage.js";

export default class extends defaultPage {
  constructor(params) {
    super(params);
   this.setTitle(decodeURIComponent(params.id) + " Park Narodowy");
   this.id = decodeURIComponent(params.id);
   
   
   
  }

  async getHtml() {
    try {
    
      
    } catch (error) {
        console.log(error);
    }
  }
}