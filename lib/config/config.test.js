const path = require('path')
const { expect } = require('chai')
const { getConfigDirectory, readSettingsFile } = require('./config')
const { appPath } = require('./get')

const app = {
  argv: {},
  config: {
    appPath: '/var/node/signalk',
    configPath: '/data/signalk-config'
  },
  env: {
    HOME: '/user/foo',
    SIGNALK_NODE_CONFIG_DIR: '/data/signalk/config'
  }
}

describe('getConfigDirectory', () => {
  it('Allow env to overwrite constructor configPath setting.', () => {
    expect(getConfigDirectory(app)).to.equal('/data/signalk/config')
  })
  it('Constructor configPath has priority when no env SK Config Dir.', () => {
    delete app.env.SIGNALK_NODE_CONFIG_DIR
    expect(getConfigDirectory(app)).to.equal('/data/signalk-config')
  })
  it('No config setting then defaults to user dir.', () => {
    delete app.config.configPath
    expect(getConfigDirectory(app)).to.equal('/user/foo/.signalk')
  })
  it('Use the node process dir `appPath` as last resort.', () => {
    delete app.config.configPath
    delete app.env.HOME
    expect(getConfigDirectory(app)).to.equal('/var/node/signalk')
  })
})
describe('readSettingsFile', () => {
  const app = {
    argv: {},
    config: {
      configPath: '/data/signalk-config'
    }
  }
  it('Does not load file when disableWriteSettings.', () => {
    app.config.disableWriteSettings = true
    expect(readSettingsFile(app)).to.eql({ filename: null })
  })
  it('Tries to load file when disableWriteSetting=false.', () => {
    app.config.disableWriteSettings = false
    expect(readSettingsFile(app)).to.eql({
      filename: '/data/signalk-config/settings.json'
    })
  })
  it('Loads file when disableWriteSetting=false and file found.', () => {
    app.config.disableWriteSettings = false
    app.config.configPath = path.join(appPath, 'settings')
    const res = readSettingsFile(app)
    expect(res.vessel.name).to.equal('Volare')
    expect(res.filename.endsWith('settings/settings.json')).to.equal(true)
  })
  console.log()
})
