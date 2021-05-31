import { Vector3 } from "./Vector";

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
}

export {
    Matrix3
}