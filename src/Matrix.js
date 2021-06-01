import { Vector3, Vector4 } from "./Vector";

class Matrix2 {
    constructor(v0, v1, v2, v3) {
        this.data = [
            [v0, v1],
            [v2, v3]
        ]
    }

    add(matrix2) {}
    subtract(matrix2) {}
    scale(matrix2) {}
    multiply(matrix2) {}
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

export {
    Matrix2,
    Matrix3,
    Matrix4
}
