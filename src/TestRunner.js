const run = (tests, perform, formatFailureMessage) => {
    const passed = []
    const failed = []

    for (const test of tests) {
        const result = perform(test)

        if (result) {
            passed.push(test)
        } else {
            failed.push(test)
        }
    }

    if (passed.length === tests.length) {
        return true
    } else {
        for (const failure of failed) {
            console.error(formatFailureMessage(failure))
        }
        return false
    }
}

export {
    run
}