import * as assert from "assert"
import * as path from "path"

import { runInProcTest } from "./common"

const LongTimeout = 60000

describe("Demo", function() { // tslint:disable-line only-arrow-functions
    // Retry up to two times
    this.retries(2)

    const testPath = path.join(__dirname, "demo", "HeroDemo.js")
    const normalizedTestPath = testPath.split("\\").join("/")
    runInProcTest("demo", testPath, LongTimeout)
})
