/** @type {import('next').NextConfig} */
const nextConfig = {
   async rewrites() {
       return [
           {
               source: '/api/pokemon',
               destination: 'https://pkdqe17fh2.execute-api.eu-west-2.amazonaws.com/Prod/Prod/pokemon',
           },
           {
               source: '/api/pokemon/:id',
               destination: 'https://pkdqe17fh2.execute-api.eu-west-2.amazonaws.com/Prod/Prod/pokemon/:id',
           },
       ];
   }
};

export default nextConfig;