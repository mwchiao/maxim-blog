import { Injectable, OnDestroy} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class AuthService implements OnDestroy {
  private _unsubscribe: firebase.Unsubscribe;
  loginEmitter: ReplaySubject<boolean> = new ReplaySubject(3);

  constructor(private auth: AngularFireAuth) { 
    this.auth.setPersistence("local");
    this.auth.onAuthStateChanged( user => {
      if (user) this.loginEmitter.next(true);
      else this.loginEmitter.next(false);
    }).then( value => this._unsubscribe = value );
  }

  ngOnDestroy() {
    this._unsubscribe();
  }

  signIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.auth.signOut()
  }
}
