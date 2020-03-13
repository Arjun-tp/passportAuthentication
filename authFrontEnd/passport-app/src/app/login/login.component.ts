import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service'
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
    console.log('**************************************', this.loginForm.value['email'])
    console.log('**************************************', this.loginForm.value['password'])

    const query = {
      email: this.loginForm.value['email'],
      password: this.loginForm.value['password']
    }
    console.log('**************************************', query)

    this.loading = true;
    this.authService.login(query)
      .subscribe(
        (data: any) => {
          console.log('data===========', data)
          if(data && data.token){
            this.toastr.success('Login Unsuccessful!');
            this.router.navigate(['/home']);
          }else {
            this.toastr.error('Login Unsuccessful!');
          }
        },
        error => {
          this.loading = false;
        });
  }

}
