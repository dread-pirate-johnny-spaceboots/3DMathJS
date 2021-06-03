3DMath.js
=========
JavaScript libaray for handling 3D math. Written to explore the concepts. Optimized for readability at the cost of performance. Not intended for production use.

Vector3
-----------
- constructor(x, y, z) *or* (vector3)
```
const v  = new Vector3(1, 2, 3)
const v2 = new Vector3(v)

v.equal(v2) === true
```

##### Static Methods
- Dot(vector3, vector3)
- Cross(vector3, vector3)
- Outer(vector3, vector3)
- TripleScaler(vector3, vector3, vector3)
- Orthogonalize([vector3, ...])
- Equal(vector3, vector3)

##### Instance Methods
- equal(vector3)
- scale(scaler)
- negate()
- size()
- normalize()
- add(vector3)
- subtract(vector3)
- project(vector3)
- reject(vector3)

Matrix3
-----------
- constructor(float * 9) *or* (vector3, vector3, vector3)
```
const m = new Matrix3(
    1,2,3,
    4,5,6,
    7,8,9
)
const m2 = new Matrix3(
    new Vector3(1,2,3),
    new Vector3(4,5,6),
    new Vector3(7,8,9),
)

m.equal(m2) === true
```

##### Static Methods
- Rot(angle, vector3)
- RotX(angle)
- RotY(angle)
- RotZ(angle)
- Reflection(vector3)
- Involution(vector3)
- Scale(x, y, z) *or* (vector3)
- Skew(angle, v3Direction, v3Projection)

##### Instance Methods
- equal(matrix3)
- add(matrix3)
- subtract(matrix3)
- scale(scaler)
- multiply(matrix3)
- determinant()
- invert()

Quaternion
----------
- constructor(x, y, z, w) *or* (vector3, scaler) *or* (vector4)
```
const q  = new Quaternion(1,2,3,0)
const q2 = new Quaternion(new Vector3(1,2,3), 0)
const q3 = new Quaternion(new Vector4(1,2,3,0))

q.equal(e2) === true && q.equal(q3) === true
```
##### Static Methods

##### Instance Methods
- equal(quaternion)
- add(quaternion)
- subtract(quaternion)
- multiply(quaternion)
- size()
- conjugate()
- versor()
- invert()
- getVector3()
- getVector4()

Matrix4
-------

Matrix4Transform
----------------

Vector4
-------

