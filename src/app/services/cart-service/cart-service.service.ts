import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private httpService: HttpService) { }


  getBookCart() {
    return this.httpService.getBooksCart('http://localhost:8081/user/getAllFromCart');
  }

  addBooks(bookId) {
    return this.httpService.foo('/user/addMoreItems?bookId=' + bookId);
  }

  removeItem(bookId) {
    return this.httpService.removeCart('/user/removeFromCart?bookId=' + bookId);
  }

  removeBookById(book_id) {
    return this.httpService.removeAllItemsCart('/user/removeAllFromCart/' + book_id);
  }

  removeAll() {
    return this.httpService.clearCart('http://localhost:8081/user/removeAll');
  }

}
