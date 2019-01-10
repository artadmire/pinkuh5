import pk from '@/util/pk.js'
export default function onerror() {
  window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.log(error,"window.onerror")
    let message = [
      'Message: ' + msg,
      'URL: ' + url,
      'Line: ' + lineNo,
      'Column: ' + columnNo,
      'Error object: ' + JSON.stringify(error)
    ].join(' - ');
    console.log(message)
    pk.reportException({
      tag:'h5',
      exception: JSON.stringify(message)
    })
    return false;
  }
}
