const { ipcRenderer } = require('electron')

document.addEventListener('DOMContentLoaded', function () {
  //Recapcha detection
  if(document.querySelector('.recaptcha-checkbox-border') === undefined) {
    console.log('no capcha found')
    ipcRenderer.on('render-url-reply', () => {
      document.innerHTML = ''
    })
    ipcRenderer.send('render-url', document.body.innerHTML)
  } else {
    console.log('capcha need')
    //TODO Envoyer un event pour saisie utilisateur
  }
})
