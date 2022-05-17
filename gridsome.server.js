// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function(api) {
  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`
      {
        strapi {
          videos(pagination: { page: 1, pageSize: 10000 }) {
            data {
              attributes {
                slug
              }
            }
          }
          playlists(pagination: { page: 1, pageSize: 10000 }) {
            data {
              attributes {
                slug
              }
            }
          }
        }
      }
    `)

    // Create blog articles pages.
    const videos = data.strapi.videos.data
    const playlists = data.strapi.playlists.data

    videos.forEach((video) => {
      createPage({
        path: `/video/${video.attributes.slug}`,
        component: './src/templates/Video.vue',
        context: {
          slug: video.attributes.slug,
        },
      })
    })

    playlists.forEach((playlist) => {
      createPage({
        path: `/playlist/${playlist.attributes.slug}`,
        component: './src/templates/Playlist.vue',
        context: {
          slug: playlist.attributes.slug,
        },
      })
    })
  })
}
