import { Seller } from 'src/app/model/seller.model';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { MessageService } from '../../services/message.service';
import {
  MatSnackBar,
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from '@angular/material';
import { Book } from 'src/app/models/book.model';
import { VerifydialogComponent } from '../verifydialog/verifydialog.component';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.scss'],
})
export class AdminBooksComponent implements OnInit {
  books = [];
  book: Book[];
  searchTerm: string;
  message: string;
  //  size: any;
  sortTerm: string;
  item: any;
  page: number = 1;
  constructor(
    private vendorService: SellerService,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private data: MessageService,
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute //    @Inject(MAT_DIALOG_DATA) public datadialog: any
  ) {}
  // seller: [];
  sellerId: any;
  ngOnInit() {
    this.sellerId = this.route.snapshot.paramMap.get('sellerId');
    console.log(this.sellerId);
    this.getAllSellerBooks();
   /* this.messageService.changeMessages();
    this.messageService.currentBooks.subscribe((data) => {
      this.books = [];
      // this.onDisplayBooks(data);
    });*/
    this.messageService.currentEvent$.subscribe((message) => {
      this.searchTerm = message;
    });
    // if (localStorage.getItem('token') != null) {
    //   this.seller = this.datadialog.book;
    //   //      this.size = this.seller.length;
    // }
  }
  onBookDetail(event) {
    event.stopPropagation();
  }
  /*
  onSelect(val: any){
   this.sortTerm = val;
   console.log("sorting term",this.sortTerm);
  }*/
  onApproved() {
    this.snackBar.open('Book AlreadyApproved', 'ok', {
      duration: 2000,
    });
  }

  datas: any;
  getAllSellerBooks() {
    this.userService.getAllSellerBooks(this.sellerId).subscribe((response) => {
      this.datas = response;
      console.log(this.datas);
      this.books = this.datas.data;
      console.log(this.books);
    });
  }

  onApproval(bookId: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      bookId: bookId,
      status: 'Approve',
    };
    const dialogRef = this.dialog.open(VerifydialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  onDisapproved() {
    this.snackBar.open('Book Already disapproved', 'ok', {
      duration: 2000,
    });
  }

  onDisapproval(bookId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      bookId: bookId,
      status: 'DisApprove',
    };
    const dialogRef = this.dialog.open(VerifydialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.books.splice(0);
    });
  }
}
