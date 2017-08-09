function showError(error) {
        var message = "An error occurred";
        if (error.message) {
                message = error.message;
        } else if (error.errors) {
                var errors = error.errors;
                message = "";
                Object.keys(errors).forEach(function(k) {
                        message += k + ": " + errors[k] + "\n";
                });
        }

        alert(message);
}



$(document).ready(function() {

  $('#medicine-form').submit(function() {
      //Get the data from the form
      var named = $('#named').val();
      var descriptions  = $('#descriptions').val();
      var amounts = parseInt($('#amounts').val());
      var perday = parseInt($('#perday').val());
      //Placeholder until update function works
      var totalAmounts  = amounts;
      // var reminder = $('#reminder').val();
      //var frequency  = $('#frequency').val();
      dpd.medicines.post({
          "name": named,
          "description": descriptions,
          "totalAmount": totalAmounts,
          "amount": amounts,
          //"frequency": frequency,
          // "reminder": reminder,
          "amountPerDay": perday
        }, function(medicines, error) {
                if (error) return showError(error);
      //Clear the form elements
      addMedicines(medicines);
      $('#named').val('');
      $('#descriptions').val('');
      $('#amounts').val('');
    //  $('#frequency').val('');
    //  $('#current').val('');
      // $('#reminder').val('');
      $('#perday').val('');
      });

      return false;
  });

  loadMedicines();

    function addMedicines(medicines) {
            $('<li class="name mdl-list__item mdl-list__item--three-line">')
            .append('<span class="mdl-list__item-primary-content">'+
            '<div class="amount">'+
            '<span class="current-amount">'+medicines.amountPerDay+'</span>'+
            '<span class="total-amount">'+"/"+medicines.totalAmount+'</span>'+
            '</div>'+
            '<i class="material-icons mdl-list__item-avatar">'+
            '<i class="material-icons pill-icon">pie_chart</i></i>'+
            '<span id="name">' + medicines.name + '</span>'+
            '<span id="description-short" class="mdl-list__item-text-body">' + medicines.description + '</span>')
            .append('</span>')
            .append('<span class="mdl-list__item-secondary-content">'+
            '<a class="mdl-list__item-secondary-action active" id="'+medicines.id+'" onclick="loadMoreInfo(this.id)" href="medicines/'+medicines.id+'"  target="iframen"><i class="material-icons arrow-icon">keyboard_arrow_right</i></a>')
            .append('</span>')
            .append('</li>')
            .appendTo('#medicines');
            //console.log(medicine.id);
    }

    function loadMedicines() {
    dpd.medicines.get(function(medicines, error) { //Use dpd.js to access the API
        $('#medicines').empty(); //Empty the list
        medicines.forEach(function(name) { //Loop through the result
            addMedicines(name); //Add it to the DOM.
        });
    });
}

//onclick="loadMoreInfo()"
<!-- -->

});

function reset(result){
  $( "#medicineinfo" ).toggleClass( "slide_in");
  $( "#medicines" ).toggleClass( "slide_out");
}

function loadMoreInfo(result){
    $('#medicineinfo').empty();
$( "#medicineinfo" ).toggleClass( "slide_in");
$( "#medicines" ).toggleClass( "slide_out");

  var xhr = new XMLHttpRequest();
  xhr.open('GET', "/../medicines/"+result, true);
  xhr.send();

  xhr.onreadystatechange = processRequest;


 function processRequest(e) {
   if (xhr.readyState == 4 && xhr.status == 200) {
     var response = JSON.parse(xhr.responseText);
      console.log(response.name);
      console.log(response.id);

      $('<div class="demo-card-square mdl-card mdl-shadow--2dp">')
      .append('<div class="mdl-card__title mdl-card--expand">'+
      '<div class="header_text">'+
      '<h2 class="mdl-card__title-text">' + response.name + '</h2>'+
      '</div>'+
      '</div>'+

      '<div class="mdl-card__supporting-text">' + response.description + '</div>')
      .append('<div class="mdl-card__actions mdl-card--border">'+
      '<table class="responsive mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">'+
      '<thead>'+
      '<tr>'+
      '<th class="mdl-data-table__cell--non-numeric">Per day</th>'+
      '<th>Total</th>'+
      '<th>Amount left</th>'+
      '</tr>'+
      '</thead>'+
      '<tbody>'+
      '<tr>'+
      '<td class="mdl-data-table__cell--non-numeric">'+ response.amountPerDay + '</td>'+
      '<td class="mdl-data-table__cell--non-numeric">'+ response.totalAmount + '</td>'+
      '<td class="mdl-data-table__cell--non-numeric">'+ response.amount + '</td>'+
      '</tr>'+
      '</tbody>'+
      '</table>')
      .append('</div>')
      .append('<div class="mdl-card__actions mdl-card--border">'+
      '<a class="mdl-list__item-secondary-action active" onclick="reset()" ><i class="material-icons arrow-icon-back">keyboard_arrow_left</i></a>'+
      '<button class="delete mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent show-modal" >Delete</button>'+
      '<dialog class="mdl-dialog">'+
      '<div class="mdl-dialog__content">'+
      '<p>Are you sure you want to delete "'+response.name+'"?</p>'+
      '</div>'+
      '<div class="mdl-dialog__actions mdl-dialog__actions--full-width">'+
      '<button type="button" class="mdl-button" id="'+response.id+'" onclick="deleteMedicine(this.id)">Yes</button>'+
      '<button type="button" class="mdl-button close">Cancel</button>'+
      '</div>'+
      '</dialog>'+
      '<script>'+
      'var dialog = document.querySelector("dialog");'+
      'var showModalButton = document.querySelector(".show-modal");'+
       'if (! dialog.showModal) {'+
         'dialogPolyfill.registerDialog(dialog);}'+
       'showModalButton.addEventListener("click", function() {'+
         'dialog.showModal();'+
       '});'+
       'dialog.querySelector(".close").addEventListener("click", function() {'+
         'dialog.close();'+
       '});'+
      '</script>'+
      '<button id="updater" class="update mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" onclick="myMove()">Update</button>'+
      '<div class="medicine-update-form-wrapper">'+
      '<form id="medicine-update-form">'+
      '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded" data-upgraded=",MaterialTextfield">Name'+
      '<input class="mdl-textfield__input" type="text" id="named" Placeholder="'+response.name+'">'+
      '<label class="mdl-textfield__label" for="named"></label>'+
      '</div>'+
      '<div class="mdl-textfield mdl-js-textfield">Description'+
      '<textarea class="mdl-textfield__input" type="text" rows= "3" id="descriptions" >'+response.description+'</textarea>'+
      '<label class="mdl-textfield__label" for="descriptions"></label>'+
      '</div>'+
      '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">Amount'+
      '<input class="mdl-textfield__input" type="number" pattern="-?[0-9]*(\.[0-9]+)?" id="amounts" Placeholder="'+response.amount+'">'+
      '<label class="mdl-textfield__label" for="amounts"></label>'+
      '<span class="mdl-textfield__error">Input is not a number!</span>'+
      '</div>'+
      '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">Amount per day'+
      '<input class="mdl-textfield__input" type="number" pattern="-?[0-9]*(\.[0-9]+)?" id="perday" Placeholder="'+response.amountPerDay+'">'+
      '<label class="mdl-textfield__label" for="perday"></label>'+
      '<span class="mdl-textfield__error">Input is not a number!</span>'+
      '</div>'+
      '<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" type="submit" id="'+response.id+'" onclick="updateMedicine(this.id)">Submit</button>'+
      '</form>'+
      '</div>'
    )
        .append('</div>')
  .append('</div>')
      .appendTo('#medicineinfo');

   }
}
}

function myMove() {
      $("#medicine-update-form").fadeToggle();
}

function deleteMedicine(result){
  dpd.medicines.del(result, function (err) {
    location.reload();
  if(err) console.log(err);
});

}

function updateMedicine(result){
  var named = $('#named').val();
  var descriptions  = $('#descriptions').val();
  var amounts = parseInt($('#amounts').val());
  var perday = parseInt($('#perday').val());
  //Placeholder until update function works
  var totalAmounts  = amounts;
  dpd.medicines.put(result, {"name": named,"description":descriptions,"amount":amounts,"amountPerDay":perday,"totalAmount":amounts}, function(result, err) {
  if(err) return console.log(err);
  console.log(result, result.id);
});
}

// function loadMoreInfo(test){
//   dpd.medicines.get(test, function (result) {
//  console.log(result);
// });
//  }
