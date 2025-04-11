import { Component } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  public activeEvents: any[] = [];
  public inactiveEvents: any[] = [];
  public duePage!: any;
  public heading: string;
  public total!: any;
  public searchInput!: any;
  public selectedTab: string = 'active'; // Track the selected tab

  constructor(
    private http: HttpService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    await Promise.all([this.getEvents()]);
  }

  async getEvents() {
    try {
      const res: any = await this.http.get('all-events', true).toPromise();
      console.log(res, 'Hello');
      this.activeEvents = res?.data?.active || [];
      this.inactiveEvents = res?.data?.inactive || [];
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  // Toggle between active and inactive events
  onTabChange(tab: string) {
    this.selectedTab = tab;
  }
}
