import { Matrix3 } from "./Matrix"

class Vector3 {
    constructor(x, y, z) {
        if (x instanceof Vector3 && y === undefined && z === undefined) {
            this.x = x.x
            this.y = x.y
            this.z = x.z
        } else {
            this.x = x
            this.y = y
            this.z = z
        }
    }

    static Dot(v3a, v3b) {
        return (v3a.x * v3b.x) + (v3a.y * v3b.y) + (v3a.z * v3b.z)
    }

    static Cross(v3a, v3b) {
        return new Vector3(
            v3a.y * v3b.z - v3a.z * v3b.y, 
            v3a.z * v3b.x - v3a.x * v3b.z,
            v3a.x * v3b.y - v3a.y * v3b.x
        )
    }

    static Outer(v3a, v3b) {
        return new Matrix3(
            v3a.x * v3b.x, v3a.x * v3b.y, v3a.x * v3b.z,
            v3a.y * v3b.x, v3a.y * v3b.y, v3a.y * v3b.z,
            v3a.z * v3b.x, v3a.z * v3b.y, v3a.z * v3b.z
        )
    }

    static TripleScaler(v3a, v3b, v3c) {
        return Vector3.Dot(v3c, Vector3.Cross(v3a, v3b))
    }

    // Gram-Schmidt algo
    static Orthogonalize(vectors) {
        const orthogVectors = []
        
        for (const v3 of vectors) {
            let orthogV3 = new Vector3(v3)
            for(const preOrthogV3 of orthogVectors) {
                orthogV3 = orthogV3.subtract(preOrthogV3.project(v3))
            }
            orthogVectors.push(orthogV3.normalize())
        }

        return orthogVectors
    }

    static Equal(v3a, v3b) {
        return v3a.x === v3b.x && v3a.y === v3b.y && v3a.z === v3b.z
    }

    equal(v3) {
        return this.x === v3.x && this.y === v3.y && this.z === v3.z
    }

    scale(scaler) {
        return new Vector3(this.x * scaler, this.y * scaler, this.z * scaler)
    }

    negate() {
        return new Vector3(-this.x, -this.y, -this.z)
    }

    size() {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z)
    }

    normalize() {
        return this.scale(1 / this.size())
    }

    subtract(v3) {
        return new Vector3(this.x - v3.x, this.y - v3.y, this.z - v3.z)
    }

    add(v3) {
        return new Vector3(this.x + v3.x, this.y + v3.y, this.z + v3.z)
    }

    project(v3) {
        return this.scale(Vector3.Dot(this, v3) / Vector3.Dot(this, this))
    }

    reject(v3) {
        return this.subtract( this.project(v3) )
    }
}

class Vector4 {
    constructor(x, y, z, w) {
        if (x instanceof Vector3 && y === undefined && z === undefined && w === undefined) {
            this.x = x.x
            this.y = x.y
            this.z = x.z
            this.w = x.w
        } else {
            this.x = x
            this.y = y
            this.z = z
            this.w = w
        }
    }

    static Dot(v4a, v4b) {
        return (v4a.x * v4b.x) + (v4a.y * v4b.y) + (v4a.z * v4b.z) + (v4a.w * v4b.w)
    }

    scale(scaler) {
        return new Vector4(this.x * scaler, this.y * scaler, this.z * scaler, this.w * scaler)
    }

    size() {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z + this.w*this.w)
    }

    normalize() {
        return this.scale(1 / this.size())
    }
}


class Point3 extends Vector3 {}

export {
    Vector3,
    Vector4,
    Point3
}