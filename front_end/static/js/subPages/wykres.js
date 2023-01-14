import defaultPage from "./defaultPage.js";

export default class extends defaultPage {
  constructor() {
    super();
    this.setTitle("Wykres");
  }
  async getHtml() {
    try {
      return `
          sadfdas
            
            
            
            `;
    } catch (error) {
      console.log(error);
    }
  }
}
