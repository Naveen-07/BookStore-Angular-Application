import {Component, OnInit} from '@angular/core';
import {OrderconfirmationService} from '../../services/orderConfirmation/orderconfirmation.service';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from 'src/app/services/user.service';
import {MessageService} from 'src/app/services/message.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {CartserviceService} from 'src/app/services/cartservice.service';
import {WishlistService} from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  isBookFormOpened = false;
  searchTerm: string;
  file: any;
  profile: string;
  isLogin = false;
  popup = false;
  popDown = false;
  imgFile: File;
  response: any;
  isImage = false;
  img = 'https://ravi023.s3.ap-south-1.amazonaws.com/1594052103459-profile.png';
  username: string;
  usermail: string;
  item: any;
  wishitem: any;
  orderId: any;

  constructor(
    private ordercinfirmation: OrderconfirmationService,
    private dialog: MatDialog,
    public snackbar: MatSnackBar,
    private userService: UserService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private cartServices: CartserviceService,
    private data: MessageService,
    private wishlistService: WishlistService) {
  }

  ngOnInit() {
    this.orderId = +localStorage.getItem('orderId');
    this.messageService.changeMessages();
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
    // for (let i = 0; i < localStorage.length; i++) {
    //   const key = localStorage.key(i);
    //   if (key[0] === 'c') {
    //     const obj = JSON.parse(localStorage.getItem(key));
    //     this.cartServices.addToBag(obj, key[1]).subscribe((message) => {
    //     });
    //   }
    // }
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

  fetchOrderId(): any {
    console.log(this.orderId);
    return '#' + +localStorage.getItem('orderId');
  }
}
