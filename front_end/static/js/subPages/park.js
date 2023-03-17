export default class {
  constructor(params) {
    document.title = decodeURIComponent(params.id) + " Park Narodowy";
    this.id = decodeURIComponent(params.id);
  }

  async getHtml() {
    try {
      const response = await fetch("http://localhost:3000/parks.json");
      const parks = await response.json();
      let parkInfo = [];

      parks.forEach((park) => {
        if (park.name == this.id) {
          let tweak = "";
          let parkname = "";
          if (/\s/.test(park.name)) {
            parkname = `Park Narodowy ${park.name}`;
          } else {
            parkname = `${park.name} Park Narodowy`;
          }
          if (park.name == "Tatrzański") {
            tweak =
              'style="margin-top: 60px; border:0px !important; width:280px; box-shadow:none"';
          }

          parkInfo += `
          <div class='park_header'>
             <img class=park_Photo src="${
               park.photo
                 .replace("/thumb/", "/")
                 .split(".jpg")[0]
                 .split(".JPG")[0] +
               (park.photo.includes(".jpg") ? ".jpg" : ".JPG")
             }" alt="${parkname} Zdjęcie"/>
            
             </div>
             
            
          
            <div class="park"> 
            <h2 class='park_name'>${parkname}</h2>
            <div class='park_Symbol_container'>
            <img class="park_Symbol" ${tweak} src="${
            park.symbol.replace("/thumb/", "/").split(".svg")[0] + ".svg"
          }" alt="${parkname} symbol">
            </div>
            
           
             
      
             <p class="park_Data_element">${park.desc}</p>
             <div class="park_Data">
             <div>
             <b >Powierzchnia:</b> ${park.surface} <br/>
             <b>Rok Założenia:</b> ${park.year} <br/>
             <b>Województwo:</b> ${park.voivodeship}
             </div>
           </div>
            
    
         `;

          if (park.his !== "") {
            parkInfo += `
          <p class="park_Data_element"><b>Historia</b></br></br>${park.his}</p>
          
          </div>`;
          }
        }
      });
      return `${parkInfo}`;
    } catch (error) {
      console.log(error);
    }
  }
}
