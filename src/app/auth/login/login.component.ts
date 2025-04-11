import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public show: boolean = false;
  public errorMessage: any;
  public loginForm: any = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  }); 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpService,
  ) {
  }

  ngOnInit() {}

  showPassword() {
    this.show = !this.show;    
  }
  login() {
    this.http.post('admin-login', this.loginForm.value, false).subscribe((res: any) => {
      console.log(res, "hello");
      localStorage.setItem('token', JSON.stringify(res?.access_token))
      this.router.navigate(['/dashboard/home'])
    })   
  }
}
