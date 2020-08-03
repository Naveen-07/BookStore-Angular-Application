import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SellerService } from "../../services/seller.service";
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MessageService } from "../../services/message.service";
import { Book } from 'src/app/model/book.model';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss'],
})
export class UpdateBookComponent implements OnInit {
  response: any;
  currentBookName: string = this.data.bookName;
  currentAuthorName: string = this.data.authorName;
  currentPrice: number = this.data.price;
  currentQuantity: number = this.data.quantity;
  currentBookDetails: string = this.data.bookDetails;
  book = {
    bookName: null,
    authorName: null,
    price: null,
    quantity: null,
    bookDetails: null,
  };
  constructor(
    private vendorService: SellerService,
    public snackbar: MatSnackBar,
    private snackBar: MatSnackBar,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<UpdateBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) {}

  bookForm = new FormGroup({
    bookName: new FormControl('',Validators.pattern("[a-zA-Z0-9\\s]{3,}")),
    authorName: new FormControl('',Validators.pattern("^[A-Z][a-zA-Z\\s]{2,}")),
    price: new FormControl('',Validators.min(0)),
    quantity: new FormControl('',Validators.pattern("^[1-9][0,9]{0,}")),
    description: new FormControl('',Validators.pattern("[a-zA-Z0-9\\s]{3,}")),
  });
  ngOnInit() {}
  validate(){
    if( this.bookForm.value.bookName != '' || this.bookForm.value.authorName != '' || this.bookForm.value.price
         != NONE_TYPE || this.bookForm.value.quantity != NONE_TYPE || this.bookForm.value.description != ''){
           if(this.bookForm.get('bookName').hasError('pattern'))
               return "true";
           if(this.bookForm.get('authorName').hasError('pattern'))
               return "true";
           if(this.bookForm.get('price').hasError('min'))
               return "true";
           if(this.bookForm.get('quantity').hasError('pattern'))
               return "true";
           if(this.bookForm.get('description').hasError('pattern'))
               return "true";
               return "false";
    }
    return "true";
  }
  onFormSubmit() {
    this.dialogRef.close();
    if(this.bookForm.value.bookName==''){
      this.book.bookName = this.data.bookName;
    }else{
      this.book.bookName = this.bookForm.value.bookName;
    }
    if(this.bookForm.value.authorName == ''){
      this.book.authorName = this.data.authorName;
    }else{
      this.book.authorName = this.bookForm.value.authorName;
    }
    if(this.bookForm.value.price==''){
      this.book.price = this.data.price
    }else{
      this.book.price = this.bookForm.value.price;
    }
    if(this.bookForm.value.quantity==''){
      this.book.quantity = this.data.quantity;
    }else{
      this.book.quantity = this.bookForm.value.quantity;
    }
    if(this.bookForm.value.description==''){
      this.book.bookDetails = this.data.bookDetails;
    }else{
      this.book.bookDetails = this.bookForm.value.description;
    }
    console.log("book data ",this.book);
    this.vendorService.updateBook(this.book,this.data.bookId).subscribe(
      (data) => {
          console.log("book data response ",data);
         this.messageService.changeOnDisapproved();
         this.messageService.changeOnApproved();
      },
      (error) => {
        this.snackBar.open("Failed to update", 'cancel', {
          duration: 3000,
        });
      }
    );
}
}
