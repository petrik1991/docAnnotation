import { Renderer2 } from '@angular/core';

import { Annotation } from './annotation';
import { ImageAnnotation } from './image-annotation';

export class AnnotationFabric {

    public static create(type: string,renderer: Renderer2): Annotation {
        let result: Annotation;
        switch (type) {
            case 'image/jpeg':
                result = new ImageAnnotation(renderer)
                break;

            default:
                result = new ImageAnnotation(renderer);
                break;
        }
        return result;
    }
}