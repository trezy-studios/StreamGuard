// Module imports

/* eslint-disable-next-line import/no-unresolved */
import path from 'path'
import {
  commands,
  window,
  workspace,
} from 'vscode'





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

    workspace.getConfiguration().update('streamguard.isActive', false, true)
  }))

  workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration('streamguard.isActive')) {
      const { isActive } = workspace.getConfiguration().streamguard

      if (isActive) {
        return startStreamguard()
      }

      return stopStreamguard()
    }
  })
}

// export const deactivate = () => {}
