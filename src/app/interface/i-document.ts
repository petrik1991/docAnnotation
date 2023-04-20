import { IAnotation } from './i-annotation';

export interface IDocument {
    path: string;
    annotations?: IAnotation[]
}