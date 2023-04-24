import { IAnnotation } from './i-annotation';

export interface IDocument {
    path: string;
    annotations: Map<string, IAnnotation>;
}