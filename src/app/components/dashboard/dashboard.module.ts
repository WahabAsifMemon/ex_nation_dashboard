import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { CountToModule } from 'angular-count-to';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ImageModule } from 'src/app/image/image.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { EllipsisModule } from '@thisissoon/angular-ellipsis';
import { OrganizationComponent } from './organization/organization.component';
import { EventsComponent } from './events/events.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { HelpComponent } from './help/help.component';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub_category/sub_category.component';

@NgModule({
  declarations: [
    OrganizationComponent,
    EventsComponent,
    PrivacyPolicyComponent,
    TermsConditionComponent,
    HelpComponent,
    CategoryComponent,
    SubCategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule,
    DashboardRoutingModule,
    CountToModule,
    ReactiveFormsModule,
    CKEditorModule,
    ImageModule,
    NgxPaginationModule,
    EllipsisModule,
    NgbTooltipModule
  ]
})
export class DashboardModule { }
