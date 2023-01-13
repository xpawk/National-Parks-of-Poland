const cheerio = require("cheerio");
const fetch = require("node-fetch");

async function getParkData() {
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
          seat: $el.find("td").eq(6).text().trim(),
          mesoregion: $el.find("td").eq(7).text().trim(),
          voivodeship: $el.find("td").eq(8).text().trim(),
        };
      })
      .get();
    parks.shift();

    console.log(parks[0]);
  } catch (error) {
    console.log(error);
  }
}

