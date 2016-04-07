//Business Logic (BL defines operations on input and output. IOs are not declared anywhere here)
//Objects: Objects are used to collect information about a type of entity
//Object functions: object functions/methods are used to perform a function on a single entity. Object Functions are followed by ()
//Constructs: Constructs are objects that are used to collect the same information about different objects
//Prototypes: Prototypes are used to perform certain functions on any entity without having to declare each time.
// Prototypes and object functions are followed by ()

function MakeArrays(){
  this.compile = [];
}

function CountryYear(country, year){
  // Construct. List the properties here. "this" represents every instantiation of the countryyear construct. If you define a function or method here, it can only be used on countryyear construct but not any instantiations of it. Prototypes are used to perform functions on many instantiations of a construct
  this.country = country;
  this.year = year;
};

  CountryYear.prototype.fullPlace = function(){
    // .fullPlace() is a prototype of countryyear object to compute country year concatenation for each input field batch.
    return this.country + ", " + this.year;
  };

function Address(street, state, country){
  // address object/construct to compute address for each input field batch
  this.street = street;
  this.state = state;
  this.country = country;
};

  Address.prototype.fullAddress = function(){
    // .fullAddress() is a prototype of address construct to compute address for each instantiation of address for each input field batch
    // To use the .fullAddress() prototype, you have to first define an object as an instantiation of the Address construct(object) using var object = new Construct
    return this.street + ", " + this.state + ", " + this.country;
  };

function Full(year, street, state, country, notes, countryYear, address){
  // full construct will be used to make an array of all the information for each input field batch
  this.year = year;
  this.street = street;
  this.state = state;
  this.country = country;
  this.notes = notes;
  this.countryYear = countryYear;
  this.address = address;
};

function reset(){ //reset function empties the input fields. This is an object function that can be called later on in the UI logic
  $("input.new-year").val("");
  $("input.new-street").val("");
  $("input.new-state").val("");
  $("input.new-country").val("");
  $("input.new-notes").val("");
};

// User Interface Logic (collects input info and displays output)
$(document).ready(function(){ // when the document is refreshed and finishes loading...

  $(".addField").click(function(event){
    // when the document loads, user should be able to add as many input fields as wanted to the form
    $("#inputBatch").append('<div class="new-inputBatch">' +
                  '<div class="form-group">' +
                    '<label for="year">What year did you visit this place:</label>' +
                    '<input id="year" type="text" class= "new-year">' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<label for="street">What is the address of the place you stayed:</label>' +
                    '<input id="street" type="text" class= "new-street">' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<label for="state">Enter the state which you have visited here:</label>' +
                    '<input id="state" type="text" class= "new-state">' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<label for="country">Enter a country you have visited here:</label>'+
                    '<input id="country" type="text" class= "new-country">' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<label for="notes">Please enter some memorable notes about this visit:</label>' +
                    '<input id="notes" type="text"  class= "new-notes">' +
                  '</div>' +
                '</div>');
  });

  $(".removeField").click(function(){
    // when the document loads, user should be able to hide the appended batch of input fields starting with the last one
    $("#inputBatch").children(".new-inputBatch").last().remove();
    // hide class new-inputbatch to remove the appended lists only but not id inputbatch so as to prevent hiding the original input field batch
  });

  var newMakeArrays = new MakeArrays;
  // this has to be a global variable so we can push series of mini-arrays to store and use to output later

  $("form#places").submit(function(event){
    // at any point when the document loads, user should be able to submit the form
    event.preventDefault(); // callback function to hold submitting the form every cycle

    $(".new-inputBatch").each(function(){
    // this is an each loop. For every new-inputBatch class which constitutes the initial field batch and all the appended ones, compute the following. We will use this loop to compile a super array with an arbitrary number of sub-arrays that hold all the info from each input field batch.

      var importYear = parseInt($(this).find("input#year").val());
      var importStreet = $(this).find("input#street").val();
      var importState = $(this).find("input#state").val();
      var importCountry = $(this).find("input#country").val();
      var importNotes = $(this).find("input#notes").val();
      var newCountryYear = new CountryYear(importCountry, importYear);
      // newCountryYear is an instantiation of the Countryyear construct and computes a new object newCountryYear to collect the country and year info from this group
      var outputCountryYear = newCountryYear.fullPlace();
      // The .fullPlace() prototype is applied to "this" instantiation of CountryYear to concatenate country and year
      var newAddress = new Address(importStreet, importState, importCountry);
      // newAddress is an instantiation of the Address construct and computes a new object newAddress to collect the street, state and country info of this group
      var outputAddress = newAddress.fullAddress();
      // The .fullAddress() prototype is applied to "this" instantiation of Address to concatenate
      var newFull = new Full(importYear, importStreet, importState, importCountry, importNotes, outputCountryYear, outputAddress); // declare newFull as an instantiation of the Full object/construct that gathers all the info for one batch

      newMakeArrays.compile.push(newFull);
      // compile is a property of MakeArrays. newMakeArrays.compile.push() wil push elements into the empty array. Create array and push in one line. Arrays have a mind if their own. newMakeArrays is the super array. newFull is the sub-array that holds all the info from each input field batch.
      // newMakeArrays.compile === [newFull1, newFull2, ...]

    }); // end of each loop

    newMakeArrays.compile.forEach(function(newMakeArray){
    // forEach loop to individually display the output for all the input field batches
    // For newFull1 implement everything below. Repeat for newFull2 and so on
    // newMakeArrays will be called using the newMakeArray placement/placeholder
      $("#list").append('<li><span class="clickToView">'+ newMakeArray.countryYear + '</span></li>');
      // Here we are asking JQuery to find the list (#list) and append <li>list of places</li> to the html code. Should read: Paris, 1992 for example
      // $(".clickToView").click(function(){
      // // after the countryYear items have been appended, this click listener displays more information
      //
      //   $(".addCountryYear").text(newMakeArray.countryYear);
      //   $(".addAddress").text(newMakeArray.address);
      //   $(".addNotes").text(newMakeArray.notes);
      //   // newMakeArray represents newFull1, 2 etc. countryyear, address and notes are properties of newFull(from Full construct) which is a property of newMakeArray(MakeArray construct)
      //   $(".placesInfo").toggle();
      });
    });

    $(".placesList").show(); // show the places list when you hit submit. Everything above this executes but is still hidden until showing

  reset(); // function call to empty input fields after you hit submit

  }); // End of submit event
}); // End of document ready event
