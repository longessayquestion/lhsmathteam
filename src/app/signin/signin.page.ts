import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption } from '@ionic/angular/standalone';

import { app } from '../../firebase';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';

const db = getFirestore(app);

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, CommonModule, FormsModule],
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SignInPage implements OnInit {
  constructor(private router: Router) {}

  form = {
    username: '',
    password: '',
    grade: ''
  };

  errorMessage: string = '';
  errorDetails: string = '';
  loggedInUserName: string | null = null;

  async onSubmit() {
    try {
      const q = query(
        collection(db, 'users'),
        where('username', '==', this.form.username),
        where('password', '==', this.form.password),
        where('grade', '==', this.form.grade)
      );

      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        localStorage.setItem('loggedInUserName', userData['name']);
        localStorage.setItem('loggedInGrade', userData['grade']);
        this.errorMessage = ''; // clear any previous error
        this.errorDetails = '';
        this.loggedInUserName = userData['name'];
        this.goToHomePage();
      } else {
        this.errorMessage = 'Invalid username, password, or grade.';
        this.errorDetails = `Tried username=${this.form.username} grade=${this.form.grade}`;
      }
    } catch (error) {
      console.error('Error signing in:', error);
      this.errorMessage = 'An unexpected error occurred while signing in.';
      this.errorDetails = (error as Error)?.message || String(error);
    }
  }

  goToHomePage() {
    this.router.navigate(['/home']);
  }

  signOutUser() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('✅ User signed out');
        localStorage.removeItem('loggedInUserName');
        localStorage.removeItem('loggedInGrade');
        this.loggedInUserName = null;
        this.errorMessage = '';
        this.errorDetails = '';
        this.goToHomePage();
      })
      .catch((error) => {
        console.error('❌ Sign out error:', error);
        this.errorMessage = '❌ Error signing out.';
        this.errorDetails = (error as Error)?.message || String(error);
      });
  }

  ngOnInit(): void {
    const name = localStorage.getItem('loggedInUserName');
    this.loggedInUserName = name && name !== 'Guest' ? name : null;
  }
}
