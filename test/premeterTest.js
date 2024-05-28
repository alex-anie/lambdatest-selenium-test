import { Builder, By, Key } from "selenium-webdriver";
import "dotenv/config";

// console.log(process.env.LT_USERNAME);

// import assert from "assert";
import { should } from "chai";
should();

const capabilities = {
  browserName: "Chrome",
  browserVersion: "latest",
  "LT:Options": {
    platformName: "Windows 10",
    build: "Test Build",
    project: "Cloud Testing",
    w3c: true,
    plugin: "node_js-node_js",
  },
};

//Describe block
describe(`Successfully added another todo test`, function () {
  let driver;
  //username
  const USERNAME = process.env.LT_USERNAME;
  const KEY = process.env.LT_ACCESS_KEY;

  const GRID_HOST = "hub.lambdatest.com/wd/hub";

  const gridUrl = "https://" + USERNAME + ":" + KEY + "@" + GRID_HOST;

  const browsers = [
    { browser: "Chrome", bVersion: "93.0", os: "Windows 10" },
    { browser: "Firefox", bVersion: "91.0", os: "Windows 10" },
    { browser: "Firefox", bVersion: "90.0", os: "Windows 10" },
  ];

  browsers.forEach(({ browser, bVersion, os }) => {
    try {
      // it block
      it(`successfully adds a todo for browser ${browser}, ${bVersion}, ${os}`, async function () {
        capabilities["LT:Options"].platformName = os;
        capabilities["browserName"] = browser;
        capabilities["browserVersion"] = bVersion;

        capabilities.name = this.test.title;

        //Lunch the browser
        driver = new Builder()
          .usingServer(gridUrl)
          .withCapabilities(capabilities)
          .build();

        // Navigate to our application
        await driver.get("https://lambdatest.github.io/sample-todo-app/");

        //add a todo
        await driver
          .findElement(By.id("sampletodotext"))
          .sendKeys("Learn Selenium", Key.RETURN);

        //Asset
        let todoTest = await driver
          .findElement(By.xpath("//li[last()]"))
          .getText()
          .then(function (value) {
            return value;
          });
        // Assert Using Chia should
        todoTest.should.equal("Learn Selenium");
        driver.executeScript("lambda-status=passed");
        // await driver.quit();
      });
    } catch (err) {
      console.log("test failed with reason " + err);
      driver.executeScript("lambda-status=failed");
      driver.quit();
    }
  });
});
