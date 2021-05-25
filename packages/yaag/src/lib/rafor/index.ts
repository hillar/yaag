
/**
 * Iterates over array in async manner. This function attempts to maximize
 * number of elements visited within single event loop cycle, while at the
 * same time tries to not exceed a time threshold allowed to stay within
 * event loop.
 *
 * @param {Array} array which needs to be iterated. Array-like objects are OK too.
 * @param {VisitCalback} visitCallback called for every element within for loop.
 * @param {DoneCallback} doneCallback called when iterator has reached end of array.
 * @param {Object=} options - additional configuration:
 * @param {number} [options.step=1] - default iteration step
 * @param {number} [options.maxTimeMS=8] - maximum time (in milliseconds) which
 *   iterator should spend within single event loop.
 * @param {number} [options.probeElements=5000] - how many elements should iterator
 *   visit to measure its iteration speed.
 */


export function asyncFor(array, visitCallback, doneCallback, options): void {
  let start = 0;
  let elapsed = 0;
  options = options || {};
  const step = options.step || 1;
  const maxTimeMS = options.maxTimeMS || 8;
  let pointsPerLoopCycle = options.probeElements || 5000;
  // we should never block main thread for too long...
  setTimeout(processSubset, 0);

  function processSubset() {
    const finish = Math.min(array.length, start + pointsPerLoopCycle);
    let i = start;
    const timeStart = new Date().getTime();
    for (i = start; i < finish; i += step) {
      visitCallback(array[i], i, array);
    }
    if (i < array.length) {
      elapsed += (new Date().getTime() - timeStart);
      start = i;

      pointsPerLoopCycle = Math.round(start * maxTimeMS/elapsed);
      setTimeout(processSubset, 0);
    } else {
      doneCallback(array);
    }
  }
}
