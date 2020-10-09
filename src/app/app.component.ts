import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'maxim-blog';
  canEdit: boolean;
  private _loginSub: Subscription;

  constructor(private router: Router, private auth: AuthService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this._loginSub = this.auth.loginEmitter
                      .subscribe( value => 
                        {
                          this.canEdit = value;
                          this.cdRef.detectChanges();
                        });
  }

  ngOnDestroy() {
    this._loginSub.unsubscribe();
  }

  logout() {
    this.auth.signOut()
      .then( () => {
        this.cdRef.detectChanges();
        this.router.navigate([""]);
      } ) // Show success message
      .catch(e => console.log(e)) // Show error message
    }
}
