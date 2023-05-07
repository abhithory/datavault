
document.getElementById('getCredentialsBtn').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentUrl = tabs[0].url;
        // alert(currentUrl)
        console.log('==================current website==================');
        console.log(currentUrl);
        console.log('====================================');
    });
  });