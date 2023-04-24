import { Renderer2 } from '@angular/core';

import { Annotation } from './annotation';
import { IPoint } from '../interface/i-point';
import { IAnnotation } from '../interface/i-annotation';
import { IDocument } from '../interface/i-document';

export class ImageAnnotation extends Annotation {

    public domElement!: HTMLImageElement;

    constructor(renderer: Renderer2) {
        super(renderer);
    }

    public readFile(file: File, container: HTMLDivElement, doc: IDocument): Promise<IAnnotation> {
        const reader = new FileReader();
        this.id = `${file.name}_${file.size}`;
        this.document = doc;

        return new Promise(fulfilled => {
            reader.addEventListener('load', (event) => {
                const result = event.target!.result!.toString();
                this.initAnnotation(result, container);
                return fulfilled(this);
            });
            reader.readAsDataURL(file);
        });
    }

    public setCoordinates(coordinates: IPoint): void {
        this.coordinates = coordinates;
        this.domElement.style.left = coordinates.x + 'px';
        this.domElement.style.top = coordinates.y + 'px';
    }

    public initAnnotation(content: string, container: HTMLDivElement): void {
        this.domElement = this.renderer.createElement('img');
        this.domElement.src = content;

        this.renderer.setAttribute(this.domElement, 'draggable', 'true');
        this.renderer.setStyle(this.domElement, 'position', 'absolute');
        this.renderer.setStyle(this.domElement, 'top', `${this.coordinates.y}px`);
        this.renderer.setStyle(this.domElement, 'left', `${this.coordinates.x}px`);
        this.renderer.appendChild(container, this.domElement);

        this.evaluateSize(this.domElement);

        this.content = content;
    }
}