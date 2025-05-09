import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        data: { name: 'user' },
        component: UsersComponent,
      },

      {
        path: 'consumer',
        data: { name: 'consumer' },
        component: UsersComponent,
      },

      {
        path: 'user/:id',
        component: UserDetailComponent,
      },


    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
