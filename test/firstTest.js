import { Builder, By, Key } from "selenium-webdriver";
// const { Builder, By, Key } = require("selenium-webdriver");
import assert from "assert";
// var should = require("chai").should();
import { should } from "chai";
should();

//Describe block
describe("Add todo tests", function () {
  // it block
  it("Successfully adds a todo to application", async function () {
    //Lunch the browser
    let driver = await new Builder().forBrowser("firefox").build();

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

    // clone the browser
    await driver.quit();
  });
});
