export class Circular1 {
  public constructor(public readonly circular: Circular2) {}
}

export class Circular2 {
  public constructor(public readonly circular: Circular3) {}
}

export class Circular3 {
  public constructor(public readonly circular: Circular1) {}
}
