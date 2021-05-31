import test from 'ava'
import { Vector3 } from './Vector'
import {run} from './TestRunner'


// TODO: refactor to use testrunner.run

test('Can scale vector3 by scaler value', t => {
    const tests = [
        [new Vector3(1,2,3), 3, [3, 6, 9]],
        [new Vector3(2,4,8), 1/2, [1,2,4]]
    ]
    const results = []
    const failed = []

    for(const test of tests) {
        let [v3, scaler, result] = test
        v3 = v3.scale(scaler)
        if (v3.x === result[0] && v3.y === result[1] && v3.z === result[2]) {
            results.push(true)
        } else {
            failed.push(test)
        }
    }

    if (tests.length === results.length) {
        t.pass()
    } else {
        for (const error of failed) {
            console.error(`Failed to scale vector [${error[0].x}, ${error[0].y}, ${error[0].z}]`)
        }
    }
})

test('Can negate a vector3', t => {
    let v3 = new Vector3(-5.1,6,7.2756483)
    v3 = v3.negate()

    if (v3.x === 5.1 && v3.y === -6 && v3.z === -7.2756483) {
        t.pass()
    }
})

test('Can get the size/magnitude of a vector3', t => {
    const tests = [
        [new Vector3(1,2,3), 3.7416573867739413],
        [new Vector3(5,6,7), 10.488088481701515],
        [new Vector3(7, 16.3, 21.2), 27.642901439610135]
    ]
    const results = []
    const failed = []

    for(const test of tests) {
        const [v3, result] = test
        
        if (v3.size() == result) {
            results.push(true)
        } else {
            failed.push(test)
        }
    }

    if (tests.length === results.length) {
        t.pass()
    } else {
        for (const error of failed) {
            console.error(`Failed to compute size for [${error[0].x}, ${error[0].y}, ${error[0].z}]`)
        }
    }
})

test('Can normalize a vector3', t => {
    const tests = [
        [new Vector3(1,2,3), [0.2672612419124244, 0.5345224838248488, 0.8017837257372732]]
    ]
    const results = []
    const failed = []

    for(const test of tests) {
        let [v3, result] = test
        v3 = v3.normalize()

        if (v3.x === result[0] && v3.y === result[1] && v3.z === result[2]) {
            results.push(true)
        } else {
            failed.push(test)
        }
    }

    if (tests.length === results.length) {
        t.pass()
    } else {
        for (const error of failed) {
            console.error(`Failed to normalize [${error[0].x}, ${error[0].y}, ${error[0].z}]`)
        }
    }
})

test('Can subtract vector3 from vector3', t => {
    const tests = [
        [new Vector3(1,2,3), new Vector3(1,1,1), [0,1,2]]
    ]
    const results = []
    const failed = []

    for(const test of tests) {
        let [v3a, v3b, result] = test
        const v3c = v3a.subtract(v3b)
        if (v3c.x === result[0] && v3c.y === result[1] && v3c.z === result[2]) {
            results.push(true)
        } else {
            failed.push(test)
        }
    }

    if (tests.length === results.length) {
        t.pass()
    } else {
        for (const error of failed) {
            console.error(`Failed to subtract [${error[0].x}, ${error[0].y}, ${error[0].z}]`)
        }
    }
})

test('Can add vector3 to vector3', t => {
    const tests = [
        [new Vector3(1,2,3), new Vector3(1,1,1), [2,3,4]]
    ]
    const results = []
    const failed = []

    for(const test of tests) {
        let [v3a, v3b, result] = test
        const v3c = v3a.add(v3b)
        if (v3c.x === result[0] && v3c.y === result[1] && v3c.z === result[2]) {
            results.push(true)
        } else {
            failed.push(test)
        }
    }

    if (tests.length === results.length) {
        t.pass()
    } else {
        for (const error of failed) {
            console.error(`Failed to add [${error[0].x}, ${error[0].y}, ${error[0].z}]`)
        }
    }
})

test('Can compute vector3 dot product', t => {
    const tests = [
        [new Vector3(1,2,3), new Vector3(4,5,6), 32]
    ]

    run(
        tests,
        test => {
            const dot = Vector3.Dot(test[0], test[1])
            return dot === test[2]
        },
        test => `Failed to compute vector3 dot product`
    ) && t.pass()
})

test('Can compute vector3 cross product', t => {
    const tests = [
        [new Vector3(3, 4, 5), new Vector3(6, 7, 8), new Vector3(-3, 6, -3)]
    ]

    run(
        tests,
        test => {
            const cross = Vector3.Cross(test[0], test[1])
            return cross.x === test[2].x && cross.y === test[2].y && cross.z === test[2].z
        },
        test => `Failed to compute vector3 cross product`
    ) && t.pass()
})