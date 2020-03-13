import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.authService.getAllUsers().subscribe((response) => {
      this.userData = response;
    });
  }

  addUser() {
    const queryParams = {
      email: 'demo6@test.com',
      password: 'demo6@test.com',
      phoneNo: '8445557899',
      role: 'admin',
      gender: 'male',
      fullName: 'Alex'
    };
    this.authService.addUser(queryParams).subscribe((response) => {
      this.getAllUsers();
    });
  }
}
