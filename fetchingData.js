const cheerio = require("cheerio");
const fetch = require("node-fetch");
const fs = require('fs');

const getParkData = async () => {
  try {
    const response = await fetch(
      "http://localhost:8010/proxy/wiki/Parki_narodowe_w_Polsce"
    );
    const body = await response.text();
    const $ = cheerio.load(body);
    

    const parks = $(".wikitable tbody tr")
      .map((i, el) => {
        const $el = $(el);
        return {
          name: $el.find("td").eq(1).text().trim(),
          symbol: $el.find("td").eq(2).text().trim(),
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
    
    const json = JSON.stringify(parks);
    console.log(parks);
    fs.writeFileSync('parks.json', json);
  } catch (error) {
    console.log(error);
  }
}
getParkData();
