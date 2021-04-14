const withPWA = require('next-pwa')

module.exports = withPWA({
  future: {
    webpack5: true,
  },
  webpack: (config, { isServer, dev }) => {
    //https://github.com/vercel/next.js/issues/22813#issuecomment-810961712
    config.output.chunkFilename = isServer
      ? `${dev ? "[name]" : "[name].[fullhash]"}.js`
      : `static/chunks/${dev ? "[name]" : "[name].[fullhash]"}.js`;

    return config;
  },  
  pwa: {
    dest: 'public'
  }
})