// Import supertest for making HTTP requests
import request from 'supertest';
// Import the app instance from where it's defined
import app from '../app';  // Ensure the path correctly points to where your Express app is initialized

// Import Vitest utilities for testing
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';

// Mock Redis or any other external dependencies here
vi.mock('ioredis', () => ({
    default: class {
        constructor() {
            return {
                connect: vi.fn().mockResolvedValue(),
                set: vi.fn().mockResolvedValue('OK'),
                get: vi.fn().mockResolvedValue(null),
                del: vi.fn().mockResolvedValue(1),
                quit: vi.fn().mockResolvedValue(),
                on: vi.fn()  // to handle event listeners in your Redis setup
            };
        }
    }
}));

// Assuming the use of other services that may need mocking
// Mock the service that interacts with the database or other external services
vi.mock('../services/restaurantService', () => ({
  getAllRestaurants: vi.fn(() => Promise.resolve({
    status: 200,
    message: 'Successfully retrieved all restaurants',
    data: [{ id: 1, name: 'Restaurant A' }, { id: 2, name: 'Restaurant B' }],
    totalPages: 1,
    currentPage: 1
  }))
}));

// Import any controllers or services that you are testing if needed
import { getAllRestaurants } from '../services/restaurantService';

// Describe the group of tests
describe('Restaurant API Tests', () => {
    describe('GET /api/restaurant/all', () => {
        it('should return all restaurants and a status of 200', async () => {
            // Configure the service method to return specific mock data
            getAllRestaurants.mockResolvedValue({
                status: 200,
                message: 'Successfully retrieved all restaurants',
                data: [{ id: 1, name: 'Restaurant A' }, { id: 2, name: 'Restaurant B' }],
                totalPages: 1,
                currentPage: 1
            });

            // Use supertest to simulate an HTTP GET request
            const response = await request(app).get('/api/restaurant/all');
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveLength(2);
            expect(response.body.message).toBe('Successfully retrieved all restaurants');
        });
    });
});

