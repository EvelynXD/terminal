import { getSpotifyPlaylists, getSpotifyTopTracks, getSpotifyUser } from "@/api"
import config from "@/data/config.json"
import { Playlist } from "@/interfaces/playlist"
import { Track } from "@/interfaces/tracks"
import { getUser } from "@/lib/spotify"

export const spotify = async (args: string[]): Promise<string> => {
  switch (args[0]) {
    case "top-song":
      const tracks: Track[] = await getSpotifyTopTracks()

      if (Array.isArray(tracks) && tracks.length > 0) {
        return tracks
          .map(
            (track: Track, index: number) =>
              `<div style="display: flex;">${index + 1}. <img src="${
                track.cover
              }" style="width: 50px; margin-right:10px;"/><div style="display: flex; flex-direction: column;"><a href="${
                track.songUrl
              }"><strong>${track.title}</strong></a><span>${
                track.artist
              }</span></div></div>`
          )
          .join("\n")
      } else {
        return "No top tracks found"
      }
    case "playlist":
      window.open(`https://open.spotify.com/playlist/7hNw1SmmRWqv77Tbyn0OZ3`)

      return "Opening playlist"
    case "me":
      window.open(`https://open.spotify.com/user/${config.social.spotify}/`)

      return "Opening spotify..."
    case "ls":
      return `me, playlist, top-song`
    default:
      return `Usage: spotify [arg]. Example: spotify playlist
Type 'spotify ls' to see all available commands.`
  }
}
