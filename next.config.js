const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://test.ailurotech.com.au/api/:path*',
      },
    ];
  },
};
