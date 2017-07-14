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
            '<span class="current-amount">'+medicine.amountPerDay+'</span>'+
            '<span class="total-amount">'+"/"+medicine.totalAmount+'</span>'+
            '</div>'+
            '<i class="material-icons mdl-list__item-avatar">'+
            '<i class="material-icons pill-icon">pie_chart</i></i>'+
            '<span id="name">' + medicine.name + '</span>'+
            '<span id="description-short" class="mdl-list__item-text-body">' + medicine.description + '</span>')
            .append('</span>')
            .append('<span class="mdl-list__item-secondary-content">'+
            '<a class="mdl-list__item-secondary-action" onclick="loadMoreInfo()"><i class="material-icons arrow-icon">keyboard_arrow_right</i></a>')
            .append('</span>')
            .append('</li>')
            .appendTo('#medicines');
            //console.log(medicine.id);

            // var test = medicine.id;
            //   loadMoreInfo(test);
    }

    function loadMedicines() {
    dpd.medicine.get(function(medicines, error) { //Use dpd.js to access the API
        $('#medicines').empty(); //Empty the list
        medicines.forEach(function(medicine) { //Loop through the result
            addMedicine(medicine); //Add it to the DOM.
        });
    });
}



<!-- -->
});

//
// function loadMoreInfo(test){
//   console.log(test);
// }

var xhr = new XMLHttpRequest();
var cObj;

function loadMoreInfo(){
  var path="http://localhost:2403/medicine/";

  xhr.open('GET', path, true);
  xhr.responseType = 'text';
  xhr.send();
}
xhr.onload = function() {
    if (xhr.status === 200){
        cObj = JSON.parse(xhr.responseText);
        console.log(cObj);

        document.getElementById('medicine').innerHTML = cObj.Object.name;
    } //end if
};
