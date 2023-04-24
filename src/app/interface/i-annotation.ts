import { ICoordinates } from './i-coordinates';
import { IDocument } from './i-document';
import { IPoint } from './i-point';

export interface IAnnotation extends ICoordinates {
    id: string;
    document: IDocument;
    coordinates: IPoint;
    content: string;
    domElement: HTMLElement;
    initAnnotation(content: string, container: HTMLDivElement): void;
}