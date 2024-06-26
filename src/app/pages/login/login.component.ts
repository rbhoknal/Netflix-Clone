declare var google: any;
import { Component, DoCheck, OnChanges, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  private router = inject(Router);

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '1074334929821-pe9s77rj2r33tu2ogadbe17ltur4g3r2.apps.googleusercontent.com',
      callback: (resp: any) =>
        //console.log(resp);
        this.handleLogin(resp)
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350
    })
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any) {
    if(response) {
      //decode the token
      const payLoad = this.decodeToken(response.credential);
      //store in session
      sessionStorage.setItem("loggedInUser", JSON.stringify(payLoad));
      //navigate to home/browse
      this.router.navigate(['browse']);
    }
  }

}
