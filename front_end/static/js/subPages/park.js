import parks from "./../../../../fetchingData.js";
import defaultPage from "./defaultPage.js";

export default class extends defaultPage {
  constructor(params) {
    super(params);
    this.setTitle(decodeURIComponent(params.id) + " Park Narodowy");
    this.parki = parks;
    this.id = decodeURIComponent(params.id);
  }

  async getHtml() {
    try {
      let parkImage = "";
      if (this.id) {
        this.parki.forEach((park) => {
          if (park.name == this.id) {
            parkImage = `<img src="${park.photo}" alt="${park.name}">`;
          }
        });
      }
      return `
        <div>
            ${parkImage}
        </div>
        `;
    } catch (error) {
      console.log(error);
    }
  }
}