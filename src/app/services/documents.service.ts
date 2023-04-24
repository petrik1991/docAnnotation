import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiDocumentsService } from '../model/api-documents.service';
import { IDocument } from '../interface/i-document';
import { IAnnotation } from '../interface/i-annotation';

@Injectable()
export class DocumentsService implements ApiDocumentsService {

  public get(): Observable<IDocument[]> {
    return of([
      {
        path: '../../assets/pages/1.png',
        annotations: new Map()
      },
      {
        path: '../../assets/pages/2.png',
        annotations: new Map()
      },
      {
        path: '../../assets/pages/3.png',
        annotations: new Map()
      },
      {
        path: '../../assets/pages/4.png',
        annotations: new Map()
      },
      {
        path: '../../assets/pages/5.png',
        annotations: new Map()
      }
    ]);
  }
}
