// Module imports
/* eslint-disable import/no-unresolved */
import {
  window,
  workspace,
} from 'vscode'
/* eslint-enable import/no-unresolved */





const start = async () => {
  const workspaceConfiguration = workspace.getConfiguration()
  const updatedFileExludes = { ...workspaceConfiguration.files.exclude }
  const { filesToGuard } = workspaceConfiguration.streamguard

  filesToGuard.forEach(filePattern => {
    updatedFileExludes[filePattern] = true
  })

  try {
    await workspaceConfiguration.update('files.exclude', updatedFileExludes, true)
    return window.showInformationMessage('StreamGuard started!')
  } catch (error) {
    console.log(error)
    return window.showInformationMessage('Failed to start StreamGuard... 😭')
  }
}





export default start
