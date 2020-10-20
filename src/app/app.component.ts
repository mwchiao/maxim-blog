import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from './toast.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'maxim-blog';
  canEdit: boolean;
  private _loginSub: Subscription;

  constructor(
    private router: Router, 
    private auth: UserService, 
    private cdRef: ChangeDetectorRef, 
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this._loginSub = this.auth.loginEmitter
                      .subscribe( value => {
                        this.canEdit = value;
                        this.cdRef.detectChanges();
                      });
  }

  ngOnDestroy(): void {
    this._loginSub.unsubscribe();
  }

  logout(): void {
    this.auth.signOut()
      .then( () => {
        const successMsg = "Successfully logged out";
        this.toast.displayMessage(successMsg, "success");
        this.cdRef.detectChanges();
      }) // Show success message
      .catch(error => {
        const errMsg = "Something went wrong: " + error.message;
        this.toast.displayMessage(errMsg, "error");
      }); // Show error message
  }
}
