const client_id = "fb453cc9eaf445dd82ced29d80b21dc9"
const client_secret = "74723a641a17491298fecd12befe7c06"
const refresh_token = "AQCTs8eS-nUlzBpFd3rJ7w-r9kfu1Is8ricylmSbjNF1HpzkHc3OHPbqU5JpRFiZUV-v3WXGk7UPv65NOtCVGz7cCwwUUXFCs4ZIrHvhzwF9JKlcJYTMOLk_XvWmGQBcT9o"

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`
const TOP_TRACKS_DEFAULT_PARAMS = {
  time_range: "short_term",
  limit: "5",
  offset: "0",
}
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  })
  return response.json()
}

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken()

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken()
  const queryParams = new URLSearchParams(TOP_TRACKS_DEFAULT_PARAMS).toString()
  return fetch(TOP_TRACKS_ENDPOINT + "?" + queryParams, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getPlaylists = async () => {
  const { access_token } = await getAccessToken()
  const playlistsEndpoint = `https://api.spotify.com/v1/me/playlists`
  return fetch(playlistsEndpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getUser = async () => {
  const { access_token } = await getAccessToken()
  const userEndpoint = `https://api.spotify.com/v1/me`
  return fetch(userEndpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
