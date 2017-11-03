export * from "./Oni"

import * as assert from "assert"
import { Oni } from "./Oni"

export const runInProcTest = (testName: string, testPath: string, timeout: number = 5000) => {

    describe(testName, () => {
        let oni: Oni

        beforeEach(async () => {
            oni = new Oni()
            return oni.start()
        })

        afterEach(async () => {
            return oni.close()
        })

        it("test: " + testName + "|" + testPath, async () => {
            await oni.client.waitForExist(".editor", timeout)
            const text = await oni.client.getText(".editor")
            assert(text && text.length > 0, "Validate editor element is present")

            console.log("Test path: " + testPath) // tslint:disable-line

            oni.client.execute("Oni.automation.runTest('" + testPath + "')")

            console.log("Waiting for result...") // tslint:disable-line
            await oni.client.waitForExist(".automated-test-result", 30000)
            const resultText = await oni.client.getText(".automated-test-result")
            console.log("Got result: " + resultText) // tslint:disable-line

            const result = JSON.parse(resultText)
            assert.ok(result.passed)
        })
    })
}
