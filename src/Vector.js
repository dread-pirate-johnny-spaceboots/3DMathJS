import { Matrix3 } from "./Matrix"

class Vector2 {
    constructor(x, y) {
        if (x instanceof Vector2 && y === undefined) {
            this.x = x.x 
            this.y = x.y 
        } else {
            this.x = x 
            this.y = y
        }
    }

    static Identity() {
        return new Vector2(0, 0)
    }

    static Normalize(vector2) {
        let vector = new Vector2(vector2)
        vector.normalize()
        return vector
    }

    static Min(v2A, v2B) {
        return new Vector2(
            v2A.x < v2B.x ? v2A.x : v2B.x,
            v2A.y < v2B.y ? v2A.y : v2B.y
        )
    }

    static Max(v2A, v2B) {
        return new Vector2(
            v2A.x > v2B.x ? v2A.x : v2B.x,
            v2A.y > v2B.y ? v2A.y : v2B.y
        )
    }

    static Transform(vector2, transformation) {
        return new Vector2(
            (vector2.x * transformation.matrix[0]) + (vector2.y * transformation.matrix[4]),
            (vector2.x * transformation.matrix[1]) + (vector2.y * transformation.matrix[5]),
        )
    }

    add(vector2) {
        return new Vector2(this.x + vector2.x, this.y + vector2.y)
    }

    subtract(vector2) {
        return new Vector2(this.x - vector2.x, this.y - vector2.y)
    }

    get not() {
        return new Vector2(-this.x, -this.y)
    }

    scale(scaler) {
        return new Vector2(this.x * scaler, this.y * scaler)
    }

    equals(vector2) {
        return this.x === vector2.x && this.y === vector2.y
    }

    get size() {
        return Math.sqrt( (this.x * this.x) + (this.y * this.y) )
    }

    normalize() {
        if (this.size === 0) { return }

        const scaler = 1 / this.size
        this.x *= scaler
        this.y *= scaler
    }
}

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

    static Zero() {
        return new Vector3(0, 0, 0)
    }

    static Up() {
        return new Vector3(0, 1, 0)
    }

    static Distance(v1, v2) {
        const dist = Vector3.DistanceSquared(v1, v2)
        return Math.sqrt(dist)
    }

    static DistanceSquared(v1, v2) {
        const x = v1.x - v2.x
        const y = v1.y - v2.y
        const z = v1.z - v2.z

        return (x * x) + (y * y) + (z * z)
    }

    static TransformCoordinates(vector3, matrix) {
        const x = (vector3.x * matrix.data[0][0]) + (vector3.y * matrix.data[1][0]) + (vector3.z * matrix.data[2][0]) + matrix.data[3][0];
        const y = (vector3.x * matrix.data[0][1]) + (vector3.y * matrix.data[1][1]) + (vector3.z * matrix.data[2][1]) + matrix.data[3][1];
        const z = (vector3.x * matrix.data[0][2]) + (vector3.y * matrix.data[1][2]) + (vector3.z * matrix.data[2][2]) + matrix.data[3][2];
        const w = (vector3.x * matrix.data[0][3]) + (vector3.y * matrix.data[1][3]) + (vector3.z * matrix.data[2][3]) + matrix.data[3][3];
        
        return new Vector3(x / w, y / w, z / w);
    }

    static TransformNormal(vector3, matrix) {
        const x = (vector3.x * matrix.data[0][0]) + (vector3.y * matrix.data[1][0]) + (vector3.z * matrix.data[2][0]);
        const y = (vector3.x * matrix.data[0][1]) + (vector3.y * matrix.data[1][1]) + (vector3.z * matrix.data[2][1]);
        const z = (vector3.x * matrix.data[0][2]) + (vector3.y * matrix.data[1][2]) + (vector3.z * matrix.data[2][2]);
        
        return new Vector3(x, y, z);
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

    equals(v3) {
        return this.equal(v3)
    }

    equal(v3) {
        return this.x === v3.x && this.y === v3.y && this.z === v3.z
    }

    scale(scaler) {
        return new Vector3(this.x * scaler, this.y * scaler, this.z * scaler)
    }

    get not() {
        return this.negate()
    }

    negate() {
        return new Vector3(-this.x, -this.y, -this.z)
    }

    get size() {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z)
    }

    normalize() {
        return this.scale(1 / this.size)
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
        return this.scale(1 / this.size)
    }
}


class Point3 extends Vector3 {
    
    static DistanceOfLineFromLine(p3a, v3a, p3b, v3b) {
        const dp = p3b.subtract(p3a)
        const daa = Vector3.Dot(v3a, v3a)
        const dbb = Vector3.Dot(v3b, v3b)
        const dab = Vector3.Dot(v3a, v3b)
        
        let det = dab * dab - daa * dbb
        if (Math.abs(det) > Number.MIN_VALUE) {
            det = 1 / det
            const dpVa = Vector3.Dot(dp, v3a)
            const dpVb = Vector3.Dot(dp, v3b)
            const t1 = (dab * dpVb - dbb * dpVa) * det
            const t2 = (daa * dpVb - dab * dpVa) * det

            return (dp.add(v3b).scale(t2).subtract(v3a.scale(t1))).size()
        }
    }

    distanceFromLine(p3, v3) {
        const v = Vector3.Cross(this.subtract(p3), v3)
        return Math.sqrt(Vector3.Dot(v, v) / Vector3.Dot(v3, v3))
    }

}

export {
    Vector2,
    Vector3,
    Vector4,
    Point3
}