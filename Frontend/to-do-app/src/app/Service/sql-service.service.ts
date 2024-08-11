import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SqlServiceService {

  constructor(private http:HttpClient) { }
  url="http://localhost:3000/std"
  getStudents()
  {
    return this.http.get(this.url);
  }

  addStudent(data:any)
  {
    return this.http.post(this.url,data);
  }

  update(roll:any,data:any)
  {
    return this.http.put(this.url+`/${roll}`,data);
  }

  delete(roll:any)
  {
    return this.http.delete(this.url+`/${roll}`);
  }
}
