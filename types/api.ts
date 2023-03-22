type Video = {
  id: number
  attributes: {
    title: string
    slug: string
    description: string
    youtubeID: string
    thumbnailURL: string
    eventDate: Date
    duration: number
    likeCount: number
    viewCount: number
    coverImage: Image
    playlists?: {
      data: Array<Playlist>
    }
  }
}

type Image = {
  data: {
    id: number
    attributes: {
      url: string
      formats: {
        large?: {
          url: string
        }
        medium?: {
          url: string
        }
        small?: {
          url: string
        }
        xsmall?: {
          url: string
        }
        thumbnail?: {
          url: string
        }
      }
    }
  }
}

type Playlist = {
  id: number
  attributes: {
    title: string
    description: string
    slug: string
    videos?: {
      data: Array<Video>
    }
  }
}

type StrapiResponse<T> = {
  data: Array<T>
  meta: {
    pagination: {
      page: number
      pageCount: number
      pageSize: number
      total: number
    }
  }
}

type User = {
  name: string
  email: string
  picture: string
  jwt: string
}
