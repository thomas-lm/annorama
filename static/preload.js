const { ipcRenderer } = require('electron')

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    //Recapcha detection
    if(document.querySelectorAll('.recaptcha-checkbox-border').length == 0) {
      console.log('no capcha found')
      ipcRenderer.on('render-url-reply', () => {
        document.innerHTML = ''
      })
      ipcRenderer.send('render-url', document.body.innerHTML)
    } else {
      console.log('capcha need')
      //TODO Envoyer un event pour saisie utilisateur
    }
  }, 1000);
})
