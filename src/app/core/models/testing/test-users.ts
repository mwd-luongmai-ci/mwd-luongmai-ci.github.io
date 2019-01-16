import { User } from "..";

/** return fresh array of test user */
export function getTestUsers(): User[] {
  return [
    {id: '41', name: 'Bob', username: 'bob', email: 'bob@gmail.com', bio: 'test', company: 'test', location: 'test',  password: '123456', token: 'abc12345', active: true},
  ];
}
