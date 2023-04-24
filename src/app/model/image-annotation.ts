import { Renderer2 } from '@angular/core';

import { IDocument } from '../interface/i-document';
import { Annotation } from './annotation';
import { IPoint } from '../interface/i-point';
import { IAnnotation } from '../interface/i-annotation';

export class ImageAnnotation extends Annotation {
    
    public domElement!: HTMLImageElement;

    constructor(renderer: Renderer2) {
        super(renderer);
    }

    public readFile(file: File, container: HTMLDivElement, doc: IDocument): IAnnotation {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            const result = event.target!.result!.toString();
            const key = `${file.name}_${file.size}`;

            this.domElement = this.renderer.createElement('img');
            this.domElement.src = result;
            this.domElement.addEventListener('dragstart', (dragEvent: DragEvent) => {
                dragEvent.dataTransfer!.setData('text/plain', key);
            });

            this.renderer.setAttribute(this.domElement, 'draggable', 'true');
            this.renderer.setStyle(this.domElement, 'position', 'absolute');
            this.renderer.setStyle(this.domElement, 'top', '0');
            this.renderer.setStyle(this.domElement, 'left', '0');
            this.renderer.appendChild(container, this.domElement);

            this.evaluateSize(this.domElement);

            this.content = result;

            if (!doc.annotations.has(key)) {
                doc.annotations.set(key, {
                    content: result,
                    coordinates: this.coordinates,
                    setCoordinates: this.setCoordinates.bind(this),
                    domElement: this.domElement
                });
            }
        });
        reader.readAsDataURL(file);

        return this;
    }

    public setCoordinates(coordinates: IPoint): void {
        this.coordinates = coordinates;
        this.domElement.style.left = coordinates.x + 'px';
        this.domElement.style.top = coordinates.y + 'px';
    }
}