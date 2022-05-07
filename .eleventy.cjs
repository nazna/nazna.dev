const config = (eleventyConfig) => {
  eleventyConfig.ignores.add('README.md')

  return {
    dir: {
      output: 'dist',
    },
  }
}

module.exports = config
