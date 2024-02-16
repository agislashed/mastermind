import { resolve } from 'path';
const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default {
  root: './src/',
  publicDir: '../public/',
  base: './',
  assetsInclude: ['**/*.glb','**/*.fbx','assets/3d/**/*'],
  server:
    {
      host: true,
      open: !isCodeSandbox // Open if it's not a CodeSandbox
    },
  build:
    {
      outDir: '../dist',
      emptyOutDir: true,
      sourcemap: true
    },
  resolve: {
    alias: {
      $fonts: resolve('./public/fonts'),
      $background: resolve('./public/background'),
      '@js': '/js',
      '@css':'/css',

    }
  }
}