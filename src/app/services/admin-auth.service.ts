import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private fireDb: AngularFireDatabase) { }

  isAuthenticated: boolean = false;
  async AdminLogin(username, password) {

    setTimeout(() => {
      var ref = this.fireDb.database.ref("Admins");
      ref.get().then(snapshot => {

        if (snapshot.exists()) {

          snapshot.forEach(x => {
            if (username == x.val().username && password == x.val().password) {

              this.isAuthenticated = true;
              console.log('user has been found');
            }

          })

        }

      })
    }, 2000);

    return this.isAuthenticated;
  }
}
