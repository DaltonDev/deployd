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
        }, function(medicine, error) {
                if (error) return showError(error);
      //Clear the form elements
      addMedicine(medicine);
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
            '<a class="mdl-list__item-secondary-action" id="'+medicines.id+'" onclick="loadMoreInfo(this.id)" href="medicines/'+medicines.id+'"  target="iframen"><i class="material-icons arrow-icon">keyboard_arrow_right</i></a>')
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

function loadMoreInfo2(result){
  console.log(result);
}

function loadMoreInfo(result){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', "/../medicines/"+result, true);
  xhr.send();

  xhr.onreadystatechange = processRequest;


 function processRequest(e) {
   if (xhr.readyState == 4 && xhr.status == 200) {
     var response = JSON.parse(xhr.responseText);
      console.log(response.name);
      console.log(response.id);
      $('<li class="name mdl-list__item mdl-list__item--three-line">')
      .append('<span class="mdl-list__item-primary-content">'+
      '<div class="amount hidden">'+
      '<span class="current-amount">'+response.amountPerDay+'</span>'+
      '<span class="total-amount">'+"/"+response.totalAmount+'</span>'+
      '</div>'+
      '<i class="material-icons mdl-list__item-avatar">'+
      '<i class="material-icons pill-icon">pie_chart</i></i>'+
      '<span id="name">' + response.name + '</span>'+
      '<span id="description-short" class="mdl-list__item-text-body">' + response.description + '</span>')
      .append('</span>')
      .append('</li>')
      .appendTo('#medicineinfo');
   }
}
}




// function loadMoreInfo(test){
//   dpd.medicines.get(test, function (result) {
//  console.log(result);
// });
//  }
