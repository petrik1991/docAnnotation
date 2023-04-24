import { Renderer2 } from '@angular/core';

import { IDocument } from '../interface/i-document';
import { IAnnotation } from '../interface/i-annotation';
import { IPoint } from '../interface/i-point';
import { ICoordinates } from '../interface/i-coordinates';

export abstract class Annotation implements IAnnotation, ICoordinates {

    public coordinates: IPoint = { x: 0, y: 0 };
    public content: string = '';
    public abstract domElement: HTMLElement;

    constructor(protected renderer: Renderer2) { }

    public abstract readFile(file: File, container: HTMLDivElement, doc: IDocument): IAnnotation;
    public abstract setCoordinates(coordinates: IPoint): void;

    protected evaluateSize(element: HTMLElement): void {
        const width = element.clientWidth;
        const height = element.clientHeight;

        element.style.width = width * 0.25 + 'px';
        element.style.height = height * 0.25 + 'px';
    }
}