var getStarredLinks = function(set) {
  var links = {};
  $("tr.statlink_lista_linki>td.statlink_lista_linki>a",set).each(function(index,element){
    var id = $(element).attr(id);
    if(!isNaN(id)){//to jest liczba, wiec potencajlnie id, ktorego szukamy
      var link = $(element).next().next().text();
      links[id] = link;
    }
  })
  return links;
}
var cmpLinks = function(links1,links2){
  var matches = {};
  for(var id in links1){
    var link1 = links1[id];
    var link2 = links2[id];
    if(link1 && link2){
      for(var i=0;i<link1.length && i<link2.length;i++){
        if(link1[i]==='*'){
          link1[i] = link2[i];
        }
      }
      matches[id] = link1;
    }
  }
}
var getAnotherInstaceOfWebsite = function(link){
  var promise = new Promise(function(resolve,reject){
    var idramki = "ramka_"+Math.random().toString().slice(2);
    var ramka = '<iframe src="'+link+'" id="'+idramki+'"></iframe>';
    $('body').append(ramka);
    $("#"+idramki).load(function(){
      var content = $("#"+idramki).contents();
      console.log(content)
      resolve(content);
    })
  })
  return promise;
}
var fillTheStars = function fillTheStars() {
  getAnotherInstaceOfWebsite(window.location.href).then(function(newLinks){
    var links = cmpLinks($("body"),getStarredLinks(newLinks));
    $("tr.statlink_lista_linki>td.statlink_lista_linki>a").each(function(index,element){
      var id = $(element).attr(id);
      if(!isNaN(id)){//to jest liczba, wiec potencajlnie id, ktorego szukamy
        var link = $(element).next().next();
        link.text(links[id]);//wpisanie linku
      }
    })
  })

}
// fillTheStars();

chrome.runtime.sendMessage({type:'showPageAction'});//pokazywanie ikonki
chrome.runtime.onMessage.addListener(function(message, sender) {
  console.log(message)
    if (message && message.type === 'fillTheStars') {
        fillTheStars();
    }
});
