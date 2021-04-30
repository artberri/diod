export class Clock {
  public now(): string {
    const currentDate = new Date()

    return `${currentDate.getMinutes()}:${currentDate.getSeconds()}`
  }
}
