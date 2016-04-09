// // Business Logic
function MakeArrays(){
  this.compile = [];
}
function Details(orderName, address, note){
  this.orderName = orderName;
  this.address = address;
  this.note = note;
  this.compile = [];
}
function PizzaDetails(size, topping){
  this.size = size;
  this.topping = topping;
  this.compile = [];
}
function reset(){
  $("input.new-orderName").val("");
  $("input.new-address").val("");
}
function Pricing(basePrice, toppingPrice, pizzaNumber, toppingNumber){
  this.basePrice = basePrice;
  this.toppingPrice = toppingPrice;
  this.pizzaNumber = pizzaNumber;
  this.toppingNumber = toppingNumber;
}
Pricing.compute = function(){
  // single object method
  return this.pizzaNumber*(this.basePrice + (this.toppingNumber * this.toppingPrice));
};

// User Interface Logic//
$(document).ready(function(){

  $("#method").select(function(){
    $(".hideAddress").show();
  });

  $(".addPizza").click(function(event){

    $(".clientDetails").append(
      '<div class= "new-pizzaDetails">' +
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
            '<input type="checkbox" name="topping" value="Bacon">' +
             'Bacon' +
            '</label>' +
          '</div>' +
          '<div class="radio">' +
            '<label>' +
            '<input type="checkbox" name="topping" value="Pepperoni">' +
            'Pepperoni' +
            '</label>' +
          '</div>' +
          '<div class="radio">' +
            '<label>' +
            '<input type="checkbox" name="topping" value="Pineapple">' +
            'Pineapple' +
            '</label>' +
          '</div>' +
          '<div class="radio">' +
            '<label>' +
            '<input type="checkbox" name="topping" value="Spinach">' +
            'Spinach' +
            '</label>' +
          '</div>' +
        '</div>' +
        '<div class="radio">' +
          '<label>' +
          '<input type="checkbox" name="topping" value="Green Peppers">' +
          'Green Peppers' +
          '</label>' +
        '</div>' +
       '</div>');
  });

  $(".removePizza").click(function(){
    $("#clientDetails").children(".pizzaDetails").last().remove();
  });

  var importPizzaNumber = 0;
  var importToppingNumber = 0;
  var newMainArrays = new MakeArrays();
  var importTopping = new MakeArrays();
  var newPizzaDetails = new MakeArrays();

  $("form#order").submit(function(event){
    event.preventDefault();

    // module to import user details
    var importOrderName = $(this).find("input#orderName").val();
    var importAddress = $(this).find("input#address").val();
    var importNote = $(this).find("input#note").val();
    var newDetails = new Details(importOrderName, importAddress, importNote);
    newMainArrays.compile.push(newDetails);

    // pizza loop
    $(".new-pizzaDetails").each(function(){

      importPizzaNumber++; // increment pizzaNumber at each loop cycle
      var importSize = $(this).find("#size").val();

      // toppings loop inside pizza loop
      $(".checkbox").each(function(){
        importToppingNumber++; // increment toppingNumber at each loop cycle
        if ($("input.checkbox") === true){
          importTopping.compile.push(value);
        }
      }); // end of toppings loop

      // add pizzadetails object to main array
      var newPizzaDetails = new PizzaDetails(importSize, importTopping);
      newMainArrays.compile.push(newPizzaDetails);

    }); // end of pizza loop.
    // MainArrays = [newDetails,newPizzaDetails1,newPizzaDetails2...]=[(name, address, note),(size1,toppings1),(size2,toppings2)...]

    // module to calculate price
    var importBasePrice = 10;
    var importToppingPrice = 2;
    new Pricing(importBasePrice, importToppingPrice, importPizzaNumber, importToppingNumber);
    var total = Pricing.compute();

    // Module to display results from MainArrays "database"
    $(".addName").text(newDetails.orderName);
    $(".addAddress").text(newDetails.address);
    $(".addNotes").text(newDetails.note);
    $(".addTotal").text(total);

    newMainArrays.compile.forEach(function(newMainArray){
      $("#list").append('<li><span class="clickToView">'+ newMainArray.newPizzaDetails.size + " Pizza" + '</span></li>');

      $(".clickToView").last().click(function(){
        importTopping.compile.forEach(function(topping){
          $("#addTopping").append('<li>'+ topping + '</li>');
        }); // end of import toppings loop
        $(".orderInfo").toggle();
      }); // end of click to view
    }); // end of order list

    $(".orderList").show();

    reset();

  }); // End of submit event
}); // End of document ready event
