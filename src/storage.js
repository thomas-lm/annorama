import yaml from 'js-yaml'
import fs from 'fs'

export default class Storage {
  constructor (path, filename, defaultData) {
    this.path = path
    this.filename = filename
    this.filePath = path + '/' + filename
    this.currentData = defaultData

    if (fs.existsSync(this.filePath) === false) {
      console.log('settings file not exist : ', this.filePath)
      this.saveData()
    } else {
      try {
        console.log('loading settings')
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

    // Create directory
    if (!fs.existsSync(this.path)) {
      console.log('create directory ', this.path)
      fs.mkdirSync(this.path)
    }

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
