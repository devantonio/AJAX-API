$(document).ready(function () {
  $('button').click(function () {
    $("button").removeClass("selected");//What we could do is we could remove the class selected from all of the buttons, when one button is clicked. The code here needs to go before the other code, otherwise the user would click a button, it would be highlighted, then immediately after the class would be removed.
    $(this).addClass("selected");//The $this, is a way to indicate the element that's responding to the click event.In other words, $this refers to the button the user clicks, and only that button, not any of the other ones.
    var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";//?jsoncallback=? tells flickr that we're making a JSONP request. the question marks let you get around security limitations
    var animal = $(this).text();//JQuery provides a handy method called text that gets all of the text from inside the HTML element. In other words, the variable, animal, will hold the value cat when the cat button is clicked, dog when the dog button is clicked, and moose when the moose button is clicked. We need to send this word to Flickr, to tell it's server which pictures we want
    var flickrOptions = { //Remember that second argument to the getJSON method? That's the data we send along with the URL. jQuery expects this to be in the format of a JavaScript object. Here I've named the variable flickroptions. But, that's just my choice. It's a JavaScript variable after all. So you could just name it options or even opts. Short for options. Inside this object, I'll add the first name value pair. The property name here is tags. And it's value is the variable animal. Remember that's the button that the person clicked. In other words, the value will change depending on which button is clicked, dog, cat or moose.
   tags: animal,//This tells Flickr to search for photos that match a particular tag. So by sending that tag cat, tells the Flickr server to search for the most recent photos tagged with the word cat.
   format:"json"//This tells Flickr which format we want the data in. Remember that normally Flickr sends XML, but we want JSON data, so we need to set the format setting to JSON. Let's add that to the Flickr options object.  
    };
    function displayPhotos(data) {//now we just need to add a call back function.You can see that I named it display photos in the getJSON method call.So, I'll create a new function with that name.When Flickr returns its list of photos to the page, this function displayPhotos will run. Notice that it receives one argument, here it's named data. It represents theJSON data returned by jQuery.
      var photoHtml = '<ul>';
     
      $.each( data.items, function(i, photo) {//Let's use the $.each method to loop through each of the photos from the Flickr feed. But what do we need to access here? Let's look at an example of the Flickr feed again. There's a property here named item. As you can see, it's an array of photo information. One array item for each photo. So how do we access that array? Remember that the data returned from Flickr is given to our AJAX callback. We've stored that in a variable named data. So, data holds JSON data. It's actually really JavaScript at this point thanks to jQuery, which parsed the JSON string returned by Flickr. So, data is a JavaScript object. To access a property of that object, we need to use dot syntax. So, data.items holds the entire array of photos. We can pass that into the $.each method.
        photoHtml += '<li class="grid-25 tablet-grid-50">';//Now we just need to build up the HTML for each photo. An HTML list item, a link, and an image. First the opening li tag. Notice that I've added the classes that my designer specified in his mock-up design.
        photoHtml += '<a href="' + photo.link + '" class="image">';//Here's the link, but what URL do we use for the href attribute? Let's look at the feed again to see what the URL is. Here you see each item in the items array is itself a JavaScript object made of property names and values. The property name for the link is link. Remember that inside the $.each callback function, we gave an array item the variable name photo. So to get the links stored in that object, we use dot syntax again, photo.link. We have to use string concatenation to do this. We add a literal string to the value of the property in the object, and then we add that to another literal string. Now, inside the link, we'll add an image, close the a tag and close the li tag.
        photoHtml += '<img src="' + photo.media.m + '"></a></li>'; /**Again, we have to figure out what we're gonna use for the source property. Let's go back to Flickr and check it out. Okay, as you can see, there's an object here named media and the value of it is another object. So photo.media.m will contain the path to the thumbnail image file. We have to concatenate this string as well. So each time through the loop, we keep adding on to this variable, photoHTML. It will keep getting longer with more and more list items added until we've looped through the entire list of photos. Now, outside the loop, after we're done building the list of photos, we can close the ul tag.**/
      });
      photoHtml += '</ul>';//always close outside of the function
      $('#photos').html(photoHtml);//And the last thing is to add this string to the HTML of our page.
      
        //the $.each method takes two arguments. The first is an array, and the second is a callback function. This method loops through each item in an array and applies the callback function to it. The $.each method gives the callback function two pieces of information, or two arguments. The first is the index value of the array item, and the second is the actual item in the array. Remember this is a loop. Those two arguments change as the $.each method works its way through each item in the array.//Let's look at an example of how this works. Imagine we have a variable named fruit. It holds        an array of fruit names. You can use the $.each method to loop through that array and act on   each item. var fruit = [
      //0 "apple",
      //1 "orange",
      //2 "tangerine",
      //3 "strawberry",
      //4 "mango"
      //];
      //$.each( array, function (i, "item") {
      //alert('item ' +i+ ' is ' "item");
      //});
      // or it can be written in plain javascript for loop
      //(i=0; i < fruit.length ; i++) {
         //alert('item ' + i ' is ' + fruit[i]);
             
    };
    $.getJSON(flickrAPI,flickrOptions, displayPhotos);//it takes three arguments.First, the URL to the resource.In this case, that's Flickr's public photo feed.second, the data we want to send along with the URL. This data will affect what information Flickr will return it its response, we'll look at that in just a moment. Finally, the third argument is a callback function, the programming that runs when Flickr sends back its response Let's start with the URL, I'll define a variable to hold it.
      
  });
});//end ready





/**
point out that there are other ways you could write this code.
For example, I created two variables and a
named function, then passed those into the getJSON function.
But you don't have to do it that way.
Some programmers like to skip creating separate variables and just
pass all the information straight into the getJSON function like this.

$.getJSON("http://api.flicker.com/services/feeds/photos_public.gne?jsoncallback=?";, {  HERE'S THE URL
               
               tags: animal,   HERE'S THE DATA
                format: "json"
                },
                function (data) {   HERE'S THE CALLBACK
                
                });
                
                
                EXAMPLE below
                
                
               $(document).ready(function() {

  var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather';
  var data = {
    q : "Portland,OR",
    units : "metric"
  };
  function showWeather(weatherReport) {
    $('#temperature').text(weatherReport.main.temp);
  }
  
  
  $.getJSON(weatherAPI,data, showWeather);
  
});
 
                
                
                
                
                **/


