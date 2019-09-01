const { ipcRenderer } = require('electron')

document.addEventListener('DOMContentLoaded', function () {
  ipcRenderer.on('render-url-reply', () => {
    document.innerHTML = ''
  })
  ipcRenderer.send('render-url', document.body.innerHTML)
})
