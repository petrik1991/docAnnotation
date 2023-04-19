import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocumentViewerComponent } from './components/document-viewer/document-viewer.component';
import { NavigationComponent } from './components/navigation/navigation.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent
  },
  {
    path: 'viewer/:id',
    component: DocumentViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
