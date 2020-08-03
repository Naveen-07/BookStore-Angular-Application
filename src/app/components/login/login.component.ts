import {Component, OnInit, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {Login} from 'src/app/models/login.model';
import {MatDialog} from '@angular/material/dialog';
import {RegisterComponent} from '../register/register.component';
import {ForgotpasswordComponent} from '../forgotpassword/forgotpassword.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {
  AuthService,
  SocialUser,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider
} from 'ng-social-login-module';
import {MessageService} from 'src/app/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user: any = SocialUser;

  constructor(
    private socialAuthService: AuthService,
    private dialog: MatDialog,
    public snackbar: MatSnackBar,
    private router: Router,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Login
  ) {
  }

  response: any;
  successMsg: string;
  failedMsg: string;
  incorrectInput: string;
  toggle: boolean;
  isLogin: false;
  reqbody = {
    emailId: null,
    password: null,
    roleType: null,
  };
  model = {};
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(
      '((?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%!]).{8,40})'
    ),
  ]);

  ngOnInit(): void {
  }

  // To display email error message
  getEmailErrorMessage() {
    return this.emailFormControl.hasError('required')
      ? 'Email id is required'
      : this.emailFormControl.hasError('email')
        ? 'Please enter valid email id'
        : ' ';
  }

  // To display password error message
  getPasswordErrorMessage() {
    return this.password.hasError('required')
      ? 'Password is required'
      : this.password.hasError('pattern')
        ? 'Please enter valid password'
        : ' ';
  }

  validate() {
    if (this.emailFormControl.valid && this.password.valid) {
      this.toggle = false;
      return 'false';
    }
    this.toggle = true;
    return 'true';
  }

  login() {
    this.spinner.show();
    this.reqbody.emailId = this.emailFormControl.value;
    this.reqbody.password = this.password.value;
    const currentUrl = this.router.url;
    this.reqbody.roleType = 'USER';
    if (currentUrl.localeCompare('http://localhost:4200/adminDashboard/seller-list')) {
      this.reqbody.roleType = 'ADMIN';
    }
    if (currentUrl.localeCompare('http://localhost:4200/sellerDashboard/display-books')) {
      this.reqbody.roleType = 'SELLER';
    }
    console.log('reqbody', this.reqbody);
    this.userService.login(this.reqbody).subscribe(
      (data) => {
        console.log(data);
        this.dialogRef.close();
        this.spinner.hide();
        this.response = data;
        localStorage.setItem('email', this.reqbody.emailId);
        localStorage.setItem('name', this.response.message);
        if (this.response.roleType === 'SELLER') {
          localStorage.setItem('token', this.response.data);
          localStorage.setItem('roleType', this.response.roleType);
          this.router.navigate(['sellerDashboard']);
          location.reload();
          return;
        }
        if (this.response.roleType === 'ADMIN') {
          localStorage.setItem('token', this.response.data);
          localStorage.setItem('roleType', this.response.roleType);
          this.router.navigate(['adminDashboard']);
          location.reload();
          return;
        }

        localStorage.setItem('token', this.response.data);
        localStorage.setItem('roleType', this.response.roleType);
        location.reload();
      },
      (err) => {
        this.spinner.hide();
        this.snackbar.open('Invalid Credential', 'Ok', {duration: 5000});
      }
    );
  }

  register() {
    this.dialogRef.close();
    this.dialog.open(RegisterComponent, {
      width: '35%',
      height: 'auto',
    });
  }

  forgotpassword() {
    this.dialogRef.close();
    this.dialog.open(ForgotpasswordComponent, {
      width: '30%',
      height: 'auto',
    });
  }

  facebookLogin() {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(userData => {
        this.user = userData;
        localStorage.setItem('token', userData.token);
        localStorage.setItem(userData.email, userData.photoUrl);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('name', userData.name);
        localStorage.setItem('loginType', 'SOCIAL');
        location.reload();
      });
  }

  googleLogin() {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(userData => {
        this.user = userData;
        localStorage.setItem('token', userData.token);
        localStorage.setItem(userData.email, userData.photoUrl);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('name', userData.name);
        localStorage.setItem('loginType', 'SOCIAL');
        location.reload();
        // this.userService.login({userName: userData.email, password: 'googlelogin'}).subscribe(data => {
        //   console.log('loged in with google');
        // });
      });
  }

  linkdeinLogin() {
    this.socialAuthService
      .signIn(LinkedinLoginProvider.PROVIDER_ID)
      .then(userData => {
        this.user = userData;
        console.log(userData.token);
        console.log(userData.photoUrl);
        console.log(userData.email);
        console.log(userData.name);
      });
  }
}
