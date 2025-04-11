import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/shared/services/helper.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  public settingForm: any = this.fb.group({
    address: [null, Validators.required],
    phone: [null, Validators.required],
    fb: [null, Validators.required],
    twitter: [null, Validators.required],
    linkedin: [null, Validators.required],
    lat: [null, Validators.required],
    lng: [null, Validators.required],
    email: [null, Validators.required],
  });

  constructor(private fb: FormBuilder, private http: HttpService, private router:Router) {}
  ngOnInit() {
    this.getSetting(); // Call getSetting directly
  }

  async loadData() {
    await Promise.all([this.getSetting()]);
  }



  async saveSetting() {
    await this.http
      .post('setting/create', this.settingForm.value, true)
      .subscribe((res: any) => {
        console.log(res);
      });
  }


  async getSetting() {
    try {
      const res: any = await this.http.get('setting/get_settings', true).toPromise();
      this.settingForm.patchValue(res?.settings[0]);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }


}
