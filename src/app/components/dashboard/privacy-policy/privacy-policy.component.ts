import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  public Editor:any = ClassicEditor;
  public privacyForm: any = this.fb.group({
    page: ['privacy'],
    heading: ['Privacy Policy'],

    content: [null, Validators.required]
  });
  constructor(private fb:FormBuilder, private http:HttpService){

  }
  ngOnInit() {
    this.loadData();
  }
  async loadData() {
    await Promise.all([this.getTerm()]);
  }

  async getTerm() {
    try {

      const requestBody = {page: "privacy"}
      const res: any = await this.http.post('cms-get', requestBody,  true).toPromise();
      await this.privacyForm.patchValue({
        content: res?.data?.content,
        heading: res?.data?.heading,

      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  async save() {
    if (this.privacyForm.valid) {
      try {
        const res: any = await this.http
          .post('cms', this.privacyForm.value, true)
          .toPromise();
        console.log(res);
        this.getTerm(); // Refresh after save
      } catch (error) {
        console.error('Error saving privacy:', error);
      }
    }
  }
}
