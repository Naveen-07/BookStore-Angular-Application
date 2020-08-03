import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SellerComponent } from './components/seller/seller.component';
import { UserComponent } from './components/user/user.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { DisplayBooksComponent } from './components/display-books/display-books.component';
import { UserBooksComponent } from './components/user-books/user-books.component';
import { DisplayBookComponent } from './components/display-book/display-book.component';
import { UserService } from './services/user.service';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
} from '@angular/material';
import { SellerService } from './services/seller.service';
import { MessageService } from './services/message.service';
import { AuthguardService } from './services/authguard.service';
import { AuthserviceService } from './services/authservice.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AppMaterial } from './app.material.module';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { MatDialogModule } from '@angular/material/dialog';

import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { BookFilterPipe } from './components/display-books/book-filter.pipe';
import {SellerSearchPipe} from './components/sellers-list/sellerSearch.pipe';
import { SortbypricePipe } from './components/user-books/sortbyprice.pipe';
import { AdminsComponent } from './components/admins/admins.component';
import { AdminBooksComponent } from './components/admin-books/admin-books.component';
import { VerifydialogComponent } from './components/verifydialog/verifydialog.component';
import { SellersListComponent } from './components/sellers-list/sellers-list.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { VerificationComponent } from './components/verification/verification.component';
import { BookRejectionComponent } from './components/bookRejection/bookRejection.component';
import {SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider} from 'ng-social-login-module';
// import * as firebase from 'firebase';
// import TwitterAuthProvider = firebase.auth.TwitterAuthProvider;

const config = new AuthServiceConfig(
  [
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        '511931713819-klkecibn7sikbtm9hcp3ptfh5omm73v7.apps.googleusercontent.com'
      )
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('604139767205069')
    },
    {
      id: LinkedinLoginProvider.PROVIDER_ID,
      provider: new LinkedinLoginProvider("86s0f5lfcv3x12")
    }
  ],
  false
);
export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    AdminsComponent,
    OrderConfirmationComponent,
    SellersListComponent,
    RegisterComponent,
    SortbypricePipe,
    BookFilterPipe,
    SellerSearchPipe,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    SellerComponent,
    UserComponent,
    AddBookComponent,
    UpdateBookComponent,
    DisplayBooksComponent,
    UserBooksComponent,
    AdminBooksComponent,
    OrderSummaryComponent,
    DisplayBookComponent,
    VerifydialogComponent,
    WishlistComponent,
    VerificationComponent,
    BookRejectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatMenuModule,
    MatSnackBarModule,
    AppMaterial,
    BrowserModule,
    NoopAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxPaginationModule,
    MatPaginatorModule,
    SocialLoginModule,
  ],
  providers: [
    {provide: AuthServiceConfig,
    useFactory: provideConfig},
    AsyncPipe,
    UserService,
    SellerService,
    MessageService,
    AuthguardService,
    AuthserviceService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
