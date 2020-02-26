// Module imports
/* eslint-disable import/no-unresolved */
import {
  window,
  workspace,
} from 'vscode'
/* eslint-enable import/no-unresolved */





const stop = async () => {
  const workspaceConfiguration = workspace.getConfiguration()
  const updatedFileExludes = { ...workspaceConfiguration.files.exclude }
  const { filesToGuard } = workspaceConfiguration.streamguard

  filesToGuard.forEach(filePattern => {
    delete updatedFileExludes[filePattern]
  })

  try {
    await workspaceConfiguration.update('files.exclude', updatedFileExludes, true)
    return window.showInformationMessage('StreamGuard stopped!')
  } catch (error) {
    console.log(error)
    return window.showInformationMessage('Failed to stop StreamGuard... 😭')
  }
}





export default stop
