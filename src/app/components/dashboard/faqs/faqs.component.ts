import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent {
  public Editor:any = ClassicEditor;
  public faqs: [] = [];
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  public selectedFaq: any;
  public modalReference: any;
  public state: boolean = false;
  public faqForm: any = this.fb.group({
    question: [null, Validators.required],
    answer: [null, Validators.required],
  });
  constructor(
    private http: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
  ) {}
  userForm: any = this.fb.group({
    id: [null, Validators.required],
    status: [null, Validators.required],
  });
  ngOnInit() {
    this.loadData();
  }
  open(content: any, state: string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
    this.state = state == 'edit' ? true : false;
    if (state == 'edit') {
      const { id, question, answer } = this.selectedFaq || {};
      this.faqForm.addControl('id', new FormControl(id));
      this.faqForm.patchValue({
        ...this.faqForm.value,
        question,
        answer,
      });
    }
  }
  proceed() {
    this.modalReference.close();
    this.faqForm.reset();
    this.faqForm.removeControl('id');
    this.faqForm.removeControl('status');
    this.state = false;
  }
  async loadData() {
    await Promise.all([this.getFaqs()]);
  }

  save(modal: boolean) {
    if (!this.state) {
      this.faqForm.patchValue({
        ...this.faqForm.value,
        position: this.faqs?.length + 1,
      });
    }
    this.http
      .post('faq/create-faq', this.faqForm.value, true)

      .subscribe({
        next: () => {
          if (modal) {
            this.proceed();
          }
          this.faqForm.reset();
        },
        complete: () => {
          this.getFaqs();
          this.faqForm.removeControl('id');
          this.faqForm.removeControl('status');
          this.state = false;
        },
      });
  }



  async getFaqs() {
    try {
      const res: any = await this.http.get('faq/get-all-faq', true).toPromise();
      console.log(res);
      this.faqs = res?.faqs;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async stateItem(event: any, data: any) {
    this.selectedFaq = this.faqs?.find((e: any) => e?.id == event.id);
    if (this.selectedFaq) {
      const { id, question, answer } = this.selectedFaq || {};
      this.faqForm.patchValue({
        ...this.faqForm.value,
        question,
        answer,
      });

      this.faqForm.addControl('id', new FormControl(id));
      this.faqForm.addControl(
        'status',
        new FormControl(data.target.checked ? 1 : 0)
      );
      console.log(this.faqForm.value);
    }

    this.save(false);
  }

  deleteFaq(id: number) {
    this.http.post(`delete-faq/${id}`, {}, true).subscribe(
      () => {
        console.log(this.faqForm.value);
        this.getFaqs();
      },
      (error) => {
        console.error('Error deleting video:', error);
      }
    );
  }


}
