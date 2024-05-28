import { Builder, By, Key } from "selenium-webdriver";
import "dotenv/config";

console.log(process.env.LT_USERNAME);

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
describe("Add another todo tests", function () {
  let driver;
  const USERNAME = process.env.LT_USERNAME;
  const KEY = process.env.LT_ACCESS_KEY;
  const GRID_HOST = "hub.lambdatest.com/wd/hub";

  const gridUrl = "https://" + USERNAME + ":" + KEY + "@" + GRID_HOST;

  beforeEach(function () {
    driver = new Builder()
      .usingServer(gridUrl)
      .withCapabilities(capabilities)
      .build();
  });

  afterEach(async function () {
    await driver.quit();
  });

  // it block
  it("Successfully add another a todo to application", async function () {
    //Lunch the browser

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
  });

  //  // it block
  it("Add a new test for reporting", async function () {
    // Lunch the browser

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
  });
});
