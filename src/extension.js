// Module imports
/* eslint-disable import/no-unresolved */
import {
  commands,
  window,
  workspace,
} from 'vscode'
/* eslint-enable import/no-unresolved */





// Local imports
import startStreamguard from './helpers/startStreamguard'
import stopStreamguard from './helpers/stopStreamguard'





export const activate = context => {
  context.subscriptions.push(commands.registerCommand('extension.startStreamGuard', () => {
    const { isActive } = workspace.getConfiguration().streamguard

    if (isActive) {
      return window.showInformationMessage('StreamGuard is already active!')
    }

    workspace.getConfiguration().update('streamguard.isActive', true, true)
  }))

  context.subscriptions.push(commands.registerCommand('extension.stopStreamGuard', () => {
    const { isActive } = workspace.getConfiguration().streamguard

    if (!isActive) {
      return window.showInformationMessage('StreamGuard isn\'t active!')
    }

    return workspace.getConfiguration().update('streamguard.isActive', false, true)
  }))

  workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration('streamguard.isActive')) {
      const { isActive } = workspace.getConfiguration().streamguard

      if (isActive) {
        return startStreamguard()
      }

      return stopStreamguard()
    }

    return false
  })
}

// export const deactivate = () => {}
