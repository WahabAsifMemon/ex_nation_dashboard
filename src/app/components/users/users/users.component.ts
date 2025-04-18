import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users: [] = [];
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  public heading: string;
  public modalReference: any;
  public state: boolean = false;
  public selectedUser: any;
  public Editor:any = ClassicEditor;

  public userForm: any = this.fb.group({
    name: [null, Validators.required],
    phone: [null, Validators.required],
    password: [null],
    business_name: [null],
    business_address: [null],
    country: [null],
    city: [null],
    state: [null],



  });
  constructor(
    private http: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private route: ActivatedRoute,

  ) {}

  // ngOnInit() {
  //   this.loadData();
      
  // }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.heading = data['name'];
      this.getUsers();
    });
      
  }

  // async loadData() {
  //   await Promise.all([this.getUsers()]);
  // }


  open(content: any, state: string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
    this.state = state == 'edit' ? true : false;
    if (state == 'edit') {
      const { id, name, phone, password, business_name,
        business_address,
        country,
        city,
        state, } = this.selectedUser || {};
      this.userForm.addControl('id', new FormControl(id));
      this.userForm.patchValue({
        ...this.userForm.value,
        name,
        phone,
        password,
        business_name,
        business_address,
        country,
        city,
        state,
      });
    }
  }
  proceed() {
    this.modalReference.close();
    this.userForm.reset();
    this.userForm.removeControl('id');
    this.userForm.removeControl('status');
    this.state = false;
  }

  save(modal: boolean) {
    if (!this.state) {
      this.userForm.patchValue({
        ...this.userForm.value,
        position: this.users?.length + 1,
      });
    }

    // Remove null or undefined values
  Object.keys(this.userForm.value).forEach((key) => {
    if (this.userForm.value[key] == null) {
      delete this.userForm.value[key];
    }
  });

    this.http
      .post('updateUser', this.userForm.value, true)

      .subscribe({
        next: () => {
          if (modal) {
            this.proceed();
          }
          this.userForm.reset();
        },
        complete: () => {
          this.getUsers();
          this.userForm.removeControl('id');
          this.userForm.removeControl('status');
          this.state = false;
        },
      });
  }



  async stateItem(event: any, data: any, key: string) {
    if (event) {
      const { id, name, phone, password,  business_name,
        business_address,
        country,
        city,
        state, } = event || {};
      this.userForm.patchValue({
        ...this.userForm.value,
        name,
        phone,
        password,
        business_name,
        business_address,
        country,
        city,
        state,
      });

      this.userForm.addControl('id', new FormControl(id));
      this.userForm.addControl(
        key,
        new FormControl(data.target.checked ? '1' : '0')
      );
    }

    this.save(false);
  }



  async getUsers() {
    try {
      const res: any = await this.http.get('all-users', true).toPromise();
      console.log(res, 'Hello');
      if (res?.data) {
        // Filter users by business type (assuming business type is 'user')
        this.users = res.data.filter((user: any) => user.business_type === this.heading);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  
  async userDetail(id) {
    this.router.navigateByUrl(`/users/user/${id}`);
  }
  
}
