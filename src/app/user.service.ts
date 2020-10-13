import { Injectable, Inject, Optional, NgZone, PLATFORM_ID, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS, FIREBASE_APP_NAME, FirebaseOptions, FirebaseAppConfig } from '@angular/fire'
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AngularFireAuth implements OnDestroy {
  private _unsubscribe: firebase.Unsubscribe;
  loginEmitter: ReplaySubject<boolean> = new ReplaySubject(3);

  constructor(
    @Inject(FIREBASE_OPTIONS) options: FirebaseOptions,
    @Optional() @Inject(FIREBASE_APP_NAME) nameOrConfig: string | FirebaseAppConfig | null | undefined,
    @Inject(PLATFORM_ID) platformId: Object,
    zone: NgZone
  ) {
    super(options, nameOrConfig, platformId, zone);

    this.setPersistence("local");
    this.onAuthStateChanged( user => {
      if (user) this.loginEmitter.next(true);
      else this.loginEmitter.next(false);
    }).then( value => this._unsubscribe = value );
  }
  
  ngOnDestroy() {
    this._unsubscribe();
  }
}
