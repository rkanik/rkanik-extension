import { ONE_SECOND } from "../helpers/defined"

const sleep = ms => {
   return new Promise(res => {
      setTimeout(() => res(), ms)
   })
}

const hideAd = async () => {
   let hidden = false
   while (!hidden) {
      let adContainer = document.querySelector('._3c08e30e0b5018cc15edf990e21d3dc5-scss')
      if (adContainer) { adContainer.style.display = 'none'; hidden = true }
      await sleep(ONE_SECOND)
   }
}

const init = () => {
   hideAd()
}

export default { init }