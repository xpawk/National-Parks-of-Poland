import defaultPage from "./defaultPage.js";

export default class extends defaultPage {
    constructor() {
        super();
        this.setTitle("Parki Narodowe");
    }
 async getHtml(){
        try{
            const response = await fetch("http://localhost:3000/parks.json");
            const parks = await response.json();
            let parkLinks = "";
            parks.forEach((park) => {
             parkLinks +=`
                  <div class="parks_item">
                  <div class="parks_item_background" style=background-image:url(${park.photo.replace("/thumb/", "/").split(".jpg")[0].split(".JPG")[0] + (park.photo.includes(".jpg") ? ".jpg" : ".JPG")})>
                 
                  <h3 class="parks_item_title"> ${park.name} </h3>
                 
                  <div class="parks_item_surface">
                  <img src="/static/style/img/area.png" class="parks_item_surface_img"/>  
                  <div class="parks_item_surface_p">${park.surface}</div>
                  </div>
                  
                  <div class="parks_item_voivodeship"> 
                  <img src="/static/style/img/map.png" class="parks_item_voivodeship_img"/> 
                  <div class="parks_item_voivodeship_p">${park.voivodeship}</div>
                  </div>
                  
                  <div class="parks_item_button">
                  <a class="parks_item_button_txt" href="park/${park.name}" data-link>Zobacz Więcej</a>
                  </div>
                  <div class="parks_item_symbol">
                  <img class="parks_item_symbol_img" src="${park.symbol.replace("/thumb/", "/").split(".svg")[0] + ".svg"}" />
                  </div>
                  </div>
                  
                  </div>
                  
              `;
            });
          return `<div class="parks">${parkLinks}</div>`;
        }catch(error){
            console.log(error);
        };
    }
  }
