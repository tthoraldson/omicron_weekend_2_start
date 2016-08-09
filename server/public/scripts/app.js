var people = [];
var peopleIndex = 0;
var currentIndex = 0;
var max = 0;
// outside DOM ready
$.ajax({
  type: "GET",
  url: "/data",
  success: function(data){
    people = data.omicron;
    appendBoxes(people);
    max = data.omicron.length - 1;
    console.log(max);

    showPerson(people[0]);
    $('#i0').css('background-color', 'red');
  }
});

function appendBoxes(array){
  for (var i = 0; i < array.length; i++) {
    $('.boxes').append('<div class="box" id="i' + peopleIndex + '"></div>');
    peopleIndex++;
  }
}

function showPerson(person){
$('.container').append('<h3>' + person["name"] + '</h3>');
$('.container').append('<a href="http://github.com/' + person["git_username"] + '">http://github.com/' + person["git_username"] + '</a>');
$('.container').append('<p>' + person["shoutout"] + '</p>');

$('.box').css('background-color', 'grey');
$('#i' + currentIndex).css('background-color', 'red');
}


$(document).ready(function(){
  var timer = setInterval(function(){
    currentIndex++
    if (currentIndex > max){
      currentIndex = 0;
    }
    $('.container').empty();
    showPerson(people[currentIndex])
  }, 5000);

    // changes view based on box clicked
  $('main').on('click', '.box', function(){
    clearInterval(timer);
    $('.container').empty();
    $('.box').css('background-color', 'grey');
    var disIndex = $(this).attr('id');
    $('#' + disIndex).css('background-color', 'red');

    currentIndex = parseInt(disIndex.replace('i', ''));
    showPerson(people[currentIndex]);
  });

  $('.btn').on('click', '.previous', function(){
    clearInterval(timer);
    currentIndex--;
    if (currentIndex < 0){
      currentIndex = max;
    }
    $('.container').empty();
    showPerson(people[currentIndex])
  });

  $('.btn').on('click', '.next', function(){
    clearInterval(timer);
    currentIndex++;
    if (currentIndex > max){
      currentIndex = 0;
    }
    $('.container').empty();
    showPerson(people[currentIndex]);
  });
});
// function appendEveryone(array){
//   for(var i = 0; i < array.length; i++){
//     appendPerson(array[i]);
//   }
// }
//
// function appendPerson(person){
//   // store content to DOM
//   $('.container').append('<div class="person ' + person["git_username"] + '"></div>');
//   $('.container').children().last().css('display', 'none')
//
//   // add information to new person
//   $('.container').children().last().append('<h3>' + person["name"] + '</h3>');
//   $('.container').children().last().append('<a href="http://github.com/' + person["git_username"] + '">http://github.com/' + person["git_username"] + '</a>');
//   $('.container').children().last().append('<p>' + person["shoutout"] + '</p>');
//
//   // append new box to DOM
//   $('.boxes').append('<div class="box" id="' + person["git_username"] + '"></div>')
// }
//
// function firstDisplay(person){
//   $('.person').css('display', 'none');
//   $('.box').css('background-color', 'grey');
//
//   var displayClass = $(this).attr('id');
//   $('.' + displayClass).css('display', 'initial');
//   $('#' + displayClass).css('background-color', 'red');
// }
//
// function display(){
//   $('.person').css('display', 'none');
//   var displayClass = $(this).attr('id');
//   displayClass = displayClass.replace('box ', '');
//   $('.' + displayClass).css('display', 'initial');
// }
