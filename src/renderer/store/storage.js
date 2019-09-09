import { app } from 'electron'
import { APP_SETTINGS_PATH, APP_SETTINGS_FILE, DEFAULT_LANGAGE } from '../../constantes.js'
import yaml from 'js-yaml'
import fs from 'fs'

const settingsPath = app.getPath('userData') + '/' + APP_SETTINGS_PATH
const settingsFilePath = settingsPath + '/' + APP_SETTINGS_FILE

let currentData = {
  windowX: 0,
  windowY: 0,
  windowWidth: 700,
  windowHeight: 600,
  windowMaximize: false,
  defaultLanguage: DEFAULT_LANGAGE,
  projectList: []
}

function loadData () {
  if (fs.existsSync(settingsFilePath) === false) {
    console.log('settings file not exist : ', settingsFilePath)
    saveData()
  } else {
    try {
      currentData = yaml.safeLoad(fs.readFileSync(settingsFilePath, 'utf8'))
    } catch (e) {
      console.log('error loading data :', e)
    }
  }
}

/**
 * Save data sync
 */
function saveData () {
  let yamlData = yaml.safeDump(currentData)

  // Create directory
  if (!fs.existsSync(settingsPath)) {
    console.log('create directory ', settingsPath)
    fs.mkdirSync(settingsPath)
  }

  // save file
  fs.writeFileSync(settingsFilePath, yamlData, 'utf-8')
  console.log('save settings to ', settingsFilePath)
}

/**
 * Timer for saving async
 */
let saveDataTO

/**
 * Save data async
 */
function saveDataAsync () {
  clearTimeout(saveDataTO)
  saveDataTO = setTimeout(saveData, 500)
}

function getAppData (key) {
  return currentData[key]
}

function saveAppData (key, value) {
  currentData[key] = value
  saveDataAsync()
}

loadData()

export default { getAppData, saveAppData }
