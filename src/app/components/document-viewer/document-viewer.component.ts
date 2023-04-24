import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, fromEvent } from 'rxjs';
import { mapTo, takeUntil, tap } from 'rxjs/operators';

import { ApiDocumentsService } from '../../model/api-documents.service';
import { IDocument } from '../../interface/i-document';
import { AnnotationFabric } from '../../model/annotation-fabric';
import { zoom } from '../../utils/zoom';
import { IAnnotation } from '../../interface/i-annotation';

@Component({
  selector: 'document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentViewerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('container')
  container!: ElementRef;

  documents!: Observable<IDocument[]>;

  private selectedAnnotation: IAnnotation | null = null;
  private annotations = new Map<string, IAnnotation>();
  private readonly destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private documentsService: ApiDocumentsService,
    private renderer: Renderer2
  ) { }

  public ngOnInit(): void {
    this.getDocs();
  }

  public ngAfterViewInit(): void {
    Array.from(this.annotations.values()).forEach(anno => {
      anno.initAnnotation(anno.content, this.container.nativeElement);
      this.addListeners(anno);
    });
    fromEvent<KeyboardEvent>(window.document, 'keyup')
      .subscribe((event: KeyboardEvent) => {
        if (this.selectedAnnotation && event.key.toLocaleLowerCase() === 'backspace') {
          this.annotations.delete(this.selectedAnnotation.id);
          this.selectedAnnotation.document.annotations = Array.from(this.annotations.values())
            .filter(item => item.id !== this.selectedAnnotation!.id);
          this.selectedAnnotation.domElement.remove();
          this.selectedAnnotation = null;
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async onFileSelected(event: Event, doc: IDocument): Promise<void> {
    const file = (<HTMLInputElement>event.target!).files![0];
    const entity = AnnotationFabric.create(file.type, this.renderer);
    const anno = await entity.readFile(file, this.container.nativeElement, doc);

    this.addListeners(anno);
    doc.annotations.push(anno);
    this.annotations.set(anno.id, anno);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    const key = event.dataTransfer!.getData('text');
    const anno = this.annotations.get(key)!;
    const coordinates = { x: event.offsetX, y: event.offsetY };
    anno.setCoordinates(coordinates);
  }

  zoom(element: HTMLElement, doc: IDocument, zoomIn: boolean = false): void {
    zoom(element, zoomIn);

    doc.annotations.forEach(anno => {
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

  onSave(): void {
    console.log(this.documents);
    this.documents.pipe(
      mapTo(this.documentsService.save)
    );
    this.router.navigate(['/']);
  }

  private addListeners(anno: IAnnotation): void {
    anno.domElement.addEventListener('dragstart', (dragEvent: DragEvent) => {
      dragEvent.dataTransfer!.setData('text/plain', anno.id);
      this.selectedAnnotation = anno;
      this.selectedAnnotation.domElement.className = 'active';
    });
    anno.domElement.addEventListener('click', () => {
      if (this.selectedAnnotation === anno) {
        this.selectedAnnotation.domElement.classList.remove('active');
        this.selectedAnnotation = null;
      }
      else {
        this.selectedAnnotation = anno;
        this.selectedAnnotation.domElement.className = 'active';
      }
    });
  }

  private getDocs(): void {
    this.documents = this.documentsService.get()
      .pipe(
        takeUntil(this.destroy$),
        tap(data => {
          data.forEach(doc => {
            doc.annotations.forEach(anno => this.annotations.set(anno.id, anno));
          });
        })
      );
  }
}
