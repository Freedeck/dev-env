const fs = require('fs')
const path = require('path')

module.exports = class Plugin {
    name;
    author;
    id;
    disabled;
    hasInit = false;

    constructor(name, author, id, disabled = false) {
        this.name = name;
        this.author = author;
        this.id = id;
        this.disabled = disabled;
        this.types = [];
        if (this.disabled) return;
        this.hasInit = this.onInitialize();
        if (!this.hasInit) {
            console.log('[DEV ENV] Plugin didn\'t initialize?');
        }
    }

    createSaveData() {
        if (!fs.existsSync(path.resolve('./plugins'))) {
            fs.mkdirSync(path.resolve('./plugins'));
            console.log('Failsafe created plugins folder!')
          }
          if (!fs.existsSync(path.resolve('./plugins/'+this.id))) {
            fs.mkdirSync(path.resolve('./plugins/'+this.id));
            console.log('Created '+this.id+' data folder!')
          }
          if (!fs.existsSync(path.resolve('./plugins/'+this.id+'/settings.json'))) {
            fs.writeFileSync(path.resolve('./plugins/'+this.id+'/settings.json'), JSON.stringify({}));
          }
    }

    getFromSaveData(k) {
        this.createSaveData()
        let data = JSON.parse(fs.readFileSync(path.resolve('./plugins/'+this.id+'/settings.json')));
        return data[k];
    }

    setToSaveData(k, v) {
        this.createSaveData();
        let data = JSON.parse(fs.readFileSync(path.resolve('./plugins/'+this.id+'/settings.json')));
        data[k] = v;
        fs.writeFileSync(path.resolve('./plugins/'+this.id+'/settings.json'), JSON.stringify(data));
    }

    pushNotification(value, options=null) {
        if (!options) console.log('[DEV ENV] Notification body: ' + value)
        if (options != {}) {
            if (options.image) {
                console.log('[DEV ENV] Notification image: ' + options.image, 'Notification body: ' + value);
            }
        }
    }

    registerNewType (name, type) {
        console.log('[DEV ENV] Registered new type: ' + name + ' (' + type + ')');
    }

    onInitialize () {
        console.log('[DEV ENV] This plugin has no initialization function.')
        return true;
    }

    onButton (interaction) {
        console.log('[DEV ENV] This plugin has no button press function.')
        return true;
    }
}
