'use strict';

var allmyimg=[];
let optionarr=[];
function Myimg (image_url, title, description, keyword, horns){
  this.image_url=image_url;
  this.title=title;
  this.description=description;
  this.keyword=keyword;
  this.horns=horns;
  allmyimg.push(this);
}
console.log(allmyimg);

Myimg.prototype.renderfun = function(){
  let imageClone = $('.photo-template').clone();
  
  imageClone.removeClass('photo-template');
  imageClone.children('img').attr('src',this.image_url);
  imageClone.children('h2').text(this.title);
  imageClone.children('p').text(this.description);
  $('main').append(imageClone);
};

const ajaxSettings ={
  method:'get',
  datatype:'json'
};

$.ajax('./data/page-1.json',ajaxSettings)
  .then(data=> {
    //   console.log(data);
    data.forEach(el => {
      let image = new Myimg(el.image_url, el.title, el.description, el.keyword, el.horns)
      image.renderfun();
      if(optionarr.includes(el.keyword)== false){
        optionarr.push(el.keyword);
      }
    });
    addOption()
  });
  
  function addOption(){

    optionarr.forEach(ele => {
      let opC = $('.option').clone();
      opC.removeClass('option');
      opC.attr('value',ele);
      opC.text(ele);
      $('select').append(opC);
    });
  }


$('select').on('click', function(event){
  $('main').html('');

if(event.target.value =='default'){
  allmyimg.forEach(element => {
    element.renderfun();
  });
}else{
  allmyimg.forEach(element => {
    if (event.target.value == element.keyword) {
      element.renderfun();
    }
    
  });
}
})