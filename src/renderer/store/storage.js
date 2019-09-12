import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'

export default class Storage {
  constructor (basedir, filename) {
    this.filePath = path.join(basedir, filename)
    this.currentData = {}

    // Create directory
    if (!fs.existsSync(basedir)) {
      console.log('create directory ', basedir)
      fs.mkdirSync(basedir)
    }

    if (fs.existsSync(this.filePath) === false) {
      console.log('settings file not exist : ', this.filePath)
      this.saveData()
    } else {
      try {
        console.log('loading settings in ', this.filePath)
        this.currentData = { ...this.currentData, ...this.loadData() }
      } catch (e) {
        console.log('error loading data :', e)
      }
    }
  }

  loadData () {
    return yaml.safeLoad(fs.readFileSync(this.filePath, 'utf8'))
  }

  saveData () {
    let yamlData = yaml.safeDump(this.currentData)

    // save file
    fs.writeFileSync(this.filePath, yamlData, 'utf-8')
  }

  saveDataAsync () {
    clearTimeout(this.saveDataTO)
    this.saveDataTO = setTimeout(this.saveData.bind(this), 500)
  }

  /**
   * get a value from storage
   * @param {*} key
   */
  get (key) {
    return this.currentData[key]
  }

  /**
   * save the value
   * @param {*} key
   * @param {*} value
   */
  set (key, value) {
    console.log('set value ', key, value)
    this.currentData[key] = value
    this.saveDataAsync()
  }

  getData () {
    // Make a copy
    return Object.assign({}, this.currentData)
  }
}
