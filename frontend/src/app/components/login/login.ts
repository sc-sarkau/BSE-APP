import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../auth';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  users: any[] = [];
  constructor(private router: Router) {}
  private http = inject(HttpClient);
  private authService = inject(Auth);
  private cdr = inject(ChangeDetectorRef);
  private apiUrl = 'http://localhost:3000/users';
  ngOnInit(){
    // this.router.navigate(['/sensex-list']);
    // this.http.get<any[]>(this.apiUrl).subscribe(data => {
    //   this.users = data;
    //   console.log(this.users[0].username);
    //   this.cdr.detectChanges();
    // });
  }
  
  delayedAction() {
    // if (this.username && this.password){
    //   for (let i = 0; i < this.users.length; i++) {
    //     if((this.username==this.users[i].username || this.username==this.users[i].email) && this.password==this.users[i].password){
    //       localStorage.setItem('username', this.users[i].username);
          
    //       console.log('Username stored:', localStorage.getItem('username'));
    //       this.router.navigate(['/sensex-list']);
    //       break;
    //     }
    //     else if(i==this.users.length-1){
    //       this.errorMessage = "Invalid ID or password";
    //       this.cdr.detectChanges();
    //       console.log("Invalid User Name");
    //     }      
        
    //   }
    // }
    this.authService.login(this.username, this.password).subscribe({
    next: (res) => {
      this.authService.setToken(res.token);
      this.router.navigate(['/sensex-list']);
    },
    error: (err) => {
      alert('Login failed: ' + err.error.message);
    }
  });
  }

  onLogin() {
    this.errorMessage = "";
    
    setTimeout(() => this.delayedAction(),100);
    
    // localStorage.setItem('username', this.username);
    // console.log('Username stored:', localStorage.getItem('username'));
    // this.router.navigate(['/user-list']);
  }
}
