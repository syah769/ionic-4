import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { async } from 'q';


@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.page.html',
  styleUrls: ['./addcustomer.page.scss'],
})
export class AddcustomerPage implements OnInit {

  name_customer: string = '';
  desc_customer: string = '';
  id: number;

  constructor(
    private postPvdr: PostProvider,
    private router: Router,
    public toastController: ToastController,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
   
  }

  async createdProses() {
    if (this.name_customer == '') {
      const toast = await this.toastController.create({
        message: 'Customer name is required',
        duration: 2000
      });
      toast.present();
    } else if (this.desc_customer == '') {
      const toast = await this.toastController.create({
        message: 'Decsription is required',
        duration: 2000
        });
      toast.present();
    } else {
      let body = {
        aksi: 'add',
        name_customer : this.name_customer,
        desc_customer : this.desc_customer
      };
      this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
        var alertpesan = data.msg;
        if (data.success) {
          this.router.navigate(['/customer']);
          const toast = await this.toastController.create({
            message: 'Data inserted successful',
            duration: 2000
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: alertpesan,
            duration: 2000
          });
        }
      });
    }
  }

  async updateProses() {
    if (this.name_customer == ''){
      const toast = await this.toastController.create({
        message: 'Customer is required',
        duration: 2000
      });
      toast.present();
    } else if (this.desc_customer == ''){
      const toast = await this.toastController.create({
        message: 'Description is required',
        duration: 2000
      });
      toast.present();
    } else {
      let body = {
        aksi: 'update',
        customer_id : this.id,
        name_customer : this.name_customer,
        desc_customer : this.desc_customer,
      };
      this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
        var alertpesan = data.msg;
        if (data.success) {
          this.router.navigate(['/customer']);
          const toast =await this.toastController.create({
            message: 'Data updated successful',
            duration: 2000
          });
          toast.present();
        } else {
          const toast =await this.toastController.create({
            message: alertpesan,
            duration: 2000
          });
        }
      });


    }
  }
}
