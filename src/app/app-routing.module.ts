import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {UsersPageComponent} from './users-page/users-page.component';
import {InfoPageComponent} from './info-page/info-page.component';


const routes: Routes = [{
  path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: '', component: UsersPageComponent},
    {path: 'user/:id:', component: InfoPageComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
