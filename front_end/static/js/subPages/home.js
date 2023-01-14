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
                  <div>
                  <h3>
                  <a href="park/${park.name}" data-link> ${park.name} </a>
                  </h3>  
                  <img src="${park.photo}" alt="${park.name} Zjęcie">
                  <br/>
                  <img src="${park.symbol}" alt="${park.name} symbol">
                    <p>Powierzchnia: ${park.surface}</p>
                    <p>Rok Założenia: ${park.year}</p>
                    <p>Województwo: ${park.voivodeship}</p>
                    <p>opis : ${park.desc}</p>
                  </div>
              `;
            });
          return `${parkLinks}`;
        }catch(error){
            console.log(error);
        };
    
    }
}