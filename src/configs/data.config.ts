// src/config/database.config.ts
import * as dotenv from 'dotenv';
import { MongooseModuleOptions } from '@nestjs/mongoose';

dotenv.config();

export interface DatabaseConfig {
  uri: string;
  options?: object;
}

export const databaseConfig = (): MongooseModuleOptions => ({
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/your_database', // Connection string
  // Các tùy chọn bổ sung nếu cần
  retryAttempts: 10, // Số lần thử lại khi kết nối thất bại
  retryDelay: 5000, // Thời gian chờ giữa các lần thử (ms)
  // Tùy chọn connection pool
  connectionFactory: (connection) => {
    connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });
    return connection;
  },
  // Tùy chọn khác nếu cần
  autoIndex: true, // Tự động tạo index cho schema
  autoCreate: true, // Tự động tạo collection nếu chưa tồn tại
});