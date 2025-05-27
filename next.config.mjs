/** @type {import('next').NextConfig} */
const nextConfig = {
   async rewrites() {
       return [
           {
               source: '/api/pokemon',
               destination: '<PLEASE_REPLACE_IT_WITH_YOUR_BACKEND_URL>/Prod/pokemon',
           },
           {
               source: '/api/pokemon/:id',
               destination: '<PLEASE_REPLACE_IT_WITH_YOUR_BACKEND_URL>/Prod/pokemon/:id',
           },
       ];
   }
};


export default nextConfig;