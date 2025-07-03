// Fix for CSS syntax issues in Docker build
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // Updated to use the new package
    'autoprefixer': {},
    'postcss-preset-env': {
      features: { 'custom-properties': false },
      // Use stage 0 to support all experimental CSS features
      stage: 0
    }
  }
};
