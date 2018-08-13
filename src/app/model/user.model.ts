export class User {
  constructor(public id:number = 0,
              public username:string = '',
              public password:string = '',
              public email:string = '',
              public roles:Roles[] = []
            ){}
}

class Roles {
    constructor(public roleId:number = 0,
                public expiryDate:Date = new Date()
              ){}
}
