import test from "ava"
import { Matrix3 } from "./Matrix"
import { Quaternion } from './Quaternion'
import { run } from './TestRunner'
import { Vector3 } from "./Vector"

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

test('Can get sandwich product for a given vector3', t => {
    const tests = [
        [new Quaternion(0,1,0,1), new Vector3(-1,1,1), new Vector3(2,2,2)],
        [new Quaternion(2,32,7/8,1), new Vector3(8,11,1.6), new Vector3(-6661.375, 12343.778124999999, -1465.9750000000004)],
    ]

    run(
        tests,
        test => {
            return test[0].sandwich(test[1]).equal(test[2])
        },
        test => `Failed to calculate quaternion sandwich product for vector`
    ) && t.pass()
})

test('Get get rotation matrix from a quaternion', t => {
    const tests = [
        [new Quaternion(0,1,0,1), new Matrix3(0,0,1,0,1,0,-1,0,0)],
        [new Quaternion(2,32,7/8,1), new Matrix3(-0.9902890524239436,0.12260071314771262,0.065548896138381,0.12599954479933237,0.9907442530915712,0.05049692739549351,-0.05875123283514149, 0.05826568545633867,-0.9965708216372051)],
    ]

    run(
        tests,
        test => {
            return test[0].toRotationMatrix().equal(test[1])
        },
        test => `Failed to convert quaternion to rotation matrix`
    ) && t.pass()
})

test('Can create quaternion from rotation matrix', t => {
    const tests = [
        [new Matrix3(0,0,1,0,1,0,-1,0,0), new Quaternion(0,-0.7071067811865475,0,0.7071067811865475)]
    ]

    run(
        tests,
        test => {
            return Quaternion.FromRotationMatrix(test[0]).equal(test[1])
        },
        test => `Failed to create quaternion from rotation matrix`
    ) && t.pass()
})