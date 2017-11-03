import * as assert from "assert"
import * as path from "path"

import { runInProcTest } from "./common"

const CiTests = [
    "AutoCompletionTest",
    "BasicEditingTest",
    "QuickOpenTest",
]

describe("ci tests", function() { // tslint:disable-line only-arrow-functions

    CiTests.forEach((test) => {
        const testPath = path.join(__dirname, "ci", test + ".js")
        const normalizedTestPath = testPath.split("\\").join("/")

        runInProcTest(test, normalizedTestPath)
    })
})
