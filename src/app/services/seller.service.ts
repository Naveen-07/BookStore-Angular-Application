import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpService } from "./../services/http.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private addBookApi = 'sellers/addBook';
  private updateBookApi = '/sellers/updateBook';
  private deleteBookApi = '/sellers/deleteBook';
  private displayBookApi = '/sellers/getUnverifiedBooks';
  private uploadBookProfileApi = 'users/uploadImage';
  private approveBookApi = '/admin/bookVerification';
  private displayAllBookApi = '/admin/getBooksForVerification'

  constructor(private http: HttpClient,private service: HttpService) {}
  addBook(body: any): Observable<any>  {
    return this.service.postBook(body, environment.addBookPath);
  }
 /* addBook(book: any): Observable<any> {
    return this.http.post(environment.baseUrl + this.addBookApi, book, {
      headers: new HttpHeaders().set('token', localStorage.getItem('stoken')),
    });
  }*/

  displayBooks(): Observable<any> {
    return this.http.get(environment.baseUrl + this.displayBookApi, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token')),
    });
  }
  displayAllBooks(): Observable<any> {
    return this.http.get(environment.baseUrl + this.displayAllBookApi, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token')),
    });
  }

  deleteBooks(bookId: any): Observable<any> {
    return this.http.delete(environment.baseUrl + this.deleteBookApi + '/' + bookId, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token')),
    });
  }
  uploadBookImage(file: FormData, isProfile: string): Observable<any> {
    return this.http.post(
      environment.baseUrl + this.uploadBookProfileApi,
      file,
      {
        headers: new HttpHeaders().set('token', localStorage.getItem('token')),
        params: new HttpParams().set('isProfile', isProfile),
      }
    );
  }
  updateBook(body: any, bookId: any): Observable<any> {
    return this.http.put(
      environment.baseUrl + this.updateBookApi + '/' + bookId,body,
      {
        headers: new HttpHeaders().set('token', localStorage.getItem('token')),
      }
    );
  }
  onApprove(bookId: any): Observable<any> {
    return this.http.put(
      environment.baseUrl + this.approveBookApi + '/' + bookId,'',
      {
        headers: new HttpHeaders().set('token', localStorage.getItem('token')),
      }
    );
  }
}
