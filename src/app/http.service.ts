import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  postSomething(){
    return this.http.post('http://localhost:3000/auth/new', {
      
    })
  }
}
