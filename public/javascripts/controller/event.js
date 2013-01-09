define([
    "../model/event",
    'extern/jquery-ui'

], function (Mevent) {

    function dateTimePicker() {
        require(["extern/jquery-ui-timepicker-addon"],function(){
            var startDateTextBox = $('#startDate');
            var endDateTextBox = $('#endDate');

            startDateTextBox.datetimepicker({
                onClose: function(dateText, inst) {
                    if (endDateTextBox.val() != '') {
                        var testStartDate = startDateTextBox.datetimepicker('getDate');
                        var testEndDate = endDateTextBox.datetimepicker('getDate');
                        if (testStartDate > testEndDate)
                            endDateTextBox.datetimepicker('setDate', testStartDate);
                    }
                    else {
                        endDateTextBox.val(dateText);
                    }
                },
                onSelect: function (selectedDateTime){
                    endDateTextBox.datetimepicker('option', 'minDate', startDateTextBox.datetimepicker('getDate') );
                }
            });
            endDateTextBox.datetimepicker({
                onClose: function(dateText, inst) {
                    if (startDateTextBox.val() != '') {
                        var testStartDate = startDateTextBox.datetimepicker('getDate');
                        var testEndDate = endDateTextBox.datetimepicker('getDate');
                        if (testStartDate > testEndDate)
                            startDateTextBox.datetimepicker('setDate', testEndDate);
                    }
                    else {
                        startDateTextBox.val(dateText);
                    }
                },
                onSelect: function (selectedDateTime){
                    startDateTextBox.datetimepicker('option', 'maxDate', endDateTextBox.datetimepicker('getDate') );
                }
            });
        });
    }

    var app = {
        init:function () {
            dateTimePicker();
            var model = Mevent.init('event');
            $('#event').live('submit',function(event){
                event.preventDefault();
                debugger
                Mevent.create(model);
            });
            require(["helpers/googlemaps"],function(maps){
                maps.autocomplete();
                maps.init();
            });
        }
    }
    return app;

});