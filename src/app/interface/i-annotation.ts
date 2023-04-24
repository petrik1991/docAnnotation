import { ICoordinates } from './i-coordinates';
import { IPoint } from './i-point';

export interface IAnnotation extends ICoordinates {
    coordinates: IPoint;
    content: string;
    domElement: HTMLElement;
}