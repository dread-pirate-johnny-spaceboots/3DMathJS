class Vector3 {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    static Dot(v3a, v3b) {
        return (v3a.x * v3b.x) + (v3a.y * v3b.y) + (v3a.z * v3b.z)
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

    subtract(vector3) {
        return new Vector3(this.x - vector3.x, this.y - vector3.y, this.z - vector3.z)
    }

    add(vector3) {
        return new Vector3(this.x + vector3.x, this.y + vector3.y, this.z + vector3.z)
    }
}

export {
    Vector3
}