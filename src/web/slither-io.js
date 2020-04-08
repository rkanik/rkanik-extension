
const init = () => {
   console.log("slither io")
   document.body.onmousewheel = e => {
      console.log(e)
      //if (!window.gsc) { return }
      console.log(window.gsc)
      console.log(window.lvz)
      window.lvz *= Math.pow(0.93, e.wheelDelta / -120 || e.detail / 2 || 0);
      window.lvz > 2 ? window.lvz = 2 : window.lvz < 0.1 ? window.lvz = 0.1 : null;
      window.gsc = window.lvz;
   }
}

export default { init }