import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../backend/src/api/contact/contact.router';

export const trpc = createTRPCReact<AppRouter>();

export interface ValidationError {
    code: string;
    minimum?: number;
    type: string;
    inclusive: boolean;
    exact: boolean;
    message: string;
    path: string[];
}