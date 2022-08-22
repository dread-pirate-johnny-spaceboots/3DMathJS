import test from 'ava'
import { Vector3, Vector4, Point3 } from './Vector'
import {run} from './TestRunner'
import { Matrix3 } from './Matrix'


// TODO: refactor older tests to use testrunner.run


/** Vector3 Tests --------------------------------------------------------------------------------------------- */
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
        
        if (v3.size == result) {
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

test('Can compute vector3 outer product', t => {
    const tests = [
        [new Vector3(1, 2, 3), new Vector3(4,5,6), new Matrix3(4,5,6, 8,10,12, 12,15,18)]
    ]

    run(
        tests,
        test => {
            const m = Vector3.Outer(test[0], test[1])
            return m.data[0][0] === test[2].data[0][0] &&
                   m.data[0][1] === test[2].data[0][1] &&
                   m.data[0][2] === test[2].data[0][2] &&
                   
                   m.data[1][0] === test[2].data[1][0] &&
                   m.data[1][1] === test[2].data[1][1] &&
                   m.data[1][2] === test[2].data[1][2] &&

                   m.data[2][0] === test[2].data[2][0] &&
                   m.data[2][1] === test[2].data[2][1] &&
                   m.data[2][2] === test[2].data[2][2]
        }
    ) && t.pass()
})

test('Can compute vector3 scaler triple product', t => {
    const tests = [
        [new Vector3(1, 2, 3), new Vector3(4, 5, 6), new Vector3(7, 8, 9), 0],
        [new Vector3(11, 2, 31), new Vector3(4, 5, 6), new Vector3(7, 8, 9), -114]
    ]

    run (
        tests,
        test => Vector3.TripleScaler(test[0], test[1], test[2]) === test[3],
        test => `Failed to compute vector3 scaler triple product`
    ) && t.pass()
})

test('Can project vector3 onto another vector3', t => {
    const tests = [
        [new Vector3(1,2,3), new Vector3(4,5,6), new Vector3(16/7, 32/7, 48/7)]
    ]

    run(
        tests,
        test => {
            const v3 = test[0].project(test[1])
            return v3.x === test[2].x && v3.y === test[2].y && v3.z === test[2].z 
        },
        test => `Failed to project vector ${test[1]} onto ${test[0]}`
    ) && t.pass()
})

test('Can orthogonalize an array of vector3s', t => {
    const tests = [
        [ 
            [new Vector3(1, 0, 0), new Vector3(1, 2, 0), new Vector3(0, 2, 2) ], // input
            [new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 0, 1) ]  // result
        ]
    ]

    run(
        tests,
        test => {
            const vectors = Vector3.Orthogonalize(test[0])
            return test[1][0].equal(vectors[0]) && test[1][1].equal(vectors[1]) && test[1][2].equal(vectors[2])
        },
        test => `Failed to orthoganalize array of vectors`
    ) && t.pass()
})

//test('Can get the determinant of a ')

/** Vector4 Tests --------------------------------------------------------------------------------------------- */
test('Can compute the dot product of a 4D vector', t => {
    const tests = [
        [new Vector4(1,2,3,4), new Vector4(5,6,7,8), 70]
    ]

    run(
        tests,
        test => {
            const dot = Vector4.Dot(test[0], test[1])
            return dot === test[2]
        },
        test => `Failed to compute vector3 dot product`
    ) && t.pass()
})

/** Point3 Tests --------------------------------------------------------------------------------------------- */
/*
test('Can get distance of point from line', t => {
    const tests = [
        [new Point3(4,2,1), new Point3(8, 4, 2), new Vector3(2, 2, 2), 0]
    ]

    run(
        tests,
        test => {
            console.log(test[0].distanceFromLine(test[1], test[2]))
            return test[0].distanceFromLine(test[1], test[2]) === test[3]
        },
        test => `Failed to calculate distance of point from line`
    ) && t.pass()
})
*/