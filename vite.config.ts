import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: { quality: 75 },
      jpeg: { quality: 75 },
      png: { quality: 75 },
      webp: { lossless: false, quality: 75 },
    }),
  ],
  
  // Build optimizations for production
  build: {
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Generate source maps for easier debugging (set to false in production for better performance)
    sourcemap: false,
    // Rollup specific options
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          vendor: ['react', 'react-dom', 'styled-components'],
          router: ['react-router-dom']
        }
      }
    },
    // Target modern browsers for smaller bundle size
    target: 'es2020',
    // Minify options
    minify: 'esbuild',
  },

  // Server optimizations for development
  server: {
    // Enable HMR for smooth updates (this is the correct way)
    hmr: true,
    // Open browser automatically
    open: true,
    // Port configuration
    port: 3000
  },

  // Preview optimizations
  preview: {
    port: 3000,
    open: true
  },

  // Dependency optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'styled-components', 'react-router-dom'],
    // Exclude large dependencies that might cause lag
    exclude: []
  },

  // CSS optimizations
  css: {
    // Enable CSS modules
    modules: {
      localsConvention: 'camelCase'
    },
    // PostCSS optimizations
    postcss: {
      plugins: []
    }
  },

  // ESBuild options for faster builds
  esbuild: {
    // Drop console and debugger in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    // Target modern browsers
    target: 'es2020'
  }
})