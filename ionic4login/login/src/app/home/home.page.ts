import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string;
  anggota: any;
  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPvdr: PostProvider,
    private storage: Storage,
    ) { }

    ionViewWillEnter() {
      this.storage.get('session_storage').then((res) => {
        this.anggota = res;
        this.username = this.anggota.username;
      });
    }

    async proseslogout() {
      this.storage.clear();
      this.router.navigate(['/login']);
      const toast = await this.toastController.create({
        message: 'Logout successful',
        duration: 2000
       });
      toast.present();

    }

}
