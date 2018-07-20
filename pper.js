const puppeteer = require('puppeteer');

let bookingUrl = 'https://www.staples.com/Blu-Ray-DVD-Players/cat_CL141768?icid=TVSTREAMINGSUPERCAT:LINKBOX2:TVSTREAMINGMEDIA3:DVDBLURAY::::';
(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(bookingUrl);
  await page.screenshot({path: 'image-staples.png', fullPage: true});
    //await page.waitForSelector("#results");
    // get hotel details
    let hotelData = await page.evaluate(() => {
        let hotels = [];
        // get the hotel elements
        let hotelsElms = document.querySelectorAll('div.gallery-table.ng-scope a');
        // get the hotel data
        console.log("hotelsElms.length");
        hotelsElms.forEach((hotelelement) => {
            let hotelJson = {};
            try {
              let lnk =hotelelement.getAttribute('href');
             //let re2 = /clothing|baby/;
              let re1 = new RegExp("blu");
            if(lnk.startsWith("/") && re1.test(lnk)){
              hotels.push(lnk);//
            }

            }  catch (ex){
              console.log(ex);
            }
            //hotels.push(hotelJson);
        });
        return hotels;
    });

    console.log(hotelData);
})();
