import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../backend/src/api/contact/contact.router';

export const trpc = createTRPCReact<AppRouter>();
