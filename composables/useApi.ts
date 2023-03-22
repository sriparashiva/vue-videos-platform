export const getVideo = async (slug: string) => {
  const { find } = useStrapi()
  const video: any = await find<Video>('videos', {
    fields: [
      'title',
      'slug',
      'description',
      'thumbnailURL',
      'viewCount',
      'youtubeID',
      'eventDate',
      'duration',
      'likeCount',
    ],
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      coverImage: true,
      playlists: {
        fields: ['title', 'slug', 'description'],
      },
    },
  })
  return video.data[0] as Video
}

export const getPlaylist = async (slug: string) => {
  const { find } = useStrapi()
  const playlist: any = await find<Playlist>('playlists', {
    fields: ['title', 'slug', 'description'],
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      videos: {
        fields: [
          'title',
          'slug',
          'description',
          'viewCount',
          'eventDate',
          'duration',
          'likeCount',
        ],
        populate: ['coverImage'],
      },
    },
  })
  return playlist.data[0] as Playlist
}
