import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private urlBase = 'http://localhost:8000/api'; 

  constructor(private http: HttpClient) { }

  public header(){

    let header = new HttpHeaders({ 'Content-Type': 'application/json' });

    return { headers: header };
  }

  public getProducts (): Observable<any> {

    return this.http.get<any>(this.urlBase + "/products", this.header()).pipe();

  }

  public getOrders (): Observable<any> {

    return this.http.get<any>(this.urlBase + "/orders", this.header()).pipe();

  }
  public save () {

    let obj = {
      id: 0,
      state: 'cola',
      number: 2,
      order_detail : [
        {id: 0, product_id: 1, comment: "Nueva prueba", quantity: 1, },
        {id: 0, product_id: 1, comment: "Nueva prueba 2", quantity: 3, }
      ],
      users_id: 1,
      total: 3750
    }
    let body = {data: obj};

    
    
    return this.http.post<any> (this.urlBase + "/orders/store/", body, this.header()).pipe();
  }

  public updateState (param, newState) {

    param[0].state = newState;
    let body = {data: param[0]};
    
    return this.http.post<any> (this.urlBase + "/orders/update-state/" + param[0].id, body, this.header()).pipe();
  }


}
