import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../firebase';
import { Router } from '@angular/router';

const db = getFirestore(app);

@Component({
  selector: 'app-ictm',
  templateUrl: './ictm.page.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})

export class ICTMPage implements OnInit {

  constructor(private router: Router) {}

  questions: any[] = [];
  currentQuestionIndex = 0;
  userAnswer = '';
  message = '';

  async ngOnInit() {
    const snapshot = await getDocs(collection(db, 'questions'));
    this.questions = snapshot.docs.map(doc => doc.data());
    console.log('📚 Questions loaded:', this.questions);
  }

  submitAnswer() {
    const current = this.questions[this.currentQuestionIndex];
    if (this.userAnswer.trim() === current.correctAnswer.trim()) {
      this.message = '✅ Correct!';
    } else {
      this.message = '❌ Try again!';
    }
    this.userAnswer = '';
  }

  nextQuestion() {
    this.message = '';
    this.userAnswer = '';
    this.currentQuestionIndex++;
  }

  goToHomePage() {
    this.router.navigate(['/home']);
  }
}