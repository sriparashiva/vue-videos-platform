// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path')

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/assets/sass/*.scss')],
    })
}

module.exports = {
  siteName: 'Vox - Understand the News',
  siteDescription:
    'Vox is a general interest news site for the 21st century. Its mission is simple: Explain the news. Politics, public policy, world affairs, pop culture, science, business, food, sports, and everything else that matters are part of our editorial ambit. Our goal is to move people from curiosity to understanding.',
  icon: './src/favicon.png',
  siteUrl: 'https://nithyananda.tv',
  plugins: [
    {
      use: '@gridsome/source-graphql',
      options: {
        url: process.env.GRIDSOME_STRAPI_URL + '/graphql',
        fieldName: 'strapi',
        typeName: 'strapiTypes',
        headers: {
          Authorization: `bearer ${process.env.GRIDSOME_STRAPI_TOKEN}`,
        },
      },
    },
    {
      use: 'gridsome-plugin-windicss',
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: '315108418',
      },
    },
  ],
  chainWebpack(config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    types.forEach((type) => {
      addStyleResource(config.module.rule('sass').oneOf(type))
    })

    // or if you use scss
    types.forEach((type) => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  },
}
