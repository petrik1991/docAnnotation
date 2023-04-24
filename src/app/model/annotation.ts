import { Renderer2 } from '@angular/core';

import { IAnnotation } from '../interface/i-annotation';
import { IPoint } from '../interface/i-point';
import { ICoordinates } from '../interface/i-coordinates';
import { IDocument } from '../interface/i-document';

export abstract class Annotation implements IAnnotation, ICoordinates {

    public id!: string;
    public document!: IDocument;
    public coordinates: IPoint = { x: 0, y: 0 };
    public content: string = '';
    public abstract domElement: HTMLElement;

    constructor(protected renderer: Renderer2) { }

    public abstract readFile(file: File, container: HTMLDivElement, doc: IDocument): Promise<IAnnotation>;
    public abstract setCoordinates(coordinates: IPoint): void;
    public abstract initAnnotation(content: string, container: HTMLDivElement): void;

    protected evaluateSize(element: HTMLElement): void {
        const width = element.clientWidth;
        const height = element.clientHeight;

        element.style.width = width * 0.25 + 'px';
        element.style.height = height * 0.25 + 'px';
    }
}