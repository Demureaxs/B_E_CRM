const env = process.env.NODE_ENV || 'development';

const urls: { [key: string]: string } = {
  development: 'http://localhost:8080',
  production: 'https://bali-eve-crm.fly.dev',
};

// const API_URL = urls[env];

const API_URL = 'http://localhost:8080';

// const API_URL = 'https://bali-eve-crm.fly.dev';

export default API_URL;
