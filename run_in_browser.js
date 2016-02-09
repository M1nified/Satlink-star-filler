var getStarredLinks = function(set) {
  // console.log('SET:',set);
  var links = {};
  $("tr.statlink_lista_linki>td.statlink_lista_linki>a",set).each(function(index,element){
    // console.log("ELEMENT",element)
    var id = $(element).attr('id');
    if(!isNaN(id)){//to jest liczba, wiec potencajlnie id, ktorego szukamy
      // console.log($(element).parent().next().next().next())
      var link = $(element).parent().next().next().next().text();
      // console.log(link)
      links[id] = link;
    }
  })
  return links;
}
var cmpLinks = function(links1,links2){
  // console.log('links1',links1);
  // console.log('links2',links2);
  var matches = {};
  for(var id in links1){
    var link1 = links1[id].split('');
    var link2 = links2[id].split('');
    // console.log('link1',link1)
    // console.log('link2',link2)
    if(link1 && link2){
      // console.log('MATCH')
      for(var i=0;i<link1.length && i<link2.length;i++){
        if(link1[i]==='*'){
          link1[i] = link2[i];
        }
      }
      matches[id] = link1.join('');
    }
  }
  return matches;
}
var getAnotherInstaceOfWebsite = function(link){
  var promise = new Promise(function(resolve,reject){
    var idramki = "ramka_"+Math.random().toString().slice(2);
    var ramka = '<iframe src="'+link+'" id="'+idramki+'"></iframe>';
    $('body').append(ramka);
    $("#"+idramki).load(function(){
      var content = document.getElementById(idramki).contentDocument.body;
      // console.log(content)
      resolve(content);
    })
  })
  return promise;
}
var fillTheStars = function fillTheStars() {
  // var ramka = $("ramka_7089342731051147")[0];
  // console.log(document.getElementById('ramka_7089342731051147').contentDocument.body)
  // return;
  getAnotherInstaceOfWebsite(window.location.href).then(function(newLinks){
    var links = cmpLinks(getStarredLinks($('body')),getStarredLinks(newLinks));
    console.log('links',links)
    $("tr.statlink_lista_linki>td.statlink_lista_linki>a").each(function(index,element){
      var id = $(element).attr('id');
      if(!isNaN(id)){//to jest liczba, wiec potencajlnie id, ktorego szukamy
        var link = $(element).parent().next().next().next();
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
