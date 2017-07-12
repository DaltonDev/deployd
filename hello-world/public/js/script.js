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
      var amounts = $('#amounts').val();
      var perday = $('#perday').val();
      var totalAmounts  = $('#current').val();
      // var reminder = $('#reminder').val();
      //var frequency  = $('#frequency').val();

      dpd.medicine.post({
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

    function addMedicine(medicine) {

            $('<li class="name mdl-list__item mdl-list__item--three-line">')
            .append('<span class="mdl-list__item-primary-content">'+
            '<div class="amount">'+
            '<span class="current-amount">'+medicine.currentAmount+'</span>'+
            '<span class="total-amount">'+"/"+medicine.totalAmount+'</span>'+
            '</div>'+
            '<i class="material-icons mdl-list__item-avatar">'+
            '<i class="material-icons pill-icon">pie_chart</i></i>'+
            '<span id="name">' + medicine.name + '</span>'+
            '<span id="description" class="mdl-list__item-text-body">' + medicine.description + '</span>')
            .append('</span>')
            .append('<span class="mdl-list__item-secondary-content">'+
            '<a class="mdl-list__item-secondary-action" href="#"><i class="material-icons arrow-icon">keyboard_arrow_right</i></a>')
            .append('</span>')
            .append('</li>')
            .appendTo('#medicines');
    }

    function loadMedicines() {
    dpd.medicine.get(function(medicines, error) { //Use dpd.js to access the API
        $('#medicines').empty(); //Empty the list
        medicines.forEach(function(medicine) { //Loop through the result
            addMedicine(medicine); //Add it to the DOM.
        });
    });
}


});