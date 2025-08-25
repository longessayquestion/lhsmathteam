import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})

export class HomePage {
  constructor(private router: Router, private navCtrl: NavController) {}
  x = 0; // Only X position needed

  moveBox(x: number) {
    this.x = x;
  }

  getTransform(): string {
    return `translateX(${this.x}vw)`;
  }

  goToInfoPage() {
    this.navCtrl.navigateForward(['/info']);
  }

  goToCoachesPage() {
    this.navCtrl.navigateForward(['/coaches']);
  }

  goToSignInPage() {
    this.navCtrl.navigateForward(['/signin']);
  }

  goToIctmPage() {
    this.navCtrl.navigateForward(['/ictm']);
  }

  goToHomePage() {
    this.navCtrl.navigateRoot(['/home']);
  }

  showGameMessage = false;

  showComingSoon() {
    this.showGameMessage = true;
    setTimeout(() => (this.showGameMessage = false), 2500);
  }

  userName: string = '';
  grade: string = '';

  ionViewWillEnter() {
    this.userName = localStorage.getItem('loggedInUserName') || 'Guest';
    this.grade = localStorage.getItem('loggedInGrade') || 'Welcome!';
  }
}
