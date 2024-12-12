import { Controller, All, Injectable } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
import { ContactRouter } from '../contact/contact.router';


@Controller()
@Injectable()
export class ContactController {
    constructor(private readonly contactRouter: ContactRouter) { }

    @All('/trpc/:path*')
    handle() {
        return trpcExpress.createExpressMiddleware({
            router: this.contactRouter._router,
            createContext: () => null,
        });
    }
}
