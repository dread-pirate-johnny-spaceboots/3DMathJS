import test from 'ava'
import { run } from './TestRunner'
import { Matrix3, Matrix2, Matrix4 } from './Matrix'

/** Matrix2 Tests --------------------------------------------------------------------------------------------- */
test('Can get the determinant of a 2D matrix', t => {
    const tests = [
        [new Matrix2(1, 5, 6, 0), -30]
    ]

    run(
        tests,
        test => {
            return test[0].determinant() === test[1]
        },
        test => `Failed to get determinant of 2D matrix ${test[0]}`
    ) && t.pass()
})

/** Matrix3 Tests --------------------------------------------------------------------------------------------- */
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

test('Can invert a 3D matrix', t => {
    const tests = [
        [new Matrix3(1, 2, 3, 0, 1, 5, 5, 6, 0), new Matrix3(-6, 18/5, 1.4000000000000001, 5, -3, -1, -1, 4/5, 1/5)]
    ]

    run(
        tests,
        test => {
            const m = test[0].invert()
            return m.equal(test[1])
        },
        test => `Failed to invert 3D matrix ${JSON.stringify(test[0].data)}`
    ) && t.pass()
})

test('Can tell if two 3D matricies are equal', t => {
    const tests = [
        [new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9), new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9), 1],
        [new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9), new Matrix3(-1, -2, -3, -4, -5, -6, -7, -8, -9), 0]
    ]

    run(
        tests,
        test => {
            return test[0].equal(test[1]) == test[2]
        },
        test => `Failed to determine equality of two 3D matricies: ${JSON.stringify(test[0].data)} & ${JSON.stringify(test[1].data)}`
    ) && t.pass()
})

/** Matrix4 Tests --------------------------------------------------------------------------------------------- */
test('Can tell if two 4D matricies are equal', t => {
    const tests = [
        [new Matrix4(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16), new Matrix4(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16), 1],
        [new Matrix4(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16), new Matrix4(-1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0), 0],
    ]

    run(
        tests,
        test => {
            return test[0].equal(test[1]) == test[2]
        },
        test => `Failed to determine equality of two 4D matricies: ${JSON.stringify(test[0].data)} & ${JSON.stringify(test[1].data)}`
    ) && t.pass()
})

test('Can add two 4D matricies', t => {
    const tests = [
        [new Matrix4(1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2), new Matrix4(1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2), new Matrix4(2,4,2,4,2,4,2,4,2,4,2,4,2,4,2,4,2)],
        [new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16), new Matrix4(17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32), new Matrix4(18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48)],
    ]

    run(
        tests, 
        test => {
            const m = test[0].add(test[1])
            return m.equal(test[2])
        }, 
        test => `Failed to add 4D matricies: ${JSON.stringify(test[0].data)} & ${JSON.stringify(test[1].data)}`
    ) && t.pass()
})

test('Can subtract two 4D matricies', t => {
    const tests = [
        [new Matrix4(1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2), new Matrix4(1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2), new Matrix4(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)],
        [new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16), new Matrix4(17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32), new Matrix4(-16,-16,-16,-16,-16,-16,-16,-16,-16,-16,-16,-16,-16,-16,-16,-16,-16)],
    ]

    run(
        tests, 
        test => {
            const m = test[0].subtract(test[1])
            return m.equal(test[2])
        }, 
        test => `Failed to subtract 4D matricies: ${JSON.stringify(test[0].data)} & ${JSON.stringify(test[1].data)}`
    ) && t.pass()
})

test('Can scale a 4D matrix', t => {
    const tests = [
        [new Matrix4(1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1), 4, new Matrix4(4, 8, 4, 8, 4, 8, 4, 8, 4, 8, 4, 8, 4, 8, 4, 8, 4)]
    ]

    run(
        tests, 
        test => {
            const m = test[0].scale(test[1])
            
            return m.equal(test[2])
        }, 
        test => `Failed to scale a 4D matrix: ${JSON.stringify(test[0])} by scaler value ${JSON.stringify[1]}`
    ) && t.pass()
})

test('Can multiply 4D matricies', t=> {
    const tests = [
        [new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16), new Matrix4(17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32), new Matrix4(250,260,270,280,618,644,670,696,986,1028,1070,1112,1354,1412,1470,1528)],
    ]

    run(
        tests,
        test => {
            const matrix = test[0].multiply(test[1])
            return matrix.equal(test[2])
        },
        test => `Failed to multiply 4D matricies`
    ) && t.pass()
})

test('Can get the determinant of a 4D matrix', t => {
    const tests = [
        [new Matrix4(1,3,5,9,1,3,1,7,4,3,9,7,5,2,0,9), -376]
    ]

    run(
        tests,
        test => {
            return test[0].determinant() === test[1]
        }
    ) && t.pass()
})

test('Can inverse a 4D matrix', t => {
    const tests = [
        [new Matrix4(
            1,1,1,0,
            0,3,1,2,
            2,3,1,0,
            1,0,2,1
        ), new Matrix4(
            -3,-.5,1.5,
            1,1,.25,-.25,
            -.5,3,.25,-1.25,
            -.5,-3,0,1,1
        )]
    ]

    run(
        tests,
        test => {
            return test[0].invert().equal(test[1])
        },
        test => `Failed to invert 4D matrix`
    ) && t.pass()
})