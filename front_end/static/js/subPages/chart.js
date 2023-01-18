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
      parks.sort((a, b) => {
        return parseFloat(b.surface.replace(" km2", "").replace(",", ".")) - parseFloat(a.surface.replace(" km2", "").replace(",", "."));
      });
      let parkChart = "";
      parks.forEach((park) => {
        const value = parseFloat(park.surface.replace(" km2", "").replace(",", "."));
        console.log(park.surface);
        parkChart += `
                  
        <div class="chart__bar" style="--value: ${value}px"><span class="chart__label">${park.name}</span></div>
        
              `;
      });
      return `    
          <h1>Powierzchnia parków</h1>
        <div class="chart">
        ${parkChart}
        </div>`;
    } catch (error) {
      console.log(error);
    }
  }
}
