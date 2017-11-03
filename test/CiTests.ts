import * as assert from "assert"
import * as path from "path"

import { Oni, runInProcTest } from "./common"

const LongTimeout = 5000

const CiTests = [
    "AutoCompletionTest",
    "BasicEditingTest",
    "QuickOpenTest",
]

describe("ci tests", function() { // tslint:disable-line only-arrow-functions
    // Retry up to two times
    this.retries(2)

    let oni: Oni

    beforeEach(async () => {
        oni = new Oni()
        return oni.start()
    })

    afterEach(async () => {
        return oni.close()
    })

    CiTests.forEach((test) => {
        const testPath = path.join(__dirname, "ci", test + ".js")
        const normalizedTestPath = testPath.split("\\").join("/")

        runInProcTest(oni, test, normalizedTestPath)
    })
})
