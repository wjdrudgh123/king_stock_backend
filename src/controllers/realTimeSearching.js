import { Builder, By, until } from "selenium-webdriver";
import chrome, { ServiceBuilder } from "selenium-webdriver/chrome";
import RealTime from "../models/RealTime";
import path from "path";

/*
 * http://finance.daum.net/domestic
 * https://finance.naver.com/sise/
 */

let POPULAR_SEARCH = {};

const init = async () => {
  const driverPath = path.join(__dirname, "../../chromedriver");
  const serviceBuilder = new ServiceBuilder(driverPath);
  const options = new chrome.Options();
  options.addArguments(
    "headless",
    "disable-gpu",
    "no-sandbox",
    "disable-dev-shm-usage"
  );
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .setChromeService(serviceBuilder)
    .build();
  return driver;
};

const naverSearch = async () => {
  console.log("START NAVER REAL TIME SEARCHING");
  const driver = await init();
  await driver.get("https://finance.naver.com/sise/");
  await driver.manage().window().maximize();

  try {
    const layout = await driver.wait(
      until.elementLocated(By.xpath("//*[@id='popularItemList']")),
      10000
    );

    const layoutList = await layout.findElements(By.xpath("./li"));

    let naver = [];
    for (let i = 0; i < layoutList.length; i++) {
      const companyName = await (
        await layoutList[i].findElement(By.xpath("./a"))
      ).getText();

      naver.push(companyName);
    }
    console.log(naver);
    await RealTime.create({
      site: "naver",
      companies: naver,
    });
    console.log("END NAVER REAL TIME SEARCHING");
  } catch (e) {
    console.log(`Error for Searching RealTime Naver: ${e}`);
  }
  await driver.quit();
};

const daumSearch = async () => {
  console.log("START DAUM REAL TIME SEARCHING");
  const driver = await init();
  await driver.get("http://finance.daum.net/domestic");
  await driver.manage().window().maximize();
  try {
    const layout = await driver.wait(
      until.elementLocated(
        By.xpath("//*[@id='boxRightSidebar']/div[3]/div/div[1]/ul")
      ),
      10000
    );

    const layoutList = await layout.findElements(By.xpath("./li"));

    let daum = [];
    for (let i = 0; i < layoutList.length; i++) {
      const tmpCompanyName = await (
        await layoutList[i].findElement(By.xpath("./a"))
      ).getText();
      const companyName = await tmpCompanyName.split("\n");

      daum.push(companyName[1]);
    }
    await RealTime.create({
      site: "daum",
      companies: daum,
    });
    console.log("END DAUM REAL TIME SEARCHING");
  } catch (e) {
    console.log(`Error for Searching RealTime Daum: ${e}`);
  }
  await driver.quit();
};

export const realTimeSearch = async () => {
  await naverSearch();
  await daumSearch();
};

export const transferData = async (req, res) => {
  try {
    let naver = await RealTime.findOne({
      site: "naver",
    });
    let daum = await RealTime.findOne({
      site: "daum",
    });
    if (naver === null || daum === null) {
      await naverSearch();
      await daumSearch();
      naver = await RealTime.findOne({
        site: "naver",
      });
      daum = await RealTime.findOne({
        site: "daum",
      });
    }
    const realTime = {
      naver: naver.companies,
      daum: daum.companies,
    };
    res.send(JSON.stringify({ realtime: realTime }));
  } catch (e) {
    console.log(`Error on transferData RealTime : ${e}`);
    res.send(JSON.stringify({ realtime: {} }));
  }
};
