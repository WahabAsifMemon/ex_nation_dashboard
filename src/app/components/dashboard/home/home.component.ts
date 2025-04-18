import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import * as feather from "feather-icons";
import { HelperService } from "src/app/shared/services/helper.service";
import { HttpService } from "src/app/shared/services/http.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpService,
    private helper: HelperService
    
  ) {}

  public allChurches: number = 0;
  public allPolitical: number = 0;
  public allFellowshipEvents: number = 0;
  public allUsers: number = 0;
  public allConferences: number = 0;
  public allNonprofits: number = 0;
  public allPodcasts: number = 0;
  public totalRevenue: number = 0;
  public weekRevenue: number = 0;
  public monthRevenue: number = 0;
  users: any;



  public total: number = 0;
  public searchInput: string = "";
  public duePage: number = 1;
  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      feather.replace();
    });
  }

  async loadData() {
    await Promise.all([
      this.getAccount(),
      this.getUsers(),
    ]);
  }
  

  async getAccount() {
    try {
      const res: any = await this.http.get("get-dashboard", true).toPromise();
      console.log(res);
      this.allChurches = res?.data?.['all-churches'] || 0;
      this.allPolitical = res?.data?.['all-political'] || 0;
      this.allFellowshipEvents = res?.data?.['all-fellowship-events'] || 0;
      this.allUsers = res?.data?.['all-user'] || 0;
      this.allConferences = res?.data?.['all-conferences'] || 0;
      this.allNonprofits = res?.data?.['all-nonprofits'] || 0;
      this.allPodcasts = res?.data?.['all-podcasts'] || 0;
      
      this.totalRevenue = res?.data?.['total-revenue'] || 0;
      this.weekRevenue = res?.data?.['this-week-revenue'] || 0;
      this.monthRevenue = res?.data?.['this-month-revenue'] || 0;
          } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }



  async getUsers() {
    try {
      const res: any = await this.http.get('all-users', true).toPromise();
      console.log(res, 'Hello');
      if (res?.data) {
        // Filter users by business type (assuming business type is 'user')
        this.users = res.data.filter((user: any) => user.business_type === 'user');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  







}
