import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private error: string;
  private user;

  email = new FormControl('');
  password = new FormControl('');

  constructor(private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  handleSubmit(): void {
    console.log('Component: ', this.email.value, ' ', this.password.value);
    this.authenticationService.login(this.email.value, this.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.user = data;
          console.log('logged in user: ', this.user);
          this.router.navigate(['/home']);
        },
        error => {
          this.error = error;
        }
      );

  }
}
