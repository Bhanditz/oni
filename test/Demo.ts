
import * as assert from "assert"
import * as path from "path"

import { Oni, runInProcTest } from "./common"

const LongTimeout = 60000

describe("Demo", function() { // tslint:disable-line only-arrow-functions
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

    const testPath = path.join(__dirname, "demo", "HeroDemo.js")
    const normalizedTestPath = testPath.split("\\").join("/")
    runInProcTest(oni, "demo", testPath, LongTimeout)
})
