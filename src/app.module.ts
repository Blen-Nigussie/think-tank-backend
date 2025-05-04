import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { IdeasModule } from './ideas/ideas.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (): TypeOrmModuleOptions => {
        const dbConfig: TypeOrmModuleOptions = {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'mobileapp2025',
          database: 'thinktank_db',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true, // Set to false in production
        };
        console.log('Database Config:', {
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password ? '****' : 'MISSING',
          database: dbConfig.database,
        });
        return dbConfig;
      },
      inject: [],
    }),
    UsersModule,
    AuthModule,
    IdeasModule,
    FeedbackModule,
  ],
})
export class AppModule {}