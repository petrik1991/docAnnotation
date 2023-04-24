import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiDocumentsService } from '../../model/api-documents.service';
import { IDocument } from '../../interface/i-document';
import { AnnotationFabric } from '../../model/annotation-fabric';
import { ICoordinates } from 'src/app/interface/i-coordinates';
import { zoom } from 'src/app/utils/zoom';

@Component({
  selector: 'document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentViewerComponent implements OnInit, OnDestroy {

  documents: IDocument[] = [];
  selectedAnno: ICoordinates | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private documentsService: ApiDocumentsService,
    private renderer: Renderer2
  ) { }

  public ngOnInit(): void {
    this.getDocs();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFileSelected(event: Event, container: HTMLDivElement, doc: IDocument): void {
    const file = (<HTMLInputElement>event.target!).files![0];
    const anno = AnnotationFabric.create(file.type, this.renderer);
    this.selectedAnno = anno.readFile(file, container, doc);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, doc: IDocument): void {
    const key = event.dataTransfer!.getData('text');
    const anno = doc.annotations.get(key);
    const coordinates = { x: event.offsetX, y: event.offsetY };
    this.selectedAnno = anno as ICoordinates;
    this.selectedAnno!.setCoordinates(coordinates);
  }

  zoom(element: HTMLElement, doc: IDocument, zoomIn: boolean = false): void {
    zoom(element, zoomIn);

    Array.from(doc.annotations.values()).forEach(anno => {
      zoom(anno.domElement, zoomIn);
      const curTop = anno.domElement.offsetTop;
      const curLeft = anno.domElement.offsetLeft;
      const direction = zoomIn ? 1 : -1;
      const top = (curTop * 0.1 * direction) + curTop;
      const left = (curLeft * 0.1 * direction) + curLeft;

      anno.domElement.style.top = `${top}px`;
      anno.domElement.style.left = `${left}px`;
    });
  }

  getDocs(): void {
    this.documentsService.get()
      .pipe(takeUntil(this.destroy$))
      .subscribe(docs => this.documents = docs);
  }

  onSave(): void {
    this.router.navigate(['/']);
  }
}
