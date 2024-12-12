import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcService } from './api/trpc/trpc.server';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);  
    const trpcService = app.get(TrpcService);

    app.use('/trpc', trpcService.getHttpHandler());
    
    await app.listen(3000);
}

bootstrap();
