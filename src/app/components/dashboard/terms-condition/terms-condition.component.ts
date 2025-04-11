import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';
@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss'],
})
export class TermsConditionComponent {
  public Editor:any = ClassicEditor;
  public termForm: any = this.fb.group({
    page: ['terms'],
    heading: ['terms'],

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

      const requestBody = {page: "terms"}
      const res: any = await this.http.post('cms-get', requestBody,  true).toPromise();
      await this.termForm.patchValue({
        content: res?.data?.content,
        heading: res?.data?.heading,

      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  async save() {
    if (this.termForm.valid) {
      try {
        const res: any = await this.http
          .post('cms', this.termForm.value, true)
          .toPromise();
        console.log(res);
        this.getTerm(); // Refresh after save
      } catch (error) {
        console.error('Error saving terms:', error);
      }
    }
  }
}
