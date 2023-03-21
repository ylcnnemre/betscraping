import { Builder, By, until } from "selenium-webdriver"
import "chromedriver"

interface IrowObject {
    teamNames: string,
    league: string,
    date: string
    guess: string,
    oddValue: number
}



const getBetValue = async () => {

    try {
        const driver = new Builder().forBrowser("chrome").build()

        await driver.get("https://www.olbg.com/betting-tips/Football/1")
        await driver.manage().window().maximize()
        await driver.sleep(5000)
        let container = await driver.wait(until.elementLocated(By.xpath('/html/body/div[1]/div/section/div[3]/div/div[4]/div/table/tbody')), 500)


        let matchRow = await container.findElements(By.css("tr"))
        console.log("matchroww ===>", matchRow.length)

        let finalResult: Array<Partial<IrowObject>> = []

        for (let [index, value] of matchRow.entries()) {
            let tdelements = await value.findElements(By.css("td"))
            /*  tdelements= tdelements.slice(1).filter((el,indx)=>  indx===1 || indx ===2 || indx===3   ) */


            let rowObject: Partial<IrowObject> = {}
            for (let [key, item] of tdelements.entries()) {

                if (key === 1) {
                    var teamNames = await item.findElement(By.className("event-name"))
                    let league = await item.findElement(By.className("event-league-name"))
                    let date = await item.findElement(By.className("event-date"))

                    rowObject["teamNames"] = await teamNames.getText()
                    rowObject["league"] = await league.getText()
                    rowObject["date"] = await date.getText()
                }
                else if (key === 2) {
                    let guess = await item.getText()
                    let teams = rowObject["teamNames"]?.split("v").map(el => el.trim())

                    if (teams?.includes(guess)) {
                        teams?.map((el, index) => {

                            if(el===guess)
                            {

                                if(index===0)
                                {
                                    rowObject["guess"] = "ms1"
                                }
                                else {
                                    rowObject["guess"] = "ms2"
                                }

                            }

                        })

                    }

                    else{
                         rowObject["guess"]="msX"
                    }



                    
                }
                else if (key === 3) {
                    let oddValue = await item.getText()
                    rowObject["oddValue"] = parseFloat(oddValue)
                }

            }
            console.log("roww ===>", rowObject)
            finalResult.push(rowObject)

        }


        return finalResult

    }
    catch (err) {
        console.log("errr ===>",err)
        throw err

    }


}

export {
    getBetValue
}