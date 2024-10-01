import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './infra/env/env'
import { EnvService } from './infra/env/env.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (val) => envSchema.parse(val),
      isGlobal: true,
    }),
  ],
  providers: [EnvService],
})
export class AppModule {}
