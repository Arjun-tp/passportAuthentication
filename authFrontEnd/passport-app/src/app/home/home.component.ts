import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData: any
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAllUsers().subscribe((response) =>{
      this.userData = response;
      console.log('response---------', response)
    })
  }



}
