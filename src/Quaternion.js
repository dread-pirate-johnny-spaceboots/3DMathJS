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

    getVector3() {
        return new Vector3(this.x, this.y, this.z)
    }

    getVector4() {
        return new Vector4(this.x, this.y, this.z, this.w)
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
}

export {
    Quaternion
}