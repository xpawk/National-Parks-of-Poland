import defaultPage from "./defaultPage.js";

export default class extends defaultPage {
  constructor(params) {
    super(params);
    this.setTitle(decodeURIComponent(params.id) + " Park Narodowy");
    this.id = decodeURIComponent(params.id);
  }

  async getHtml() {
    try {
      const response = await fetch("http://localhost:3000/parks.json");
      const parks = await response.json();

      let parkInfo = [];
      parks.forEach((park) => {
        if (park.name == this.id) {
          parkInfo += `
             <div class="parkData">
             <h1>
             ${park.name} 
             </h1>  
             <img src="${park.photo}" alt="${park.name} Zjęcie">
             <br/>
             <img src="${park.symbol}" alt="${park.name} symbol">
               <p>Powierzchnia: ${park.surface}</p>
               <p>Rok Założenia: ${park.year}</p>
               <p>Województwo: ${park.voivodeship}</p>
             </div>
             <div class="parkDetails">
             <p>${park.desc}</p>
         `;
          if (park.his !== "") {
            parkInfo += `
          <h3>Historia</h3>
          <p>${park.his}</p>
          `;
          }
          parkInfo += `</div>`;
        }
      });
      return `${parkInfo}`;
    } catch (error) {
      console.log(error);
    }
  }
}
