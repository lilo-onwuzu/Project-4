//Business Logic (BL defines operations on input and output. IOs are not declared anywhere here)
//Objects: Objects are used to collect information about a type of entity
//Object functions: object functions/methods are used to perform a function on a single entity. Object Functions are followed by ()
//Constructs: Constructs are objects that are used to collect the same information about different objects
//Prototypes: Prototypes are used to perform certain functions on any entity without having to declare each time.
// Prototypes and object functions are followed by ()

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
    return this.street + ", " + this.state + ", " + this.country;
  };

function Push(year, street, state, country, notes){
  // push construct will be used to make an array of all the information for each input field batch
  this.year = year;
  this.street = street;
  this.state = state;
  this.country = country;
  this.notes = notes;
};

  Push.prototype.pushIn = function(){
    var blanks = [];
    return blanks.push(this.year, this.street, this.state, this.country, this.notes);
    // the .pushIn() prototype will return an array of the group of info from one input field batch. To use the .pushIn() prototype, you have to first define an object as an instantiation of the Push construct(object) using var object = new Construct
  };

function reset(){ //reset function empties the input fields. This is an object function that can be called later on in the UI logic
  $("input.year").val("");
  $("input.street").val("");
  $("input.state").val("");
  $("input.country").val("");
  $("input.notes").val("");
};

// User Interface Logic (collects input info and displays output)
$(document).ready(function(){ // when the document is refreshed and finishes loading...

  $(".add").click(function(event){
    // when the document loads, user should be able to add as many input fields as wanted to the form
    $("form#places").append('<div class="inputBatch">' +
                  '<div class="form-group">' +
                    '<label for="year">What year did you visit this place:</label>' +
                    '<input class="year" type="text">' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<label for="street">What is the address of the place you stayed:</label>' +
                    '<input class="street" type="text">' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<label for="state">Enter the state which you have visited here:</label>' +
                    '<input class="state" type="text">' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<label for="country">Enter a country you have visited here:</label>'+
                    '<input class="country" type="text">' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<label for="notes">Please enter some memorable notes about this visit:</label>' +
                    '<input class="notes" type="text">' +
                  '</div>' +
                '</div>');
  });

  $(".remove").click(function(){
    // when the document loads, user should be able to hide the appended batch of input fields starting with the last one
    $("form#places").children(".inputBatch").last().remove();
  });

  $("form#places").submit(function(event){
    // at any point when the document loads, user should be able to submit the form
    event.preventDefault(); // callback function to hold submitting the form every cycle

    reset(); // function call to empty input fields after you hit submit

    $(".inputBatch").each(function(){
      // this is an each loop. Find inputBatch class. For each inputBatch class, compute the following

      var importYear = $this.find("input.year").val(); // .val() imports as a string unless parseInt'd. At any point when you hit submit, transfer in the data from the input fields
      var importStreet = $this.find("input.street").val();
      var importState = $this.find("input.state").val();
      var importCountry = $this.find("input.country").val();
      var importNotes = $this.find("input.notes").val();
      var importAll = new Push(importYear, importStreet, importState, importCountry, importNotes); // declare importAll as an instantiation of the Push object/construct
      var outputarray = importAll.pushIn(); // use the .pushIn() prototype to create an array of all the info from one input field batch

      var newCountryYear = new CountryYear(importCountry, importYear);
      // newCountryYear is an instantiation of the Countryyear construct and computes a new object newCountryYear to collect the country and year info from this group
      var outputCountryYear = CountryYear.fullPlace();
      // The .fullPlace() prototype is applied to "this" instantiation of CountryYear to concatenate country and year
      var newAddress = new Address(importStreet, importState, importCountry);
      // newAddress is an instantiation of the Address construct and computes a new object newAddress to collect the street, state and country info of this group
      var outputAddress = Address.fullAddress();
      //  The .fullAddress() prototype is applied to "this" instantiation of Address to concatenate

      $("#list").append(outputCountryYear);
        // append list of places visited to placesList. Should read: Paris, 1992 for example

      $("#list").click(function(){
        // after the countryYear items have been appended, show the items in the list to view more information
        $(".placesInfo").show();
        $(".addPlace").text(outputCountryYear);
        $(".addAddress").text(outputAddress);
        $(".addNotes").text(importNotes);
      });

    }); // end of each loop

    $(".placesList").show(); // show the places list when you hit submit. Everything above this executes but is still hidden until showing

  }); // End of submit event
}); // End of document ready event
