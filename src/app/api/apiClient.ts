import axios from 'axios';

// 1. Create a reusable axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Add a request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    let token: string | null = null;

    // Check if we are running in the browser (Client-Side)
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('authToken');
    } else {
      // Running on the server (Server Components / Route Handlers)
      // Dynamic import to avoid errors in client-only environments
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      token = cookieStore.get('authToken')?.value || null;
    }

    // If a token exists, inject it into the Authorization header
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
