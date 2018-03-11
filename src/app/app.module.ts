import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { AdminPage, NewUserPage, EditUserPage, FiltersPage, BarcodeScanPage, CameraPage, FindProductsPage } from '../pages/pages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserService, FilterService, ProductService } from '../shared/shared';
import { UrlBuilder } from '../shared/external/url-builder.util';
import { adminUrlBuilderProvider } from '../shared/external/admin-url-builder.config';
import { FilterName } from 'src/enums/filter-name.enum';

import { ModalToolbarComponent, UserModifyComponent, UsersListComponent, RolesListComponent  } from '../pages/components/components';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';


@NgModule({
  declarations: [
    MyApp,
    AdminPage,
    NewUserPage,
    EditUserPage,
    FiltersPage,
    BarcodeScanPage,
    CameraPage,
    FindProductsPage,

    ModalToolbarComponent,
    UserModifyComponent,
    UsersListComponent,
    RolesListComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AdminPage,
    NewUserPage,
    EditUserPage,
    FiltersPage,
    BarcodeScanPage,
    CameraPage,
    FindProductsPage
  ],
  exports:[
    ModalToolbarComponent,
    UserModifyComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    FilterService,
    {provide: UrlBuilder, useFactory: adminUrlBuilderProvider},
    BarcodeScanner,
    ProductService,
    Camera,
    GoogleMaps
  ]
})
export class AppModule {}
