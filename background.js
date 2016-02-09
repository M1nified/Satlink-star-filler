chrome.pageAction.onClicked.addListener(function(tab){
  console.log(tab)
  chrome.runtime.sendMessage({type:'fillTheStars'});
  chrome.tabs.executeScript(tab.id,{
    code:'fillTheStars();console.log(1);'
  })
})
chrome.runtime.onMessage.addListener(function(message, sender) {
    if (message && message.type === 'showPageAction') {
        var tab = sender.tab;
        chrome.pageAction.show(tab.id);
    }
});
