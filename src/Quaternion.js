import { Matrix3 } from "./Matrix"
import { Vector3, Vector4 } from "./Vector"

class Quaternion {
    constructor(x, y, z, w) {
        if (x instanceof Vector4) {
            this.x = x.x
            this.y = x.y
            this.z = x.z
            this.w = x.w
        } else if (x instanceof Vector3 && y != undefined) {
            this.x = x.x
            this.y = x.y
            this.z = x.z
            this.w = y
        } else if (x !== undefined) {
            this.x = x
            this.y = y
            this.z = z
            this.w = w
        } // otherwise left undefined, consumer assumed to set x/y/z/w
    }

    // Mike Day algo: https://d3cw3dd2w32x2b.cloudfront.net/wp-content/uploads/2015/01/matrix-to-quat.pdf
    static FromRotationMatrix(m3) {
        const m = m3.data
        const m00 = m[0][0]
        const m11 = m[1][1]
        const m22 = m[2][2]
        
        let q, t
        if (m22 < 0) {
            if (m00 > m11) {
                t = 1 + m00 - m11 - m22
                q = new Quaternion(t, m[0][1] + m[1][0], m[2][0] + m[0][2], m[1][2] - m[2][1])
            } else {
                t = 1 - m00 + m11 + m22
                q = new Quaternion(m[0][1] + m[1][0], t, m[1][2] + m[2][1], m[2][0] - m[0][2]) 
            }
        } else {
            if (m00 < -m11) {
                t = 1 - m00 - m11 + m22
                q = new Quaternion(m[2][0] + m[0][2], m[1][2] + m[2][1], t, m[0][1] - m[1][0])
            } else {
                t = 1 + m00 + m11 + m22
                q = new Quaternion(m[1][2] - m[2][1], m[2][0] - m[0][2], m[0][1] - m[1][0], t)
            }
        }

        return q.scale(0.5 / Math.sqrt(t))
    }

    getVector3() {
        return new Vector3(this.x, this.y, this.z)
    }

    getVector4() {
        return new Vector4(this.x, this.y, this.z, this.w)
    }

    scale(scaler) {
        return new Quaternion(this.x * scaler, this.y * scaler, this.z * scaler, this.w * scaler)
    }

    normalize() {
        return this.scale(1 / this.size())
    }

    equal(q) {
        return this.x === q.x && this.y === q.y && this.z === q.z && this.w === q.w
    }

    add(q2) {
        const q1 = this
        return new Quaternion(q1.x + q2.x, q1.y + q2.y, q1.z + q2.z, q1.w + q2.w)
    }

    subtract(q2) {
        const q1 = this
        return new Quaternion(q1.x - q2.x, q1.y - q2.y, q1.z - q2.z, q1.w - q2.w)
    }

    size() {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z + this.w*this.w)
    }

    conjugate() {
        return new Quaternion(-this.x, -this.y, -this.z, this.w)
    }

    versor() {
        const s = this.size()
        return new Quaternion(this.x / s, this.y / s, this.z / s, this.w / s)
    }

    invert() {
        const c = this.conjugate()
        const s2 = this.size()*this.size()

        return new Quaternion(c.x / s2, c.y / s2, c.z / s2, c.w / s2)
    }

    multiply(q2) {
        const v1 = new Vector3(this.x, this.y, this.z)
        const v2 = new Vector3(q2.x, q2.y, q2.z)
        const s1 = this.w
        const s2 = q2.w
        const v = Vector3.Cross(v1, v2).add(v2.scale(s1)).add(v1.scale(s2))
        
        return new Quaternion(v.x, v.y, v.z, s1 * s2 - Vector3.Dot(v1, v2))
    }

    sandwich(v3) {
       const vQ = this.getVector3()
       const vQ2 = vQ.x * vQ.x + vQ.y * vQ.y + vQ.z * vQ.z
       
       return v3.scale(this.w * this.w - vQ2)
                .add(vQ.scale(Vector3.Dot(v3, vQ)).scale(2))
                .add(Vector3.Cross(vQ, v3).scale(this.w * 2))        
    }

    rotate(v3) {
        return this.sandwich(v3)
    }

    toRotationMatrix() {
        const w = this.w
        const x = this.x
        const y = this.y
        const z = this.z
        
        const n  = w * w + x * x + y * y + z * z
        const s  = n === 0 ? 0 : 2 / n
        const wx = s * w * x 
        const wy = s * w * y 
        const wz = s * w * z
        const xx = s * x * x 
        const xy = s * x * y 
        const xz = s * x * z
        const yy = s * y * y 
        const yz = s * y * z 
        const zz = s * z * z
        
        return new Matrix3(
            1 - (yy + zz), xy - wz,       xz + wy,
            xy + wz,       1 - (xx + zz), yz - wx,
            xz - wy,       yz + wx,       1 - (xx + yy)
        )
    }
}

export {
    Quaternion
}