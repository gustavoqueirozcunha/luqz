module.exports = {
  apps: [
    {
      name: 'luqz-api',
      script: 'server.js',
      cwd: '/var/www/luqz/luqz-api',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
        PORT: 3005,
      },
      error_file: '/var/log/pm2/luqz-api-error.log',
      out_file: '/var/log/pm2/luqz-api-out.log',
      time: true,
    },
  ],
}
