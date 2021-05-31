import test from 'ava'
import { run } from './TestRunner'
import { Matrix3 } from './Matrix'

test('Can add two 3D matricies', t => {
    const tests = [
        [new Matrix3(1, 2, 1, 2, 1, 2, 1, 2, 1), new Matrix3(1, 2, 1, 2, 1, 2, 1, 2, 1), [2,4,2,4,2,4,2,4,2]]
    ]

    run(
        tests, 
        test => {
            const m = test[0].add(test[1])
            const [v0, v1, v2] = m.data[0]
            const [v3, v4, v5] = m.data[1]
            const [v6, v7, v8] = m.data[2]
            const result = test[2]

            return v0 === result[0] && 
                   v1 === result[1] &&
                   v2 === result[2] && 
                   v3 === result[3] && 
                   v4 === result[4] && 
                   v5 === result[5] && 
                   v6 === result[6] && 
                   v7 === result[7] && 
                   v8 === result[8]
        }, 
        test => `Failed to add 3D matricies`
    ) && t.pass()
})

test('Can subtract two 3D matricies', t => {
    const tests = [
        [new Matrix3(1, 2, 1, 2, 1, 2, 1, 2, 1), new Matrix3(1, 2, 1, 2, 1, 2, 1, 2, 1), [0,0,0,0,0,0,0,0,0]]
    ]

    run(
        tests, 
        test => {
            const m = test[0].subtract(test[1])
            const [v0, v1, v2] = m.data[0]
            const [v3, v4, v5] = m.data[1]
            const [v6, v7, v8] = m.data[2]
            const result = test[2]

            return v0 === result[0] && 
                   v1 === result[1] &&
                   v2 === result[2] && 
                   v3 === result[3] && 
                   v4 === result[4] && 
                   v5 === result[5] && 
                   v6 === result[6] && 
                   v7 === result[7] && 
                   v8 === result[8]
        }, 
        test => `Failed to add 3D matricies`
    ) && t.pass()
})

test('Can scale a 3D matrix', t => {
    const tests = [
        [new Matrix3(1, 2, 1, 2, 1, 2, 1, 2, 1), 4, [4, 8, 4, 8, 4, 8, 4, 8, 4]]
    ]

    run(
        tests, 
        test => {
            const m = test[0].scale(test[1])
            const [v0, v1, v2] = m.data[0]
            const [v3, v4, v5] = m.data[1]
            const [v6, v7, v8] = m.data[2]
            const result = test[2]

            return v0 === result[0] && 
                   v1 === result[1] &&
                   v2 === result[2] && 
                   v3 === result[3] && 
                   v4 === result[4] && 
                   v5 === result[5] && 
                   v6 === result[6] && 
                   v7 === result[7] && 
                   v8 === result[8]
        }, 
        test => `Failed to scale a 3D matrix`
    ) && t.pass()
})