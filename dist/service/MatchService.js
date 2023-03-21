"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBetValue = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
require("chromedriver");
const getBetValue = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const driver = new selenium_webdriver_1.Builder().forBrowser("chrome").build();
        yield driver.get("https://www.olbg.com/betting-tips/Football/1");
        yield driver.manage().window().maximize();
        yield driver.sleep(5000);
        let container = yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('/html/body/div[1]/div/section/div[3]/div/div[4]/div/table/tbody')), 500);
        let matchRow = yield container.findElements(selenium_webdriver_1.By.css("tr"));
        console.log("matchroww ===>", matchRow.length);
        let finalResult = [];
        for (let [index, value] of matchRow.entries()) {
            let tdelements = yield value.findElements(selenium_webdriver_1.By.css("td"));
            /*  tdelements= tdelements.slice(1).filter((el,indx)=>  indx===1 || indx ===2 || indx===3   ) */
            let rowObject = {};
            for (let [key, item] of tdelements.entries()) {
                if (key === 1) {
                    var teamNames = yield item.findElement(selenium_webdriver_1.By.className("event-name"));
                    let league = yield item.findElement(selenium_webdriver_1.By.className("event-league-name"));
                    let date = yield item.findElement(selenium_webdriver_1.By.className("event-date"));
                    rowObject["teamNames"] = yield teamNames.getText();
                    rowObject["league"] = yield league.getText();
                    rowObject["date"] = yield date.getText();
                }
                else if (key === 2) {
                    let guess = yield item.getText();
                    let teams = (_a = rowObject["teamNames"]) === null || _a === void 0 ? void 0 : _a.split("v").map(el => el.trim());
                    if (teams === null || teams === void 0 ? void 0 : teams.includes(guess)) {
                        teams === null || teams === void 0 ? void 0 : teams.map((el, index) => {
                            if (el === guess) {
                                if (index === 0) {
                                    rowObject["guess"] = "ms1";
                                }
                                else {
                                    rowObject["guess"] = "ms2";
                                }
                            }
                        });
                    }
                    else {
                        rowObject["guess"] = "msX";
                    }
                }
                else if (key === 3) {
                    let oddValue = yield item.getText();
                    rowObject["oddValue"] = parseFloat(oddValue);
                }
            }
            console.log("roww ===>", rowObject);
            finalResult.push(rowObject);
        }
        return finalResult;
    }
    catch (err) {
        console.log("errr ===>", err);
        throw err;
    }
});
exports.getBetValue = getBetValue;
