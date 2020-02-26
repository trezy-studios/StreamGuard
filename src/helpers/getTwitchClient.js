// Module imports
// import TwitchJS from 'twitch-js'
/* eslint-disable-next-line import/no-unresolved */
import { workspace } from 'vscode'





// Local variables
let twitchClient = null





const getTwitchClient = () => {
  if (!twitchClient) {
    const {
      token,
      username,
    } = workspace.getConfiguration().streamguard

    if (token && username) {
      twitchClient = new TwitchJS({ token, username })
    }
  }

  return twitchClient
}





export default getTwitchClient
