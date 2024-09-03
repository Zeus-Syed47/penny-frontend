import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  public usersArray: any = [];
  constructor(public appService: ApiService, public router: Router) {}

  public fetchUsers: any = () => {
    this.appService.getUsers().subscribe(
      (apiResponse) => {
        console.log(apiResponse);
        if (apiResponse.status === 200) {
          // this.router.navigate(['/login']);
          this.usersArray = apiResponse.data;
        }
      },
      (err) => {
        // this.toastr.errorToastr('some error occured!!');
      }
    );
  };

  public logOut: any = () => {
    this.appService.logout().subscribe(
      (apiResponse) => {
        Cookie.delete('authToken');
        if (apiResponse.status === 200) {
          this.router.navigate(['/login']);
        }
      },
      (err) => {
        // this.toastr.errorToastr('some error occured!!');
      }
    );
  };

  ngOnInit(): void {
    this.fetchUsers();
  }
}
