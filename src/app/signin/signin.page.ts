import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { app } from '../../firebase';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';

const db = getFirestore(app);

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SignInPage {
  constructor(private router: Router) {}

  form = {
    username: '',
    password: '',
    grade: ''
  };

  errorMessage: string = '';

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
        this.goToHomePage();
      } else {
        this.errorMessage = '❌ Invalid username, password, or grade.';
      }
    } catch (error) {
      console.error('❌ Error signing in:', error);
      this.errorMessage = 'An error occurred. Please try again.';
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
        this.goToHomePage();
      })
      .catch((error) => {
        console.error('❌ Sign out error:', error);
      });
  }
}
