
const hosts = ["spotify", "google", "facebook", "github"]
let currentHost = location.host

hosts.forEach(host => {
   if (currentHost.includes(host)) document.body.id = "rkanik-" + host
})

// if (currentHost.includes('google')) {
//    let headerTab = document.getElementById('hdtbSum')
//    headerTab.style.background = "#292a2d"
// }

if (location.host.includes("spotify")) {
   document.querySelector("._3c08e30e0b5018cc15edf990e21d3dc5-scss").style.display = 'none'
}