// Shared by the coach server (api/coach.js) and the browser (serverSample.js).
// The server sends this as the very last bytes when a reply could not be finished
// (cut off, AI error or time limit). The message was given back, and the browser
// drops the half reply and offers to send the question again.
export const INCOMPLETE = '\u0000INCOMPLETE'
