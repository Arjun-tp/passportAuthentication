import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const query = {
      email: this.loginForm.value['email'],
      password: this.loginForm.value['password']
    }
    this.loading = true;
    this.authService.login(query)
      .subscribe(
        (data: any) => {
          if (data && data.token) {
            this.toastr.success('Login Successful!');
            localStorage.setItem('token', data.token) //add token to localstorage
            this.router.navigate(['/home']);
          } else {
            this.toastr.error('Login Unsuccessful!');
            this.loading = false;
          }
        },
        error => {
          this.loading = false;
        });
  }

}
