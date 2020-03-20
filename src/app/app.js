/* eslint-disable indent */
/* eslint-disable quotes */

import { FIVE_MINUTE } from "../helper/defined"

// Style sheets
import "../assets/scss/index.scss"
import "../assets/scss/facebook.scss"
import "../assets/scss/drive.scss"
import "../assets/scss/google.scss"
import "../assets/scss/github.scss"

const hosts = ['spotify', 'google', 'facebook', 'github', 'fiverr', 'youtube']
const currentHost = location.host

hosts.forEach(host => {
   if (currentHost.includes(host)) document.body.id = 'rkanik-' + host
})

if (currentHost.includes('spotify'))
   document.querySelector('._3c08e30e0b5018cc15edf990e21d3dc5-scss').style.display = 'none'
// Reload fiverr in every five minutes   
else if (currentHost.includes('fiverr'))
   setInterval(() => { location.reload() }, FIVE_MINUTE);