/* eslint-disable indent */
/* eslint-disable quotes */

// imports
//import Vue from "vue"
//import { FIVE_MINUTE, ONE_SECOND } from "../helper/defined"

// Store
//import store from "../store"
//import { POPUP } from "../store/store.config"

// Chrome storage
import storage from "../storage/chrome.storage"
let { WEBSITES } = storage.keys

// Style sheets
import "../assets/scss/app.scss"

// Components
// import IntroLoader from "../components/IntroLoader.vue"

// Websites
//import slither from "../web/slither-io"
import fiverr from "../web/fiverr"
import spotify from "../web/spotify"
import facebook from "../web/facebook"

const setBodyId = websites => {

   let website = websites.find(w => location.host.includes(w.name.toLowerCase()))

   if (website && website.active) { document.body.id = "aiod-" + website.name.toLowerCase() }

   else document.body.removeAttribute('id')
}

const init = async () => {

   let state = await storage.get()
   let websites = state[WEBSITES]
   websites && setBodyId(websites)

   // Initializing current website
   if (location.host.includes('fiverr')) { fiverr.init() }
   else if (location.host.includes('spotify')) { spotify.init() }
   else if (location.host.includes('facebook')) { facebook.init() }
   //else if (location.host.includes('slither.io')) { slither.init() }

   storage.onChanged(newState => {
      if (JSON.stringify(newState[WEBSITES].newValue) !== JSON.stringify(websites)) {
         websites = newState[WEBSITES].newValue
         setBodyId(websites)
      }
   })

}


init()

// storage.onChanged(res => {
//    console.log(res)
// })

// // Inform the background page that 
// // this tab should have a page-action.
// chrome.runtime.sendMessage({
//    from: 'content',
//    subject: 'showPageAction',
// });

// // Listen for messages from the popup.
// chrome.runtime.onMessage.addListener((msg, sender, response) => {
//    console.log("chrome.runtime.onMessage.addListener", msg, sender)
//    // First, validate the message's structure.
//    if ((msg.from === 'popup') && (msg.subject === 'TEST')) {

//       // Directly respond to the sender (popup), 
//       // through the specified callback.
//       response({ message: "Response from app" });
//    }
// });


// //const hosts = ['spotify', 'google', 'facebook', 'github', 'fiverr', 'youtube']
// const hosts = store.state[POPUP].websites.filter(w => w.active).map(w => w.name.toLowerCase())

// console.log('hosts', hosts)

// const currentHost = location.host


// // Disable production-tip
// Vue.config.productionTip = false;

// // Create vue function
// const createVueApp = (mountPoint, component, props = {}) => {
//    console.log('createVueApp', mountPoint);
//    new Vue({
//       render: h => h(component, { props })
//    }).$mount(mountPoint)
// }


// const sleep = ms => new Promise(res => setTimeout(() => res(), ms))
// const hideSpotifyAdd = async () => {
//    let hidden = false
//    while (!hidden) {
//       let adContainer = document.querySelector('._3c08e30e0b5018cc15edf990e21d3dc5-scss')
//       if (adContainer) { adContainer.style.display = 'none'; hidden = true }
//       await sleep(ONE_SECOND)
//    }
// }
// if (currentHost.includes('spotify')) hideSpotifyAdd()

// // Reload fiverr in every five minutes   
// if (currentHost.includes('fiverr')) {

//    setInterval(() => { location.reload() }, FIVE_MINUTE);

//    // let loaderContainer = document.createElement('div')
//    // loaderContainer.id = "rk-loader-container"
//    // document.body.insertBefore(loaderContainer, document.getElementById('main-wrapper'))
//    // createVueApp(loaderContainer, IntroLoader)

//    // setInterval(() => {
//    //    console.log("document.hidden", document.hidden)
//    //    console.log("document.msHidden", document.msHidden)
//    //    console.log("document.webkitHidden", document.webkitHidden)
//    // }, 1000);


//    // Set the name of the hidden property and the change event for visibility
//    //var hidden, visibilityChange;
//    // if (typeof document.hidden !== "undefined") {
//    //    hidden = "hidden";
//    //    visibilityChange = "visibilitychange";
//    // } else if (typeof document.msHidden !== "undefined") {
//    //    hidden = "msHidden";
//    //    visibilityChange = "msvisibilitychange";
//    // } else if (typeof document.webkitHidden !== "undefined") {
//    //    hidden = "webkitHidden";
//    //    visibilityChange = "webkitvisibilitychange";
//    // }
// }
