module.exports = {
  apps: [
    {
      name: 'Nuxt3Blog',
      port: '8080',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
    },
  ],
}
