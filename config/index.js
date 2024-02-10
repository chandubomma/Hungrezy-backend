import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: path.resolve(__dirname, '../.env') });



export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
export const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;
export const NOTIFICATION_PASSWORD = process.env.NOTIFICATION_PASSWORD;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;