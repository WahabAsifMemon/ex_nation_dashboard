import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  public user: any;
  user_categories: any;
  public active_events: any;
  public user_jobs: any;
  public postLength: number = 0;
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  public modalReference: any;

  constructor(private route: ActivatedRoute, private http: HttpService, private fb: FormBuilder, private modalService: NgbModal) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      let userId = params['id'];
      this.loadData(userId)
    });
  }

  async loadData(id: any) {
    await Promise.all([this.getUser(id)]);
  }

  async getUser(user_id: any) {
    try {
      const requestBody = { user_id };
      const res: any = await this.http.post(`user-profile`, requestBody, true).toPromise();
      this.user = res?.data;
      this.user_categories = res?.data?.user_category ? [res?.data?.user_category] : [];

      this.active_events = this.user?.active_event || [];
      this.user_jobs = this.user?.jobs || [];

      console.log('>',  this.active_events)
      console.log(res);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  proceed() {
    this.modalReference.close();
  }

  open(content: any, state: string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
  }
}
