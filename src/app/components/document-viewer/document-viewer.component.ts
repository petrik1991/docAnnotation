import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiDocumentsService } from '../../model/api-documents.service';
import { IDocument } from '../../interface/i-document';

@Component({
  selector: 'document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    const curWidth = element.clientWidth;
    const curHeight = element.clientHeight;
    const direction = increase ? 1 : -1;
    const width = (curWidth * 0.1 * direction) + curWidth;
    const height = (curHeight * 0.1 * direction) + curHeight;

    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
  }

  getDocs(): void {
    this.documents = this.documentsService.get()
      .pipe(takeUntil(this.destroy$));
  }

  onSave(): void {
    this.router.navigate(['/']);
  }
}
