
export class Bounds3 {
  public x: number
  public y: number
  public z: number
  public half: number
  constructor(x?:number, y?:number, z?:number, half?:number) {
    this.x = typeof x === 'number' ? x : 0;
    this.y = typeof y === 'number' ? y : 0;
    this.z = typeof z === 'number' ? z : 0;
    this.half = typeof half === 'number' ? half : 0;
  }

  contains(x, y, z) {
    const half = this.half;
    return this.x - half <= x && x < this.x + half &&
      this.y - half <= y && y < this.y + half &&
      this.z - half <= z && z < this.z + half;
  }
}
