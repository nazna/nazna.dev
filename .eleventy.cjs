const config = (eleventyConfig) => {
  eleventyConfig.ignores.add('README.md')

  eleventyConfig.addPassthroughCopy({ './public/favicon.svg': 'favicon.svg' })
  eleventyConfig.addPassthroughCopy({ './public/style.css': 'style.css' })

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  }
}

module.exports = config
