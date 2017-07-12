$(document).ready(function() {

  loadMedicines();


    function addMedicine(medicine) {

            $('<li class="name mdl-list__item mdl-list__item--three-line">')
            .append('<span class="mdl-list__item-primary-content">'+
            '<i class="material-icons mdl-list__item-avatar">'+
            '<i class="material-icons pill-icon">pie_chart</i></i>'+
            '<span id="name">Posted by: ' + medicine.name + '</span>'+
            '<span id="description" class="mdl-list__item-text-body">' + medicine.description + '</span>')
            .append('</span>')
            .append('<span class="mdl-list__item-secondary-content">'+
            '<a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">star</i></a>')
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
