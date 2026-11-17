import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CatalogModule } from './catalog/catalog.module';
import { HealthModule } from './health/health.module';
import { OrdersModule } from './orders/orders.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    // Đọc file .env (giống application.properties trong Spring Boot)
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get('DB_PORT', 5432)),
        username: config.get<string>('DB_USER', 'postgres'),
        password: config.get<string>('DB_PASSWORD', 'postgres'),
        database: config.get<string>('DB_NAME', 'shop_pos'),
        autoLoadEntities: true, // Entity khai báo trong TypeOrmModule.forFeature() sẽ tự được nạp
        synchronize: config.get('DB_SYNC') === 'true', // giống spring.jpa.hibernate.ddl-auto=update
        namingStrategy: new SnakeNamingStrategy(), // categoryId (TS) -> category_id (DB)
      }),
    }),

    HealthModule,
    CatalogModule,
    OrdersModule,
    ReportsModule,
  ],
})
export class AppModule {}
