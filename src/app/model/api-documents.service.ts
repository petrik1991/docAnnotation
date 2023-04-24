import { Observable } from 'rxjs';

import { IDocument } from '../interface/i-document';

export abstract class ApiDocumentsService {
    public abstract get(): Observable<IDocument[]>;
    public abstract save(docs: IDocument[]): Observable<void>;
}