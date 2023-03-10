export default class {
  constructor() {
    document.title = "Parki Narodowe";
  }
  async getHtml() {
    try {
      const response = await fetch("http://localhost:3000/parks.json");
      const parks = await response.json();

      let parkLinks = "";
      parks.forEach((park) => {
        let photo = (parkLinks += `
                  <div class="parks_item" data-src='${park.photo.replace(
                    "140px",
                    "350px"
                  )}'>
                 
                  <h3 class="parks_item_title"> ${park.name} </h3>
                 
                  <div class="parks_item_surface">
                  <img src="/static/style/img/area.png" class="parks_item_surface_img"/>  
                  <div class="parks_item_surface_p">${park.surface}</div>
                  </div>

                  <div class="parks_item_voivodeship"> 
                  <img src="/static/style/img/map.png" class="parks_item_voivodeship_img"/> 
                  <div class="parks_item_voivodeship_p">${
                    park.voivodeship
                  }</div>
                  </div>
                  
                  
                  <a class="parks_item_button_txt" href="park/${
                    park.name
                  }" data-link><button class="parks_item_button" type='button'>Zobacz Więcej</button></a>
                  
                  <div class="parks_item_symbol">
                  <img class="parks_item_symbol_img" src="${
                    park.symbol.replace("/thumb/", "/").split(".svg")[0] +
                    ".svg"
                  }" />
                  </div>
                 
                  
                  </div>
                  
              `);
      });
      parks.sort((a, b) => {
        return (
          parseFloat(b.surface.replace(" km2", "").replace(",", ".")) -
          parseFloat(a.surface.replace(" km2", "").replace(",", "."))
        );
      });
      let parkChart = "";
      parks.forEach((park) => {
        const value = parseFloat(
          park.surface.replace(" km2", "").replace(",", ".")
        );
        parkChart += `
              <div class="chart_label">${park.name} Park Narodowy</div>
              <div class="chart_bar">
              <div class="chart_bar_value" style="--value: ${value}">.</div>
              <div class="chart_txt">${value} km2</div>
              </div>
              
                    `;
      });

      return `
          <div class="parks">${parkLinks}</div>
        <div class="chart">
        <h2 class="chart_title">Powierzchnia parków</h2>
        ${parkChart}
        </div>
          `;
    } catch (error) {
      console.log(error);
    }
  }
}
