// Websites
import fiverr from "../web/fiverr"
import spotify from "../web/spotify"
import facebook from "../web/facebook"

// Chrome storage
import _storage from '../chrome/_storage'
import storage from "../storage/chrome.storage"
import { WEBSITES, THEMES } from '../chrome/_storage/keys'
import { RK_DATA_THEME, RK_DATA_WEB, SPLASH_SCREEN, DARK } from '../helpers/defined'

// Style sheets
import "../assets/scss/app.scss"
import { sleep } from "../helpers/helpers"

console.log(':: APP ::');

const ready = cb => {
    if (document.readyState != "loading") { cb(); }
    else { document.addEventListener("DOMContentLoaded", cb); }
}

const setBodyId = websites => {

    let website = websites.find(w => location.host.includes(w.name.toLowerCase()))

    if (website && website.active) { document.body.id = "aiod-" + website.name.toLowerCase() }

    else document.body.removeAttribute('id')
}

const setSplashScreen = (config = {}) => {
    console.log('setSplashScreen', config);
    if (config.remove) {
        return document.body.removeChild(
            document.getElementById(SPLASH_SCREEN)
        )
    }
    let overlay = document.createElement('div')
    overlay.id = SPLASH_SCREEN
    overlay.style.cssText = `
        position: fixed; height: 100vh; width: 100%;
        top: 0; left: 0; background-color: #18191A;`
    document.body.appendChild(overlay)
}

// Function to sync theme on supported websites
const syncTheme = async () => {

    let themes = await _storage.get(THEMES)
    //console.log("THEMES", themes);
    if (!themes) return

    let website = themes.find(web => web.origin === location.origin)
    if (website && website.theme.dark) {
        document.documentElement.setAttribute(RK_DATA_THEME, DARK)
        document.documentElement.setAttribute(RK_DATA_WEB, website.name.toLowerCase())
    }

}

const init = async () => {

    console.clear()
    console.log('Initialized :: ', chrome);
    console.log('Document ready :: ', document);

    syncTheme()

    //console.log('Websites :: ', await _storage.get(WEBSITES));

    let state = await storage.get()
    //console.log('State :: ', state);
    let websites = state[WEBSITES]
    //websites && setBodyId(websites)

    //console.log('Location :: ', location);
    //console.log('location.host', location.host);

    // Initializing current website
    if (location.host.includes('fiverr')) { fiverr() }
    else if (location.host.includes('spotify')) { spotify.init() }
    else if (location.host.includes('facebook')) { facebook() }

    _storage.onChanged(WEBSITES, webs => {
        //console.log('WEBSITES', webs);
        syncTheme()
    })
}

ready(init); // call init when ready