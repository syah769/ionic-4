import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-updatecustomer',
  templateUrl: './updatecustomer.page.html',
  styleUrls: ['./updatecustomer.page.scss'],
})
export class UpdatecustomerPage implements OnInit {

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
    this.actRoute.params.subscribe((data: any) => {
      this.id = data.id;
      this.name_customer = data.name;
      this.desc_customer = data.desc;
      console.log(data);
      });
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
          const toast = await this.toastController.create({
            message: 'Data updated successful',
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

}
