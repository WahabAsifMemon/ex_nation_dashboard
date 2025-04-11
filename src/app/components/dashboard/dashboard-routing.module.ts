import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationComponent } from './organization/organization.component';
import { EventsComponent } from './events/events.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { HelpComponent } from './help/help.component';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub_category/sub_category.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { HomeComponent } from './home/home.component';
// import { HomeComponent } from './home/home.component';





const routes: Routes = [
  {
    path: '',
    children: [






      {
        path: 'home',
        component: HomeComponent,
      },

      {
        path: 'organization-podcast',
        data: { name: 'podcasts' },
        component: OrganizationComponent,
      },

      {
        path: 'organization-ministries',
        data: { name: 'ministries' },
        component: OrganizationComponent,
      },


      {
        path: 'organization-political',
        data: { name: 'political' },
        component: OrganizationComponent,
      },

      {
        path: 'organization-businesses',
        data: { name: 'businesses' },
        component: OrganizationComponent,
      },

      {
        path: 'organization-fellowship',
        data: { name: 'fellowship events' },
        component: OrganizationComponent,
      },


      {
        path: 'organization-churches',
        data: { name: 'churches' },
        component: OrganizationComponent,
      },


      {
        path: 'organization-conferences',
        data: { name: 'conferences' },
        component: OrganizationComponent,
      },


      {
        path: 'organization-nonprofits',
        data: { name: 'nonprofits' },
        component: OrganizationComponent,
      },


      {
        path: 'events',
        component: EventsComponent,
      },


      {
        path: 'privacy',
        component: PrivacyPolicyComponent,
      },


      {
        path: 'terms',
        component: TermsConditionComponent,
      },


      {
        path: 'helps',
        component: HelpComponent,
      },



      {
        path: 'category',
        component: CategoryComponent
      },

      {
        path: 'sub_category',
        component: SubCategoryComponent,
      },

      {
        path: 'subscription',
        component: SubscriptionComponent,
      },




      {
        path: '**',
        redirectTo: 'notifications',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
