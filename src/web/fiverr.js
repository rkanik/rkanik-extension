import { FIVE_MINUTE } from "../helper/defined"

const init = () => {

   // Defining a job
   let fiveMinuteTimeout

   // Method will  start the job
   const startFiveMinuteReloader = () => {
      fiveMinuteTimeout = setTimeout(() => { location.reload() }, FIVE_MINUTE);
   }

   // starting reloader when tab is in background
   if (document.hidden) { startFiveMinuteReloader() }

   // Listening on visibilitychange
   document.addEventListener("visibilitychange", () => {
      
      // starting reloader when tab is in background
      if (document.hidden) { startFiveMinuteReloader() }

      // Clearing reloader timeout when tab get focused
      else if (!document.hidden && fiveMinuteTimeout) { clearTimeout(fiveMinuteTimeout) }
   });
}

export default { init }