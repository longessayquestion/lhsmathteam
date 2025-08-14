import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})

export class HomePage {
  constructor(private router: Router) {}
  x = 0; // Only X position needed

  moveBox(x: number) {
    this.x = x;
  }

  getTransform(): string {
    return `translateX(${this.x}vw)`;
  }

  getCenterImageTransform(): string {
    return `translate(calc(-50% + ${this.x}vw), -90%)`;
  }

  goToInfoPage() {
    this.router.navigate(['/info']);
  }

  goToCoachesPage() {
    this.router.navigate(['/coaches'])
  }

  goToSignInPage() {
    this.router.navigate(['/signin'])
  }

  goToIctmPage() {
    this.router.navigate(['/ictm'])
  }

  userName: string = '';
  grade: string = '';

  ionViewWillEnter() {
    this.userName = localStorage.getItem('loggedInUserName') || 'Guest';
    this.grade = localStorage.getItem('loggedInGrade') || 'Welcome!';
  }
}
