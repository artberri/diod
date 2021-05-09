export class SessionManager {
  public login(): string {
    return 'login'
  }

  public logout(): string {
    return 'logout'
  }
}

export class ShoppingCart {
  public add(): string {
    return 'add'
  }

  public remove(): string {
    return 'add'
  }
}

abstract class User {
  public name!: string

  public constructor(private readonly sessionManager: SessionManager) {}

  public login(): string {
    return this.sessionManager.login()
  }

  public logout(): string {
    return this.sessionManager.logout()
  }
}

export class BankUser extends User {
  public name!: string
  public money!: string
}

export class ShopUser extends User {
  public constructor(
    sessionManager: SessionManager,
    private readonly shoppingCart: ShoppingCart
  ) {
    super(sessionManager)
  }

  public name!: string
  public add(): string {
    return this.shoppingCart.add()
  }

  public remove(): string {
    return this.shoppingCart.remove()
  }
}
