import {tripArray} from './defineTrip.js';

function hndlDeleteTrip (event, arrayLoc) {
  event.preventDefault()
  document.getElementById(`trip${arrayLoc}`).remove();
};


export { hndlDeleteTrip };
