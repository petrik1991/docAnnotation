import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiDocumentsService } from '../model/api-documents.service';
import { IDocument } from '../interface/i-document';

@Injectable()
export class DocumentsService implements ApiDocumentsService {

  public get(): Observable<IDocument[]> {
    return of([
      {
        path: '../../assets/pages/1.png'
      },
      {
        path: '../../assets/pages/2.png'
      },
      {
        path: '../../assets/pages/3.png'
      },
      {
        path: '../../assets/pages/4.png'
      },
      {
        path: '../../assets/pages/5.png'
      }
    ]);
  }
}
