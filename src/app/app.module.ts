import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentViewerComponent } from './components/document-viewer/document-viewer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ApiDocumentsService } from './model/api-documents.service';
import { DocumentsService } from './services/documents.service';

@NgModule({
  declarations: [
    AppComponent,
    DocumentViewerComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: ApiDocumentsService,
      useClass: DocumentsService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
