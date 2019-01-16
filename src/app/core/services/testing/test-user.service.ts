import { Injectable } from "@angular/core";
import { UserService } from "..";
import { User } from "@app/core";
import { Observable } from "rxjs";
import { asyncData } from "@app/shared/testing";

@Injectable({ providedIn: 'root' })
export class TestUserService extends UserService {
  constructor() {
    super(null, null);
  }

  update(user: User) : Observable<User> {
    return asyncData(user);
  }

}
