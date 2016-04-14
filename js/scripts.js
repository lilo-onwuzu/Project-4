// // Business Logic
function MakeArrays(){
  this.compile = [];
}
function PersonalDetails(orderName,address,note){
  this.orderName = orderName;
  this.address = address;
  this.note = note;
  this.compile = [];
}
function PizzaDetails(pizzaSize,topping,basePrice){
  this.pizzaSize = pizzaSize;
  this.topping = topping;
  this.basePrice = basePrice;
  this.compile = [];
}
function reset(){
  $("input.new-orderName").val("");
  $("input.new-address").val("");
  $("input#note").val("");
}
function Pricing(basePrice,toppingPrice,pizzaNumber,toppingNumber){
  this.basePrice = basePrice;
  this.toppingPrice = toppingPrice;
  this.pizzaNumber = pizzaNumber;
  this.toppingNumber = toppingNumber;
}
Pricing.prototype.compute = function(){
  // prototype
  return this.basePrice + (this.toppingNumber * this.toppingPrice);
};

// User Interface Logic//
$(document).ready(function(){

  var importPizzaNumber = 0;
  var importToppingNumber = 0;
  var newMainArrays = new MakeArrays();
  var arrayTopping = new MakeArrays();
  var newPizzaDetails = new PizzaDetails();
  var arrayPizzaDetails = new PizzaDetails();
  var importToppingPrice = 2;
  var total = 0;
  var importBasePrice = 0;

  $(".method").change(function(){
      if ($("option:selected").val() === "Delivery"){
        $(".hideAddress").show();
    };
  }); // change listener to show address field when you select delivery option

  $(".inputPizza").click(function(){
    // click listener to append class new-pizzaDetails to client Details and initial input field with id "new-pizzaDetails"
    $(".clientDetails").append(
      '<div class= "classPizzaDetails">' +
        '<div class="form-group size">' +
          '<strong>Choose a size:</strong>' +
            '<select id="size">' +
            '<option>Small</option>' +
            '<option>Medium</option>' +
            '<option>Large</option>' +
            '</select>' +
        '</div>' +
        '<div class="form-group topping">' +
          '<strong>Choose Toppings:</strong>' +
          '<div class="checkbox">' +
            '<label>' +
            '<input class="new-topping" type="checkbox" name="topping" value="Bacon">' +
             'Bacon' +
            '</label>' +
          '</div>' +
          '<div class="checkbox">' +
            '<label>' +
            '<input class="new-topping" type="checkbox" name="topping" value="Pepperoni">' +
            'Pepperoni' +
            '</label>' +
          '</div>' +
          '<div class="checkbox">' +
            '<label>' +
            '<input class="new-topping" type="checkbox" name="topping" value="Pineapple">' +
            'Pineapple' +
            '</label>' +
          '</div>' +
          '<div class="checkbox">' +
            '<label>' +
            '<input class="new-topping" type="checkbox" name="topping" value="Spinach">' +
            'Spinach' +
            '</label>' +
          '</div>' +
          '<div class="checkbox">' +
            '<label>' +
            '<input class="new-topping" type="checkbox" name="topping" value="Green Peppers">' +
            'Green Peppers' +
            '</label>' +
          '</div>' +
        '</div>');
  });

  $(".removePizza").click(function(event){
    $("#pizzaDetails").children(".classPizzaDetails").last().remove();
  }); // click listener to remove the last appended input field

  $("form#order").submit(function(event){
    event.preventDefault();

    // module to import user details on submit. Find these values in the form
    var importOrderName = $(this).find("input#orderName").val();
    var importAddress = $(this).find("input#address").val();
    var importNote = $(this).find("input#note").val();
    var newPersonalDetails = new PersonalDetails(importOrderName,importAddress,importNote);
    newMainArrays.compile.push(newPersonalDetails); // make an array to push Personal Details once
    // now newMainArrays = {{newPersonalDetails}}

    // pizza loop. Each is to objects as ForEach is to arrays.
   $(".classPizzaDetails").each(function(){
     var importSize = $(this).find("#size").val();
      // assign base price based on pizza size
      if(importSize === "Small"){
        importBasePrice = 10;
      } else if(importSize === "Medium"){
          var importBasePrice = 12;
        } else if(importSize === "Large"){
            var importBasePrice = 14;
            }
     importPizzaNumber+=1; // increment pizzaNumber at each loop cycle
     // toppings loop inside pizza loop
     $(this).find(".checkbox").find(".new-topping").each(function(){
       if (this.checked){
         arrayTopping.compile.push(this.value); // compile array of toppings per pizza
         importToppingNumber=0;
         importToppingNumber+=1 // increment toppingNumber at each topping loop cycle
       }
     }); // end of toppings loop
     var importTopping = arrayTopping;
     newPizzaDetails = new PizzaDetails(importSize,importTopping,importBasePrice); // newPizzaDetails gets re-assigned every cycle
     arrayTopping = new MakeArrays(); // toppings array gets re-assigned every cycle after push for next cycle
     arrayPizzaDetails.compile.push(newPizzaDetails); // array of pizzadetails
     newMainArrays.compile.push(newPizzaDetails); // full array add pizzadetails object to main array and loop
     // module to calculate price within pizza loop
     var newPricing = new Pricing(importBasePrice,importToppingPrice,importPizzaNumber,importToppingNumber); // compute price for each pizza based on size
     var pricePerPizza = newPricing.compute();
     total = total + pricePerPizza;
   }); // end of pizza loop.
    // newMainArrays = {{newPersonalDetails},{newPizzaDetails1},{newPizzaDetails2}...}={{name, address, note},{size1,toppings1},{size2,toppings2}...}
    // arrayPizzaDetails = {{newPizzaDetails1},{newPizzaDetails2}...}

    console.log(total);

    // Module to display results from MainArrays "database"
    $(".addName").text(newPersonalDetails.orderName);
    $(".addAddress").text(newPersonalDetails.address);
    $(".addNotes").text(newPersonalDetails.note);
    $(".addTotal").text(total);

    // display loop. arrayPizzaDetail = newPizzaDetails1...
    arrayPizzaDetails.compile.forEach(function(arrayPizzaDetail){
      $("#pizzaList").append('<li><span class="clickToView">'+ arrayPizzaDetail.pizzaSize + " Pizza" + '</span></li>');

      $(".clickToView").last().click(function(){
        $(".addSize").text(arrayPizzaDetail.pizzaSize);
        arrayPizzaDetail.topping.compile.forEach(function(top){
          $("#addTopping").append('<li>'+ top + '</li>');
        }); // end of import toppings loop
        $(".orderInfo").toggle();
      }); // end of click to view
    }); // end of pizza list

    $(".orderList").show();

    reset();

  }); // End of submit event
}); // End of document ready event
