const cheerio = require("cheerio");
const fetch = require("node-fetch");
const fs = require('fs');

const getParkData = async () => {
  try {
    let response = await fetch(
      "http://localhost:8010/proxy/wiki/Parki_narodowe_w_Polsce"
    );
    let body = await response.text();
    let $ = cheerio.load(body);
    

    let parks = $(".wikitable tbody tr")
      .map((i, el) => {
        const $el = $(el);
        return {
          name: $el.find("td").eq(1).text().trim(),
          photo:  $el.find("td img").eq(0).attr('src'),
          symbol: $el.find("td img").eq(1).attr('src'),
          year: $el.find("td").eq(3).text().trim(),
          surface: $el.find("td").eq(4).text().trim(),
          surface_lagging: $el.find("td").eq(5).text().trim(),
          seat: $el.find("td").eq(6).text().trim().trim(),
          mesoregion: $el.find("td").eq(7).text().trim(),
          voivodeship: $el.find("td").eq(8).text().trim(),
        };
      })
      .get();
    parks.shift();

    for(let i=0 ; i<parks.length; i++){
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (parks[i].name.search(/\s/) !== -1) {
        response = await fetch(
          `http://localhost:8010/proxy/wiki/Park_Narodowy_${parks[i].name}`
        );
      } else {
        response = await fetch(
          `http://localhost:8010/proxy/wiki/${parks[i].name}_Park_Narodowy`
        );
      }
 if(i===18){
  response = await fetch(
    `http://localhost:8010/proxy/wiki/Tatrzański_Park_Narodowy_(Polska)`
  );

 }
      body = await response.text();
      $ = cheerio.load(body);
  
      parks[i].desc = $('#mw-content-text > div > p').slice(0, 1).find('sup').remove().end().text().trim();
      parks[i].his = $('#mw-content-text > div > h2:contains("Historia")').nextUntil('h2').find('sup').remove().end().text().trim();
    }
console.log(parks);

        
        
    


    const json = JSON.stringify(parks);
 
    fs.writeFileSync('parks.json', json);
  } catch (error) {
    console.log(error);
  }
}
getParkData();
