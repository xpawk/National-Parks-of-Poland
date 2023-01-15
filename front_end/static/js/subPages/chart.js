import defaultPage from "./defaultPage.js";

export default class extends defaultPage {
  constructor() {
    super();
    this.setTitle("Wykres");
  }
  async getHtml() {
    try {
      const response = await fetch("http://localhost:3000/parks.json");
      const parks = await response.json();

      let parkChart = "";
      parks.forEach((park) => {
        parkChart += `
                  <div>
      <div class="bar" value="${parseFloat(
        park.surface.replace(" km2", "").replace(",", ".")
      )}"><span class="label">${park.name}</span></div>
              `;
      });
      return `
          <div class="wrap">
          <h1>Powierzchnia parków</h1>
        ${parkChart}
        </div>`;
    } catch (error) {
      console.log(error);
    }
  }
}
