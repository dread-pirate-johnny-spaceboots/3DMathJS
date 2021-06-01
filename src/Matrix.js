import { Vector3 } from "./Vector";

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
        return this.data[0][0] == m3.data[0][0] && this.data[0][1] == m3.data[0][1] && this.data[0][2] == m3.data[0][2] &&
               this.data[1][0] == m3.data[1][0] && this.data[1][1] == m3.data[1][1] && this.data[2][2] == m3.data[2][2] &&
               this.data[2][0] == m3.data[2][0] && this.data[2][1] == m3.data[2][1] && this.data[2][2] == m3.data[2][2]
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

export {
    Matrix2,
    Matrix3
}