define([
    "../model/user",
    "../model/event",
    "extern/bootstrap-datepicker",
    "extern/bootstrap.min"
], function (Muser,Mevent) {

    function datepicker() {
        $('#start').datepicker();
        var today = new Date();
        var t = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear().toString().substr(2, 4);
        $('#start').val(t);
    }

    var app = {
        init:function () {
            datepicker();
            var model = Muser.init('inscription');

            $('#inscription').live('submit', function (event) {
                Muser.create(model);
                event.preventDefault();
            });
            require(["helpers/googlemaps"], function (maps) {
                maps.init();
                maps.autocomplete();
                $('#searchEvent').live('submit', function (event) {
                    event.preventDefault();
                    maps.searchLocations(function (res) {
                        //todo le 30 correspond a la distance, faut le rendre dynamique
                        Mevent.getEvent(res[0].geometry.location.lat(), res[0].geometry.location.lng(),30,function(events){
                            events.forEach(function(item){
                                maps.addMarker(item.lat,item.lng)
                            })
                        });
                    });

                });
            });

        }
    }
    return app;
});