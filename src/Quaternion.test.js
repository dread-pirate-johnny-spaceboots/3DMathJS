import test from "ava"
import { Quaternion } from './Quaternion'
import { run } from './TestRunner'

test('Can multiply quaternions', t => {
    const tests = [
       [new Quaternion(1,2,3,4), new Quaternion(5,6,7,8), new Quaternion(24, 48, 48, -6)] 
    ]

    run(
        tests,
        test => {
            return test[0].multiply(test[1]).equal(test[2])
        },
        test => `Failed to multiply quaternions`
    ) && t.pass()
})

test('Can add quaternions', t => {
    const tests = [
        [new Quaternion(1,2,3,4), new Quaternion(5,6,7,8), new Quaternion(6, 8, 10, 12)] 
    ]

    run(
        tests,
        test => {
            return test[0].add(test[1]).equal(test[2])
        },
        test => `Failed to add quaternions`
    ) && t.pass()
})

test('Can subtract quaternions', t => {
    const tests = [
        [new Quaternion(1,12,32,42), new Quaternion(5.5,16,27,82), new Quaternion(-4.5,-4, 5,-40)] 
    ]

    run(
        tests,
        test => {
            return test[0].subtract(test[1]).equal(test[2])
        },
        test => `Failed to subtract quaternions`
    ) && t.pass()
})

test('Can get the size/magnitude of a quaternion', t => {
    const tests = [
        [new Quaternion(1,2,3,4), 5.477225575051661]
    ]

    run(
        tests,
        test => {
            return test[0].size() == test[1]
        },
        test => `Failed to calculate size of quaternion`
    ) && t.pass()
})

test('Can get the conjugate of a quaternion', t => {
    const tests = [
        [new Quaternion(1,2,3,4), new Quaternion(-1,-2,-3,4)]
    ]

    run(
        tests,
        test => {
            return test[0].conjugate().equal(test[1])
        },
        test => `Failed to calculate conjugate of quaternion`
    ) && t.pass()
})

test('Can invert a quaternion', t => {
    const tests = [
        [new Quaternion(1,2,3,4), new Quaternion(-0.03333333333333333, -0.06666666666666667, -0.1, 0.13333333333333333)]
    ]

    run(
        tests,
        test => {
            return test[0].invert().equal(test[1])
        },
        test => `Failed to calculate conjugate of quaternion`
    ) && t.pass()
})

test('Can get the versor of a quaternion', t => {
    const tests = [
        [new Quaternion(1,2,3,4), new Quaternion(0.18257418583505536, 0.3651483716701107, 0.5477225575051661, 0.7302967433402214)],
        [new Quaternion(0,1,0,1), new Quaternion(0, 0.7071067811865475, 0, 0.7071067811865475)]
    ]

    run(
        tests,
        test => {
            return test[0].versor().equal(test[1])
        },
        test => `Failed to calculate versor of quaternion`
    ) && t.pass()
})

