import { Point3, Vector3, Vector4 } from "./Vector";

class Matrix2 {
    constructor(v0, v1, v2, v3) {
        this.data = [
            [v0, v1],
            [v2, v3]
        ]
    }

    equal(m2) {
        const m1 = this.data
        m2 = m2.data
        return m1[0][0] === m2[0][0] && m1[0][1] === m2[0][1] && m1[1][0] === m2[1][0] && m1[1][1] === m2[1][1] 
    }

    add(m2) {
        return new Matrix2(this.data[0][0] + m2.data[0][0], this.data[0][1] + m2.data[0][1], this.data[1][0] + m2.data[1][0], this.data[1][1] + m2.data[1][1])
    }

    subtract(m2) {
        return new Matrix2(this.data[0][0] - m2.data[0][0], this.data[0][1] - m2.data[0][1], this.data[1][0] - m2.data[1][0], this.data[1][1] - m2.data[1][1])
    }

    scale(scaler) {
        return new Matrix2(this.data[0][0] * scaler, this.data[0][1] * scaler, this.data[1][0] * scaler, this.data[1][1] * scaler)
    }

    multiply(m2) {
        if (m2 instanceof Vector3) {
            return new Vector3(
                m2.x * this.data[0][0] + m2.y * this.data[0][1],
                m2.x * this.data[1][0] + m2.y * this.data[1][1],
                1
            )
        }

        const m1 = this.data
        m2 = m2.data
       
        return new Matrix2(
            (m1[0][0] * m2[0][0]) + (m1[0][1] * m2[1][0]), (m1[0][0] * m2[0][1]) + (m1[0][1] * m2[1][1]),
            (m1[1][0] * m2[0][0]) + (m1[1][1] * m2[1][0]), (m1[1][0] * m2[0][1]) + (m1[1][1] * m2[1][1])
        )
    }

    invert() {}

    determinant() {
        const m = this.data
        return m[0][0] * m[1][1] - m[0][1] * m[1][0]
    }
}

class Matrix3 {
    /**
     * Construct a 3D matrix from either 3 Vector3s or 9 scaler values
     */
    constructor(v0, v1, v2, v3, v4, v5, v6, v7, v8) {
        if (v0 instanceof Vector3 && v1 instanceof Vector3 && v2 instanceof Vector3) {
            this.data = [
                [v0.x, v0.y, v0.z],
                [v1.x, v1.y, v1.z],
                [v2.x, v2.y, v2.z]
            ]
        } else {
            this.data = [
                [v0, v1, v2],
                [v3, v4, v5],
                [v6, v7, v8]
            ]
        }
    }

    static RotX(angle) {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)

        return new Matrix3(
            1, 0, 0,
            0, cos, -sin,
            0, sin, cos
        )
    }

    static RotY(angle) {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)

        return new Matrix3(
            cos, 0, sin,
            0, 1, 0,
            -sin, 0, cos
        )
    }

    static RotZ(angle) {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)

        return new Matrix3(
            cos, -sin, 0,
            sin, cos, 0,
            0, 0, 1
        )
    }

    static Rot(angle, v3) {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        const d = 1 - cos
        
        const x = v3.x * d
        const y = v3.y * d
        const z = v3.z * d
        const xy = x * v3.y
        const xz = x * v3.z
        const yz = y * v3.z

        return new Matrix3(
            cos + x * v3.x,  xy - sin * v3.z, xz + sin * v3.y,
            xy + sin * v3.z, cos + y * v3.y,  yz - sin * v3.x,
            xz - sin * v3.y, yz + sin * v3.x,   cos + z * v3.z
        )
    }

    static Reflection(v3) {
        const x = v3.x * -2
        const y = v3.y * -2
        const z = v3.z * -2
        const xy = x * v3.y
        const xz = x * v3.z
        const yz = y * v3.z
        
        return new Matrix3(
            x * v3.x + 1, xy, xz, 
            xy, y * v3.y + 1, yz,
            xz, yz, z * v3.z + 1
        )
    }

    static Involution(v3) {
        const x = v3.x * 2
        const y = v3.y * 2
        const z = v3.z * 2
        const xy = x * v3.y
        const xz = x * v3.z
        const yz = y * v3.z

        return new Matrix3(
            x * v3.x - 1, xy, xz,
            xy, y * v3.y - 1, yz,
            xz, yz, z * v3.z - 1.0
        )
    }

    static Scale(x, y, z) {
        if (y instanceof Vector3 && z === undefined) {
            // Produce scale along vector y by scaler x
            const s  = x - 1
            const v3 = y
            const vX = v3.x * s
            const vY = v3.y * s
            const vZ = v3.z * s
            const xy = vX * v3.y
            const xz = vX * v3.z
            const yz = vY * v3.z
            
            return new Matrix3(
                vX * v3.x + 1, xy, xz,
                xy, vY * v3.y + 1, yz,
                xz, yz, vZ * v3.z + 1
            )
        } else {
            // Produce orthogonal scale of x,y,z
            return new Matrix3(
                x, 0, 0,
                0, y, 0,
                0, 0, z
            )
        }
    }

    static Skew(angle, v3Dir, v3Proj) {
        const t = Math.tan(angle)
        const x = v3Dir.x * t
        const y = v3Dir.y * t
        const z = v3Dir.z * t
        const p = v3Proj

        return new Matrix3(
            x * p.x + 1, x * p.y, x * p.z,
            y * p.x, y * p.y + 1, y * p.z,
            z * p.x, z * p.y, z * p.z + 1
        )
    }

    equal(m3) {
        return this.data[0][0] === m3.data[0][0] && this.data[0][1] === m3.data[0][1] && this.data[0][2] === m3.data[0][2] &&
               this.data[1][0] === m3.data[1][0] && this.data[1][1] === m3.data[1][1] && this.data[1][2] === m3.data[1][2] &&
               this.data[2][0] === m3.data[2][0] && this.data[2][1] === m3.data[2][1] && this.data[2][2] === m3.data[2][2]
    }

    add(matrix3) {
        return new Matrix3(
            this.data[0][0] + matrix3.data[0][0], this.data[0][1] + matrix3.data[0][1], this.data[0][2] + matrix3.data[0][2], 
            this.data[1][0] + matrix3.data[1][0], this.data[1][1] + matrix3.data[1][1], this.data[1][2] + matrix3.data[1][2],
            this.data[2][0] + matrix3.data[2][0], this.data[2][1] + matrix3.data[2][1], this.data[2][2] + matrix3.data[2][2]
        )
    }

    subtract(matrix3) {
        return new Matrix3(
            this.data[0][0] - matrix3.data[0][0], this.data[0][1] - matrix3.data[0][1], this.data[0][2] - matrix3.data[0][2], 
            this.data[1][0] - matrix3.data[1][0], this.data[1][1] - matrix3.data[1][1], this.data[1][2] - matrix3.data[1][2],
            this.data[2][0] - matrix3.data[2][0], this.data[2][1] - matrix3.data[2][1], this.data[2][2] - matrix3.data[2][2]
        )
    }

    scale(scaler) {
        return new Matrix3(
            this.data[0][0] * scaler, this.data[0][1] * scaler, this.data[0][2] * scaler, 
            this.data[1][0] * scaler, this.data[1][1] * scaler, this.data[1][2] * scaler,
            this.data[2][0] * scaler, this.data[2][1] * scaler, this.data[2][2] * scaler
        )
    }

    // written using loops. If you need performance use another library.
    multiply(matrix3) {
        if (!(matrix3 instanceof Matrix3)) { throw new Error("Invalid argument type supplied, must be instance of Matrix3") }

        const colA = new Vector3(matrix3.data[0][0], matrix3.data[1][0], matrix3.data[2][0])    
        const colB = new Vector3(matrix3.data[0][1], matrix3.data[1][1], matrix3.data[2][1])
        const colC = new Vector3(matrix3.data[0][2], matrix3.data[1][2], matrix3.data[2][2])

        let rowVectors = []
        for (let rI = 0; rI < this.data.length; rI++) {
            const row = this.data[rI]
            const rowVector = new Vector3(row[0], row[1], row[2])
            rowVectors[rI] = new Vector3(
                Vector3.Dot(rowVector, colA), 
                Vector3.Dot(rowVector, colB), 
                Vector3.Dot(rowVector, colC)
            )
        }

        return new Matrix3(
            rowVectors[0],
            rowVectors[1],
            rowVectors[2]
        )
    }

    determinant() {
        const m = this.data
        return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
             - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
             + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
    }

    invert() {
        const det = this.determinant()
        const m = this.data
        const nM = new Matrix3(
              1 * (new Matrix2(m[1][1], m[1][2], m[2][1], m[2][2])).determinant(), -1 * (new Matrix2(m[1][0], m[1][2], m[2][0], m[2][2])).determinant(),  1 * (new Matrix2(m[1][0], m[1][1], m[2][0], m[2][1])).determinant(), 
             -1 * (new Matrix2(m[0][1], m[0][2], m[2][1], m[2][2])).determinant(),  1 * (new Matrix2(m[0][0], m[0][2], m[2][0], m[2][2])).determinant(), -1 * (new Matrix2(m[0][0], m[0][1], m[2][0], m[2][1])).determinant(), 
              1 * (new Matrix2(m[0][1], m[0][2], m[1][1], m[1][2])).determinant(), -1 * (new Matrix2(m[0][0], m[0][1], m[1][0], m[1][2])).determinant(),  1 * (new Matrix2(m[0][0], m[0][1], m[1][0], m[1][1])).determinant()
        )
        let temp = nM.data[1][0]
        nM.data[1][0] = nM.data[0][1]
        nM.data[0][1] = temp
        temp = nM.data[0][2]
        nM.data[0][2] = nM.data[2][0]
        nM.data[2][0] = temp
        temp = nM.data[1][2]
        nM.data[1][2] = nM.data[2][1]
        nM.data[2][1] = temp

        return nM.scale(1 / det)
    }


}

class Matrix4 {
    constructor(v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15) {
        if (v0 instanceof Vector4 && v1 instanceof Vector4 && v2 instanceof Vector4 && v3 instanceof Vector4) {
            this.data = [
                [v0.x, v0.y, v0.z, v0.w],
                [v1.x, v1.y, v1.z, v1.w],
                [v2.x, v2.y, v2.z, v2.w],
                [v3.x, v3.y, v3.z, v3.w],
            ]
        } else if (v0 instanceof Matrix4) {
            this.data = v0.data
        } else {
            this.data = [
                [v0, v1, v2, v3],
                [v4, v5, v6, v7],
                [v8, v9, v10, v11],
                [v12, v13, v14, v15]
            ]
        }
    }

    equal(m4) {
        return this.data[0][0] === m4.data[0][0] && this.data[0][1] === m4.data[0][1] && this.data[0][2] === m4.data[0][2] && this.data[0][3] === m4.data[0][3] &&
               this.data[1][0] === m4.data[1][0] && this.data[1][1] === m4.data[1][1] && this.data[1][2] === m4.data[1][2] && this.data[1][3] === m4.data[1][3] &&
               this.data[2][0] === m4.data[2][0] && this.data[2][1] === m4.data[2][1] && this.data[2][2] === m4.data[2][2] && this.data[2][3] === m4.data[2][3] &&
               this.data[3][0] === m4.data[3][0] && this.data[3][1] === m4.data[3][1] && this.data[3][2] === m4.data[3][2] && this.data[3][3] === m4.data[3][3]
    }

    add(m4) {
        const c = this.data
        const n = m4.data

        return new Matrix4(
            c[0][0] + n[0][0], c[0][1] + n[0][1], c[0][2] + n[0][2], c[0][3] + n[0][3], 
            c[1][0] + n[1][0], c[1][1] + n[1][1], c[1][2] + n[1][2], c[1][3] + n[1][3],
            c[2][0] + n[2][0], c[2][1] + n[2][1], c[2][2] + n[2][2], c[2][3] + n[2][3],
            c[3][0] + n[3][0], c[3][1] + n[3][1], c[3][2] + n[3][2], c[3][3] + n[3][3]
        )
    }

    subtract(m4) {
        const c = this.data
        const n = m4.data

        return new Matrix4(
            c[0][0] - n[0][0], c[0][1] - n[0][1], c[0][2] - n[0][2], c[0][3] - n[0][3], 
            c[1][0] - n[1][0], c[1][1] - n[1][1], c[1][2] - n[1][2], c[1][3] - n[1][3],
            c[2][0] - n[2][0], c[2][1] - n[2][1], c[2][2] - n[2][2], c[2][3] - n[2][3],
            c[3][0] - n[3][0], c[3][1] - n[3][1], c[3][2] - n[3][2], c[3][3] - n[3][3]
        )
    }

    scale(scaler) {
        return new Matrix4(
            this.data[0][0] * scaler, this.data[0][1] * scaler, this.data[0][2] * scaler, this.data[0][3] * scaler,
            this.data[1][0] * scaler, this.data[1][1] * scaler, this.data[1][2] * scaler, this.data[1][3] * scaler,
            this.data[2][0] * scaler, this.data[2][1] * scaler, this.data[2][2] * scaler, this.data[2][3] * scaler,
            this.data[3][0] * scaler, this.data[3][1] * scaler, this.data[3][2] * scaler, this.data[3][3] * scaler
        )
    }

    multiply(m4) {
        if (!(m4 instanceof Matrix4)) { throw new Error("Invalid argument type supplied, must be instance of Matrix4") }

        const colA = new Vector4(m4.data[0][0], m4.data[1][0], m4.data[2][0], m4.data[3][0])    
        const colB = new Vector4(m4.data[0][1], m4.data[1][1], m4.data[2][1], m4.data[3][1])
        const colC = new Vector4(m4.data[0][2], m4.data[1][2], m4.data[2][2], m4.data[3][2])
        const colD = new Vector4(m4.data[0][3], m4.data[1][3], m4.data[2][3], m4.data[3][3])

        let rowVectors = []
        for (let rI = 0; rI < this.data.length; rI++) {
            const row = this.data[rI]
            const rowVector = new Vector4(row[0], row[1], row[2], row[3])
            rowVectors[rI] = new Vector4(
                Vector4.Dot(rowVector, colA), 
                Vector4.Dot(rowVector, colB), 
                Vector4.Dot(rowVector, colC),
                Vector4.Dot(rowVector, colD)
            )
        }

        return new Matrix4(
            rowVectors[0],
            rowVectors[1],
            rowVectors[2],
            rowVectors[3],
        )
    }

    determinant() {
        const m = this.data
        const submA = new Matrix3(m[1][1], m[1][2], m[1][3], m[2][1], m[2][2], m[2][3], m[3][1], m[3][2], m[3][3])
        const submB = new Matrix3(m[1][0], m[1][2], m[1][3], m[2][0], m[2][2], m[2][3], m[3][0], m[3][2], m[3][3])
        const submC = new Matrix3(m[1][0], m[1][1], m[1][3], m[2][0], m[2][1], m[2][3], m[3][0], m[3][1], m[3][3])
        const submD = new Matrix3(m[1][0], m[1][1], m[1][2], m[2][0], m[2][1], m[2][2], m[3][0], m[3][1], m[3][2])

        return m[0][0] * submA.determinant() - m[0][1] * submB.determinant() + m[0][2] * submC.determinant() - m[0][3] * submD.determinant()
    }

    invert() {
        const m = this.data
        const v3a = new Vector3(m[0][0], m[1][0], m[2][0])
        const v3b = new Vector3(m[0][1], m[1][1], m[2][1])
        const v3c = new Vector3(m[0][2], m[1][2], m[2][2])
        const v3d = new Vector3(m[0][3], m[1][3], m[2][3])

        const x = m[3][0]
        const y = m[3][1]
        const z = m[3][2]
        const w = m[3][3]

        let s = Vector3.Cross(v3a, v3b)
        let t = Vector3.Cross(v3c, v3d)
        let u = v3a.scale(y).subtract(v3b.scale(x))
        let v = v3c.scale(w).subtract(v3d.scale(z))

        const invDet  = 1 / (Vector3.Dot(s, v) + Vector3.Dot(t, u))
        s = s.scale(invDet)
        t = t.scale(invDet)
        u = u.scale(invDet)
        v = v.scale(invDet)

        const r0 = Vector3.Cross(v3b, v).add(t.scale(y))
        const r1 = Vector3.Cross(v, v3a).subtract(t.scale(x))
        const r2 = Vector3.Cross(v3d, u).add(s.scale(w))
        const r3 = Vector3.Cross(u, v3c).subtract(s.scale(z))

        return new Matrix4(
            r0.x, r0.y, r0.z, -Vector3.Dot(v3b, t),
            r1.x, r1.y, r1.z,  Vector3.Dot(v3a, t),
            r2.x, r2.y, r2.z, -Vector3.Dot(v3d, s),
            r3.x, r3.y, r3.z,  Vector3.Dot(v3c, s),
        )
    }
}

// Simplified 4D matrix with pre-baked transformation-based assumptions
class Matrix4Transform extends Matrix4 {
    constructor(v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11) {
        super()

        if (v0 instanceof Vector3 && v1 instanceof Vector3 && v2 instanceof Vector3 && v3 instanceof Point3) {
            this.data = [
                [v0.x, v1.x, v2.x, v3.x],
                [v0.y, v1.y, v2.y, v3.y],
                [v0.z, v1.z, v2.z, v3.z],
                [0, 0, 0, 1]
            ]
        } else {
            this.data = [
                [v0, v3, v6, v9],
                [v1, v4, v7, v10],
                [v2, v5, v8, v11],
                [0, 0, 0, 1]
            ]
        }
    }

    getTranslation() {
        return new Point3(this.data[0][3], this.data[1][3], this.data[2][3])
    }

    setTranslation(p3) {
        this.data[0][3] = p3.x
        this.data[1][3] = p3.y
        this.data[2][3] = p3.z

        return this
    }

    invert() {
        const v3a = new Vector3(this.data[0][0], this.data[1][0], this.data[2][0])
        const v3b = new Vector3(this.data[0][1], this.data[1][1], this.data[2][1])
        const v3c = new Vector3(this.data[0][2], this.data[1][2], this.data[2][2])
        const v3d = new Vector3(this.data[0][3], this.data[1][3], this.data[2][3])

        let s = Vector3.Cross(v3a, v3b)
        let t = Vector3.Cross(v3c, v3d)

        const invDet = 1 / Vector3.Dot(s, v3c)

        s = s.scale(invDet)
        t = t.scale(invDet)

        const c = v3c.scale(invDet)
        const r0 = Vector3.Cross(v3b, c)
        const r1 = Vector3.Cross(c, v3a)

        return new Matrix4Transform(
            r0.x, r0.y, r0.z, -Vector3.Dot(v3b, t),
            r1.x, r1.y, r1.z,  Vector3.Dot(v3a, t),
            s.x, s.y, s.z,    -Vector3.Dot(v3d, s)
        )
    }

    transformNormal(v3) {
        const m = this.data

        return new Vector3(
            v3.x * m[0][0] + v3.y * m[0][1] + v3.z * m[0][2],
            v3.x * m[1][0] + v3.y * m[1][1] + v3.z * m[1][2],
            v3.x * m[2][0] + v3.y * m[2][1] + v3.z * m[2][2]
        )
    }

    /*
    multiply(m4t) {
        if (m4t instanceof Matrix4Transform) {
            const a = this.data
            const b = m4t.data
            return new Matrix4Transform(
                a[0][0] * b[0][0] + a[1][0] * b[0][1] + a[2][0] * b[0][2],
                a[0][0] * b[1][0] + a[1][0] * b[1][1] + a[2][0] * b[1][2],
                a[0][0] * b[2][0] + a[1][0] * b[2][1] + a[2][0] * b[2][2],
                a[0][0] * b[3][0] + a[1][0] * b[3][1] + a[2][0] * b[3][2] + a[3][0],
                a[0][1] * b[0][0] + a[1][1] * b[0][1] + a[2][1] * b[0][2],
                a[0][1] * b[1][0] + a[1][1] * b[1][1] + a[2][1] * b[1][2],
                a[0][1] * b[2][0] + a[1][1] * b[2][1] + a[2][1] * b[2][2],
                a[0][1] * b[3][0] + a[1][1] * b[3][1] + a[2][1] * b[3][2] + a[3][1],
                a[0][2] * b[0][0] + a[1][2] * b[0][1] + a[2][2] * b[0][2],
                a[0][2] * b[1][0] + a[1][2] * b[1][1] + a[2][2] * b[1][2],
                a[0][2] * b[2][0] + a[1][2] * b[2][1] + a[2][2] * b[2][2],
                a[0][2] * b[3][0] + a[1][2] * b[3][1] + a[2][2] * b[3][2] + a[3][2]
            )
        } else if (m4t instanceof Vector3) {
            const v = m4t
            const m = this.data

            return new Vector3(
                m[0][0] * v.x + m[1][0] * v.y + m[2][0] * v.z,
                m[0][1] * v.x + m[1][1] * v.y + m[2][1] * v.z,
                m[0][2] * v.x + m[1][2] * v.y + m[2][2] * v.z
            )
        } else if (m4t instanceof Point3) {
            const p = m4t
            const m = this.data

            return new Point3(
                m[0][0] * p.x + m[1][0] * p.y + m[2][0] * p.z + m[3][0],
                m[0][1] * p.x + m[1][1] * p.y + m[2][1] * p.z + m[3][1],
                m[0][2] * p.x + m[1][2] * p.y + m[2][2] * p.z + m[3][2]
            )
        }
    }
    */
}

export {
    Matrix2,
    Matrix3,
    Matrix4,
    Matrix4Transform
}
