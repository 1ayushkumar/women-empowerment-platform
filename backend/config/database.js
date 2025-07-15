import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from backend directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('🔗 Environment file loaded from:', path.join(__dirname, '../.env'));
    console.log('🔗 Connection String:', process.env.MONGODB_URI ? 'Found' : 'Missing');

    if (process.env.MONGODB_URI) {
      const clusterName = process.env.MONGODB_URI.split('@')[1]?.split('/')[0];
      console.log('🎯 Cluster:', clusterName);

      if (clusterName && clusterName.includes('cluster0.ktndf.mongodb.net')) {
        console.log('✅ Correct cluster detected!');
      } else {
        console.log('❌ Wrong cluster detected!');
      }
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔒 MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
