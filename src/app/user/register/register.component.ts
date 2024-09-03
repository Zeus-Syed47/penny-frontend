import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public newFirstname: any;
  public newLastname: any;
  public newEmail: any;
  public newPassword: any;
  public newMobileNo: any;
  public newApiKey: any;

  constructor(
    public appService: ApiService,
    public toastr: ToastrManager,
    public router: Router
  ) {}

  public goToSignin: any = () => {
    this.router.navigate(['/login']);
  };
  public signUp: any = () => {
    if (!this.newFirstname) {
      this.toastr.warningToastr('Enter Firstname Properly!!!!');
    } else if (!this.newLastname) {
      this.toastr.warningToastr('Enter Lastname Properly!!!!');
    } else if (!this.newEmail) {
      this.toastr.warningToastr('Enter email Properly!!!!');
    } else if (!this.newPassword) {
      this.toastr.warningToastr('Enter Password Properly!!!!');
    } else if (!this.newMobileNo) {
      this.toastr.warningToastr('Enter Mobile Number Properly!!!!');
    } else {
      let data = {
        first_name: this.newFirstname,
        last_name: this.newLastname,
        email: this.newEmail,
        password: this.newPassword,
        phone_number: this.newMobileNo,
      };
      this.appService.signupFunction(data).subscribe(
        (apiResponse) => {
          if (apiResponse.status === 200) {
            this.toastr.successToastr(
              'user registration successful! Start Logging in'
            );

            setTimeout(() => {
              this.goToSignin();
            }, 2000);
          } else {
            this.toastr.errorToastr(apiResponse.message);
            if (apiResponse.message === 'User already Present') {
              setTimeout(() => {
                this.goToSignin();
              }, 2000);
            }
          }
        },
        (err) => {
          this.toastr.errorToastr('some error occured!!');
        }
      );
    }
  };

  ngOnInit(): void {}
}
