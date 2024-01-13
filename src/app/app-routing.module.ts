import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllMatchesComponent } from './all-matches/all-matches.component';
import { SavedMatchesComponent } from './saved-matches/saved-matches.component';

const routes: Routes = [
  { path: 'all-matches', component: AllMatchesComponent },
  { path: 'saved-matches', component: SavedMatchesComponent },
  { path: '', redirectTo: '/all-matches', pathMatch: 'full' }, // Default route
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
