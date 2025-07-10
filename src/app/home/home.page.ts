import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})

export class HomePage {
  x = 0; // Only X position needed

  moveBox(x: number) {
    this.x = x;
  }

  getTransform(): string {
    return `translateX(${this.x}px)`;
  }

  getCenterImageTransform(): string {
    return `translate(calc(-50% + ${this.x}px), -90%)`;
  }
}
