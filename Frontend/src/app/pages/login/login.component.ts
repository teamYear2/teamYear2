import { Component } from '@angular/core';
import { Navbar } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-login',
  imports: [Navbar],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login {}
