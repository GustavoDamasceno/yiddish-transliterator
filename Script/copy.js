var clipboard = new Clipboard('.bf');
clipboard.on('success', function(e) {
console.log(e); 
});
clipboard.on('error', function(e) {
console.log(e);
});