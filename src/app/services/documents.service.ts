import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiDocumentsService } from '../model/api-documents.service';
import { IDocument } from '../interface/i-document';

@Injectable()
export class DocumentsService implements ApiDocumentsService {

  private documents: IDocument[] = [
    {
      path: '../../assets/pages/1.png',
      annotations: []
    },
    {
      path: '../../assets/pages/2.png',
      annotations: []
    },
    {
      path: '../../assets/pages/3.png',
      annotations: []
    },
    {
      path: '../../assets/pages/4.png',
      annotations: []
    },
    {
      path: '../../assets/pages/5.png',
      annotations: []
    }
  ];

  public get(): Observable<IDocument[]> {
    return of(this.documents);
  }

  public save(docs: IDocument[]): Observable<void> {
    this.documents = docs;
    return of();
  }
}
