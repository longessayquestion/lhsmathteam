import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.page.html',
  styleUrls: ['./coaches.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CoachesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToHomePage() {
    this.router.navigate(['/home']);
  }
}
