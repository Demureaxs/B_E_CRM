const env = process.env.NODE_ENV || 'development';

const urls: { [key: string]: string } = {
  development: 'http://192.168.18.7:8080',
  production: 'https://bali-eve-crm.fly.dev',
};

const API_URL = urls[env];

export default API_URL;
