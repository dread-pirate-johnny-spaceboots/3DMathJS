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

test('Can multiply matricies', t => {
    const tests = [[
        new Matrix3(1, 2, 1, 2, 1, 2, 1, 2, 1), 
        new Matrix3(1, 2, 4, 6, 3, 2, 6, -2, .66), 
        new Matrix3(19, 6, 8.66, 20, 3, 11.32, 19, 6, 8.66)
    ], /*[
        // another test case
 ]*/]

    run(
        tests,
        test => {
            const matrix = test[0].multiply(test[1])
            return matrix.data[0][0] == test[2].data[0][0] &&
                   matrix.data[0][1] == test[2].data[0][1] &&
                   matrix.data[0][2] == test[2].data[0][2] &&
                   
                   matrix.data[1][0] == test[2].data[1][0] &&
                   matrix.data[1][1] == test[2].data[1][1] &&
                   matrix.data[1][2] == test[2].data[1][2] &&

                   matrix.data[2][0] == test[2].data[2][0] &&
                   matrix.data[2][1] == test[2].data[2][1] &&
                   matrix.data[2][2] == test[2].data[2][2]
        },
        test => ``
    ) && t.pass()
})

test('Get determinant of matrix', t => {
    const tests = [
        [new Matrix3(12, 22, 23, 4, 5, 6, 7, 8, 9 ), 27],
        [new Matrix3(1,2,3,4,5,6,7,8,9), 0]
    ]

    run(
        tests,
        test => {
            return test[0].determinant() === test[1]
        },
        test => `Failed to compute determinant of matrix ${text[0]}`
    ) && t.pass()
})