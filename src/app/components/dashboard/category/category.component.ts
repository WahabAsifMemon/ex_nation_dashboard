import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/shared/services/helper.service';
import { HttpService } from 'src/app/shared/services/http.service';
import Swal from 'sweetalert2';


declare var $: any; 

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  public categories: [] = [];
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  selectedHelp: any;
  permissions: any;
  private permissionDeniedLogged: boolean = false;

  constructor(
    private http: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private helper: HelperService
  ) {}
  userForm: any = this.fb.group({
    id: [null, Validators.required],
    status: [null, Validators.required],
  });
  ngOnInit() {
    this.loadData();
  }
  async loadData() {
    await Promise.all([this.getCategory()]);
  }

  async getCategory() {
    try {
      const res: any = await this.http.get('get-category', true).toPromise();
      console.log(res);
      this.categories = res?.data || [];
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }


  


  
  
  }
  

  