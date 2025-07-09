import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../auth';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatInputModule, MatAutocompleteModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  users: any[] = [];
  constructor(private router: Router) {}
  private http = inject(HttpClient);
  private authService = inject(Auth);
  private cdr = inject(ChangeDetectorRef);
  private apiUrl = 'http://localhost:3000/users';
  emailSuggestions: string[] = [];
  private commonDomains: string[] = [
    'scryai.com',
    'gmail.com',
    'outlook.com',
    'yahoo.com',
  ];
  ngOnInit() {}

  delayedAction() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.authService.setToken(res.token);
        this.router.navigate(['/sensex-list']);
      },
      error: (err) => {
        alert('Login failed: ' + err.error.message);
      },
    });
  }

  onLogin() {
    this.errorMessage = '';

    setTimeout(() => this.delayedAction(), 100);
  }

  onInputChange() {
    const [localPart, domainPart] = this.username.split('@');
    if (!domainPart && localPart) {
      this.emailSuggestions = this.commonDomains.map(
        (d) => `${localPart}@${d}`
      );
    } else {
      this.emailSuggestions = [];
    }
    this.cdr.detectChanges();
  }
}
