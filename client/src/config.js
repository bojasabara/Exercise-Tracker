const config = {
  apiUrl: process.env.NODE_ENV === 'production' 
    ? 'https://backend-frcae74gk-bojasabaras-projects.vercel.app' 
    : 'http://localhost:5000'
};

export default config;
