// NodeJS Core
import chromium from 'chrome-aws-lambda';
import landStore from "../../../../stores/LandStore";
import fs from "fs";

export default async function generateUserImage(req, res) {
    const landName = req.query.landname.replace('.jpg', '');

    const land = await landStore.getLand(landName);

    // Get the Background Image
    const background = fs.readFileSync('./public/background/mine_night.jpeg');
    const base64Background = Buffer.from(background).toString('base64');
    const base64BackgroundURL = 'data:image/jpeg;base64,' + base64Background;

    // Instantiate the Chromium Browser
    const browser = await chromium.puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
    });

    // Generate the Page
    const page = await browser.newPage();
    await page.setViewport({width: 1128, height: 450});
    await page.setContent(`<html lang="en">
            <body>
                <div style="position: relative; width: 100%; height: 100%">
                    <img src="${base64BackgroundURL}" alt="Background" width="1128px" style="position: absolute; top: 0; left: 0"/>
                    <div style="position: absolute; height: 100%; width: 100%; top: 0; left: 0; background: linear-gradient(117deg, rgba(187,247,208,0.1) 0%, rgba(34,197,94,0.2) 51%, rgba(187,247,208,0.1) 100%);" />
                    <div style="position: absolute; width: 100%; height: 100%; text-align: center; top: -100px;">
                        <h1 style="font-weight: bold; font-size: 10rem; text-transform: uppercase; color: white; text-shadow: 2px 2px 10px rgba(0, 0, 0, .5);">
                            ${land.name}
                        </h1>
                    </div>
                    <div style="position: absolute; height: 100%; width: 100%; display: flex; align-items: flex-end; justify-content: center;">
                        <div style="width: 175px">
                            <img src=${`https://visage.surgeplay.com/bust/175/${land.members[2]?.uuid}`} alt="User" onError="this.style.display='none'" />
                        </div>
                        <div style="width: 200px">
                            <img src=${`https://visage.surgeplay.com/bust/200/${land.members[0]?.uuid}`} alt="User" onError="this.style.display='none'" />
                        </div>
                        <img src="https://visage.surgeplay.com/front/250/${land.owner.uuid}" alt="User" onError="this.style.display='none'" />
                        <div style="width: 200px">
                            <img src=${`https://visage.surgeplay.com/bust/190/${land.members[1]?.uuid}`} alt="User" onError="this.style.display='none'" style="transform: scaleX(-1)" />
                        </div>
                        <div style="width: 175px">
                            <img src=${`https://visage.surgeplay.com/bust/175/${land.members[3]?.uuid}`} alt="User" onError="this.style.display='none'" style="transform: scaleX(-1)" />
                        </div>
                    </div>
                </div>
            </body>
            <style>
                html, body {
                    height: 100%;
                }
            
                body {
                    align-items: center;
                    display: flex;
                    height: 450px;
                    justify-content: center;
                    margin: 0;
                    width: 1128px;
                    background-color: #16181C;
                }
                * {
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                    font-weight: 600;
                    color: #cbcbcb;
                }
            </style>
        </html>`);

    const screenShotBuffer = await page.screenshot();
    res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": Buffer.byteLength(screenShotBuffer),
    })
    res.end(screenShotBuffer);
}
