var plugins = [{
      plugin: require('/Users/mehmet/Documents/GitHub/smakosh.com/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/mehmet/Documents/GitHub/smakosh.com/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/mehmet/Documents/GitHub/smakosh.com/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/mehmet/Documents/GitHub/smakosh.com/node_modules/gatsby-plugin-canonical-urls/gatsby-ssr'),
      options: {"plugins":[],"siteUrl":"https://smakosh.com"},
    },{
      plugin: require('/Users/mehmet/Documents/GitHub/smakosh.com/node_modules/gatsby-plugin-feed/gatsby-ssr'),
      options: {"plugins":[],"query":"{\n\t\t\t\t\tsite {\n\t\t\t\t\t\tsiteMetadata {\n\t\t\t\t\t\t\trssMetadata {\n\t\t\t\t\t\t\t\tsite_url\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t\tauthor\n\t\t\t\t\t\t\t\tcopyright\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}","feeds":[{"query":"{\n\t\t\t\t\t\t\tallMarkdownRemark(\n                filter: { frontmatter: { type: { ne: \"legal\" } } },\n\t\t\t\t\t\t\t\tsort: { order: DESC, fields: [frontmatter___date] }\n\t\t\t\t\t\t\t) {\n\t\t\t\t\t\t\t\tedges {\n\t\t\t\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\t\t\t\texcerpt\n\t\t\t\t\t\t\t\t\t\thtml\n\t\t\t\t\t\t\t\t\t\tfrontmatter {\n\t\t\t\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t\t\t\t\tpath\n\t\t\t\t\t\t\t\t\t\t\tdate\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}","output":"/rss.xml","title":"Smakosh | Blog"}]},
    },{
      plugin: require('/Users/mehmet/Documents/GitHub/smakosh.com/node_modules/gatsby-remark-autolink-headers/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/mehmet/Documents/GitHub/smakosh.com/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"UA-88875900-1","head":true},
    },{
      plugin: require('/Users/mehmet/Documents/GitHub/smakosh.com/node_modules/gatsby-plugin-favicon/gatsby-ssr'),
      options: {"plugins":[],"logo":"./src/assets/favicon/logo-512x512.png","injectHTML":true,"icons":{"android":true,"appleIcon":true,"appleStartup":true,"coast":false,"favicons":true,"firefox":true,"twitter":false,"yandex":false,"windows":false}},
    },{
      plugin: require('/Users/mehmet/Documents/GitHub/smakosh.com/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Smakosh","short_name":"Smakosh","start_url":"/","background_color":"#00c6ff","theme_color":"#00c6ff","display":"minimal-ui","icons":[{"src":"/favicon/logo-192x192.png","sizes":"192x192","type":"image/png"},{"src":"/favicon/logo-512x512.png","sizes":"512x512","type":"image/png"}]},
    },{
      plugin: require('/Users/mehmet/Documents/GitHub/smakosh.com/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/mehmet/Documents/GitHub/smakosh.com/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
