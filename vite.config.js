export default {
  root: './',
  publicDir: './public/',
  base: './',
  assetsInclude: ['**/*.glb','**/*.fbx','assets/3d/**/*'],
  server:
    {
      host: true,
    },
  build:
    {
      outDir: './dist',
      emptyOutDir: true,
      sourcemap: true
    },
  resolve: {
    alias: {
      '@assets': '/assets',
      '@js': '/js',
      '@shaders': '/shaders',
    }
  }
}