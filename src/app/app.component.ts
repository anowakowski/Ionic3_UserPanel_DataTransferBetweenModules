import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AdminPage, BarcodeScanPage, CameraPage, FindProductsPage } from '../pages/pages';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AdminPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackOpaque();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  goToBarcodeScan(){
    this.nav.push(BarcodeScanPage);
  }

  goToCamera(){
    this.nav.push(CameraPage);
  }

  goToFindProducts(){
    this.nav.push(FindProductsPage);
  }

  backToAdminPage()  {
    this.nav.popToRoot();
  }
}
