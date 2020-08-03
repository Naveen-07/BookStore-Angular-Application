import {CartServiceService} from './../../services/cart-service/cart-service.service';
import {CustomerDetailsService} from './../../services/customer-Details/customer-details.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MatRadioChange, MatDialog, MatSnackBar} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {MessageService} from 'src/app/services/message.service';
import {CartserviceService} from 'src/app/services/cartservice.service';
import {UserService} from 'src/app/services/user.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {RegisterComponent} from '../register/register.component';


@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  books = [];
  myBooks = [];
  registerForm: FormGroup;
  cartItems: any;
  show = false;
  order = false;
  popup = false;
  press = false;
  popDown = false;
  afterCheckout = 'Not true';
  size: any;
  sortTerm: any;
  fullName: any;
  phoneNumber: any;
  locality: any;
  pinCode: any;
  address: any;
  city: any;
  landMark: any;
  locationType: any;
  totalPrice: number = 0;
  searchTerm: string;
  file: any;
  profile: string;
  isLogin = false;
  imgFile: File;
  response: any;
  isImage = false;
  img = 'https://ravi023.s3.ap-south-1.amazonaws.com/1594052103459-profile.png';
  username: string;
  usermail: string;
  person: string;
  token: string;
  cartQuantity: any;
  cartPrice: any;
  itemQuantity: any;
  isEmpty: any;
  isAvailable: any;
  orderId: any;

  constructor(public formBuilder: FormBuilder,
              private dialog: MatDialog,
              private customerDetailsService: CustomerDetailsService,
              private cartService: CartServiceService,
              private cartServices: CartserviceService,
              private router: Router,
              private messageService: MessageService,
              public snackbar: MatSnackBar,
              private userService: UserService,
              private spinner: NgxSpinnerService,
              private data: MessageService,
  ) {
  }

  ngOnInit() {
    // this.getAllBookCart()
    this.afterCheckout = 'Not true';
    this.isEmpty = true;
    this.isAvailable = true;
    // this.cartPrice = this.books.totalPrice
    if (localStorage.getItem(localStorage.getItem('email')) == null) {
      this.isImage = false;
    } else {
      this.isImage = true;
    }
    if (localStorage.getItem('token') != null && localStorage.getItem('roleType') === 'USER') {
      this.messageService.changeCartBook();
      this.data.changeItem(1);
      this.isLogin = true;
      this.img = localStorage.getItem(localStorage.getItem('email'));
      this.usermail = localStorage.getItem('email');
      this.username = localStorage.getItem('name');
    } else {
      this.isLogin = false;
      this.img = 'https://ravi023.s3.ap-south-1.amazonaws.com/1594052103459-profile.png';
    }

    this.messageService.currentCart$.subscribe(message => { // this.myBooks.push(message)
      console.log('ravi', message), this.isEmpty = false, this.itemQuantity = message.quantity,
        this.cartPrice = message.price, console.log('geeth', this.cartPrice),
        this.cartQuantity = 1;
    });

    this.messageService.currentBooksInCart.subscribe((data) => {
      console.log('data', data);
      this.onDisplayBooks(data);
    });

    this.printData();
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern('^[A-Z][a-z]+\\s?[A-Z][a-z]+$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      locality: ['', [Validators.required, Validators.pattern('^[A-Z][a-z\\s]{3,}')]],
      pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}')]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required, Validators.pattern('^[A-Z][a-z]+(?:[\s-][a-zA-Z]+)*$')]],
      landMark: ['', [Validators.required, Validators.pattern('^[A-Z][a-z\\s]{3,}')]],
      // locationType: new FormControl(this.person)
    });


    //  this.getAllBookCart()
  }


  signin() {
    this.dialog.open(LoginComponent, {
      width: '28%',
      height: 'auto'
    });
  }

  signup() {
    this.dialog.open(RegisterComponent, {
      width: '35%',
      height: 'auto'
    });
  }

  delete() {
    localStorage.removeItem(localStorage.getItem('email'));
  }

  Logout() {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key[0] == 'c') {
        var obj = JSON.parse(localStorage.getItem(key));
        this.cartServices.addToBag(obj, key[1]).subscribe((message) => {
        });
      }
    }
    this.img = localStorage.getItem(localStorage.getItem('email'));
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem(this.usermail, this.img);
    location.reload();
  }

  fileUpload($event) {
    this.spinner.show();
    this.setProfilePic($event);
  }

  setProfilePic($event) {
    if (this.isLogin === false) {
      this.snackbar.open('Please Login First', 'Ok', {duration: 2000});
      return;
    }
    this.imgFile = $event.target.files[0];
    var formData = new FormData();
    formData.append('file', this.imgFile);
    this.userService.profilePic(formData).subscribe(
      data => {
        console.log('------------------------------', data);
        this.response = data;
        this.spinner.hide();
        this.img = this.response.data;
        localStorage.setItem(localStorage.getItem('email'), this.response.data);
      },
      err => {
        this.spinner.hide();
        this.snackbar.open('Profile pic uplodation failed!!', 'Ok', {duration: 2000});
      });
  }

  printData() {
    let num1: number = +localStorage.getItem('mycartsize');
    let num2: number = +localStorage.getItem('size');
    this.size = num1 + num2;
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key[0] == 'c') {
        this.books.push(JSON.parse(localStorage.getItem(key)));
      }
    }
  }

  /* getAllBookCart() {
     this.cartService.getBookCart().subscribe((response: any) => {
       this.books = response;
       this.size = response.length;
       console.log("getallbook",response);
     });
   }*/

  onShoping() {
    this.router.navigate(['user-dashboard']);
  }

  onDisplayBooks(data) {
    if (localStorage.getItem('token') !== null && localStorage.getItem('roleType') === 'USER'){
      this.getAllCartBook();
    }
  }


  onPopup() {
    if (this.size >= 1) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') !== null && localStorage.getItem('roleType') !== 'USER') {
        this.dialog.open(LoginComponent, {
          width: '28%',
          height: 'auto'
        });
      }
      this.popup = true;
      this.popDown = true;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key[0] === 'c') {
          const obj = JSON.parse(localStorage.getItem(key));
          this.totalPrice = this.totalPrice + +obj.totalPrice;
          console.log(this.totalPrice);
          console.log(obj);
          const bookId = key.substring(1, key.length);
          this.cartServices.addToBag(obj, bookId).subscribe((message) => {
          });
        }
      }
    }
    this.show = true;
    this.populateUserDetails('home');
  }

  populateUserDetails(locationType: any) {
    for (let i = 0; i < 7; i++) {
      this.customerDetailsService.getUserDetails().subscribe((response: any) => {
        if (locationType === 'home' && response.userDetailsList.length == 0) {
          return;
        }
        if (locationType === 'work' && response.userDetailsList.length == 1) {
          return;
        }
        if (locationType === 'other' && response.userDetailsList.length == 2) {
          return;
        }
        if (locationType === 'home' && response.userDetailsList[0] != null) {
          this.registerForm.value.fullName = response.userDetailsList[0].fullName;
          this.registerForm.value.phoneNumber = response.userDetailsList[0].phoneNumber;
          this.registerForm.value.locality = response.userDetailsList[0].locality;
          this.registerForm.value.pinCode = response.userDetailsList[0].pinCode;
          this.registerForm.value.address = response.userDetailsList[0].address;
          this.registerForm.value.city = response.userDetailsList[0].city;
          this.registerForm.value.landMark = response.userDetailsList[0].landMark;

        }
        if (locationType === 'work' && response.userDetailsList[1] != null) {
          this.registerForm.value.fullName = response.userDetailsList[1].fullName;
          this.registerForm.value.phoneNumber = response.userDetailsList[1].phoneNumber;
          this.registerForm.value.locality = response.userDetailsList[1].locality;
          this.registerForm.value.pincode = response.userDetailsList[1].pinCode;
          this.registerForm.value.address = response.userDetailsList[1].address;
          this.registerForm.value.city = response.userDetailsList[1].city;
          this.registerForm.value.landMark = response.userDetailsList[1].landMark;
        }
        if (locationType === 'other' && response.userDetailsList[2] != null) {
          this.registerForm.value.fullName = response.userDetailsList[2].fullName;
          this.registerForm.value.phoneNumber = response.userDetailsList[2].phoneNumber;
          this.registerForm.value.locality = response.userDetailsList[2].locality;
          this.registerForm.value.pincode = response.userDetailsList[2].pinCode;
          this.registerForm.value.address = response.userDetailsList[2].address;
          this.registerForm.value.city = response.userDetailsList[2].city;
          this.registerForm.value.landMark = response.userDetailsList[2].landMark;
        }
      });
    }
  }


  onQuantity(book: any, event: any) {

    if (event.data >= book.maxQuantity) {
      this.isAvailable = false;
    }
    console.log('index', book.book_id);
    console.log('event', event.data);
    this.cartService.addIteams(book.book_id, event.data).subscribe((response: any) => {
    });


  }


  increaseQuantity(book: any) {
    if (book.quantity > 0) {
      book.quantity++;
      book.totalPrice = (book.totalPrice / (book.quantity - 1)) * book.quantity;
      localStorage.setItem('c' + book.bookId, JSON.stringify(book));
      this.books = [];
      this.printData();
    }
    if (book.maxQuantity > 1 && book.maxQuantity === book.quantity) {
      alert('Last Stock of this book is added successfully');
    }
  }


  decreaseQuantity(book: any) {
    book.quantity--;
    book.totalPrice = (book.totalPrice / (book.quantity + 1)) * book.quantity;
    localStorage.setItem('c' + book.bookId, JSON.stringify(book));
    this.books = [];
    this.printData();
  }

  getQuantitiy(bookId: any): boolean {
    if (this.cartQuantity < 1) {
      return true;
    }
    return false;
  }


  removeAllItemsCart(bookId: any) {
    console.log('ccc', bookId);
    localStorage.removeItem('c' + bookId);
    sessionStorage.removeItem(bookId);
    let num1: number = +localStorage.getItem('mycartsize');
    let num2: number = +localStorage.getItem('size');
    let size1: number = num2;
    size1--;
    if (size1 >= 0) {
      localStorage.setItem('size', JSON.stringify(size1));
      this.messageService.changeItem(1);
    }
    if (localStorage.getItem('token') != null && num1 != 0) {
      this.cartService.removeBookById(bookId).subscribe((response: any) => {
        this.messageService.changeCartBook();
        location.reload();

      });
    }
    this.books = [];
    this.printData();
  }

  onPress() {
    console.log('data1', this.registerForm.value);
    this.token = localStorage.getItem('token');

    if (this.registerForm.valid) {
      this.customerDetailsService.addDetails(this.registerForm.value, this.sortTerm.value, this.token).subscribe((response: any) => {
          console.log('data', this.registerForm.value);
          console.log('response', response);
        }
      );
      this.press = true;
    }
    this.order = true;
  }

  checkout() {
    this.cartService.sendMail().subscribe(response => {
      this.orderId = response.orderId;
      localStorage.setItem('orderId' , response.orderId);
      console.log('orderId',  this.orderId);
    });
    const token = localStorage.getItem('token');
    const emailId = localStorage.getItem('email');
    const name = localStorage.getItem('name');
    const img = localStorage.getItem(localStorage.getItem('email'));
    const roleType = localStorage.getItem('roleType');
    const order = localStorage.getItem('orderId');
    this.cartService.removeAll().subscribe((response: any) => {
      localStorage.clear();
      localStorage.setItem('token', token);
      localStorage.setItem('email', emailId);
      localStorage.setItem('orderId', order);
      localStorage.setItem('name', name);
      localStorage.setItem(localStorage.getItem('email'), img);
      localStorage.setItem('roleType', roleType);
      this.router.navigate(['/order-confirmation']);
    });
  }

  onChange(val: any) {
    this.sortTerm = val;
    this.person = this.sortTerm;
    localStorage.setItem('locationType', this.sortTerm);
    this.populateUserDetails(this.sortTerm.value);
  }

  private getAllCartBook() {
    this.cartServices.getCartList()
  }
}
