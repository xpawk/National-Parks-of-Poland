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
          var element = park.desc.split("–");
          if (element[1] == undefined) {
            element = park.desc.split(",");
          }

          parkInfo += `
             <div class="park">
             <img class=park_Photo src="${
               park.photo
                 .replace("/thumb/", "/")
                 .split(".jpg")[0]
                 .split(".JPG")[0] +
               (park.photo.includes(".jpg") ? ".jpg" : ".JPG")
             }" alt="${park.name} Zjęcie">
             <br/>
             <div class="park_Data">
               <b >Powierzchnia:</b> ${park.surface} <br/>
               <b>Rok Założenia:</b> ${park.year} <br/>
               <b>Województwo:</b> ${park.voivodeship}
             </div>
             <img class="park_Symbol" src="${
               park.symbol.replace("/thumb/", "/").split(".svg")[0] + ".svg"
             }" alt="${park.name} symbol">
             <b class="park_Data_element">${element[0]}</b>
             <p class="park_Data_element">${element[1]}</p>
         `;

          if (park.his !== "") {
            parkInfo += `
          <h3>Historia</h3>
          <p class="park_Data_element">${park.his}</p>
          `;
          }
        }
      });
      return `${parkInfo}`;
    } catch (error) {
      console.log(error);
    }
  }
}
