import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiDocumentsService } from '../../model/api-documents.service';
import { IDocument } from '../../interface/i-document';

@Component({
  selector: 'document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css']
})
export class DocumentViewerComponent implements OnInit, OnDestroy {

  documents!: Observable<IDocument[]>;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private documentsService: ApiDocumentsService
  ) { }

  public ngOnInit(): void {
    this.getDocs();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  zoom(element: HTMLElement, increase: boolean = false): void {
    const curScale = element.style.scale === '' ? 1 : +element.style.scale;
    const scale = increase ? curScale + 0.1 : curScale - 0.1;
    element.style.scale = scale.toString();
  }

  getDocs(): void {
    this.documents = this.documentsService.get()
      .pipe(takeUntil(this.destroy$));
  }

  onSave(): void {
    this.router.navigate(['/']);
  }
}
