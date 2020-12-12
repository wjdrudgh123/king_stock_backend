import { Builder, By, until, Key } from "selenium-webdriver";
import chrome, { ServiceBuilder } from "selenium-webdriver/chrome";
import path from "path";
import { chkAdmin } from "../middleware";
import Issues from "../models/Issues";
import Companies from "../models/Companies";
import routes from "../routes";

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

const searchingCompany = async (companies) => {
  // 기업들 이름 받아와서 검색 후 저가, 고가, 시가, 거래량, 대금, 시총, 등락률(+, -)
  console.log("START SEARCHING COMPANY");

  try {
    let returnData = [];
    let companyData = {};
    for (let i = 0; i < companies.length; i++) {
      const driver = await init();
      await driver.get("https://finance.naver.com/sise/");
      await driver.manage().window().maximize();
      await driver.manage().setTimeouts({ implicit: 5000 });
      const inputField = await driver.findElement(
        By.xpath('//*[@id="stock_items"]')
      );
      //inputField.sendKeys(companies[i], Key.RETURN);
      inputField.sendKeys(companies[i]);
      await driver.actions().click(inputField).perform();
      await driver.manage().setTimeouts({ implicit: 5000 });
      await driver.actions().sendKeys(Key.ARROW_DOWN).perform();
      await driver.manage().setTimeouts({ implicit: 5000 });
      await driver.actions().sendKeys(Key.ARROW_DOWN).perform();
      await driver.manage().setTimeouts({ implicit: 5000 });
      await driver.actions().sendKeys(Key.RETURN).perform();
      await driver.manage().setTimeouts({ implicit: 5000 });
      // 바른손 같이 검색창에 두개 종목이 뜨는 경우가 있어서 검색어 쓰고 클릭 후 화살표 내린다음에 엔터치는 식으로
      await driver.wait(
        until.elementLocated(
          By.xpath("//*[@id='chart_area']/div[1]/div/p[1]/em/span[1]"),
          5000
        )
      ); // 로딩 됐나 확인 용
      const priceBtn = await driver.findElement(
        By.xpath('//*[@id="content"]/ul/li[2]/a')
      );
      await driver.actions().click(priceBtn).perform();
      await driver.manage().setTimeouts({ implicit: 5000 });
      const tmpNowPrice = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="_nowVal"]'), 5000)
      );
      const nowPrice = await tmpNowPrice.getText();
      const tradeRate = await (
        await driver.findElement(By.xpath('//*[@id="_quant"]'))
      ).getText();
      const tradePrice = await (
        await driver.findElement(By.xpath('//*[@id="_amount"]'))
      ).getText();
      // const numTradePrice = Number(tmpTradePrice.replace(/\,/g, "")) * 1000000;
      // const tradePrice = String(numTradePrice).replace(
      //   /\B(?=(\d{3})+(?!\d))/g,
      //   ","
      // );
      const startPrice = await (
        await driver.findElement(
          By.xpath(
            '//*[@id="content"]/div[2]/div[1]/table/tbody/tr[4]/td[2]/span'
          )
        )
      ).getText();
      const lowPrice = await (
        await driver.findElement(By.xpath('//*[@id="_low"]'))
      ).getText();
      const highPrice = await (
        await driver.findElement(By.xpath('//*[@id="_high"]'))
      ).getText();
      const tmpPlusOrMinus = await (
        await driver.findElement(By.xpath('//*[@id="_rate"]/span'))
      ).getText();
      let plusOrMinus = "minus";
      if (tmpPlusOrMinus.indexOf("+") !== -1) {
        //+면
        plusOrMinus = "plus";
      }

      companyData = {
        name: companies[i],
        startPrice,
        lowPrice,
        highPrice,
        nowPrice,
        tradeRate,
        tradePrice,
        plusOrMinus,
      };
      returnData.push(companyData);
      await driver.manage().setTimeouts({ implicit: 5000 });
      await driver.quit();
    }
    console.log(returnData);
    return returnData;
  } catch (e) {
    console.log(`Error on Searchin company: ${e}`);
  }
};

export const postSearch = async (req, res) => {
  const {
    body: { value },
  } = req;

  try {
    const issue = await Issues.findOne({
      name: value,
    });
    const temp = await searchingCompany(issue.companies);
    res.send(JSON.stringify({ companies: temp }));
  } catch (e) {
    console.log(`Error on Search Catalyst: ${e}`);
    res.send(JSON.stringify({ companies: [] }));
  }
};
