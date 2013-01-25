define([
    "../model/event",
    "../model/user",
    "../extern/date"
], function (Mevent,Muser) {

    var app = {

        init:function (id) {
            var model = Mevent.init('eventDescription');
            Mevent.getEventById(id,function(event){
                var dateFormat = new Date(event.Date);
                var dateEndFormat = new Date(event.Date);
                event.Date = dateFormat.toLocaleFormat();
                event.DateEnd = dateEndFormat.toLocaleFormat();
                model.model().set(event);

            });
            var user = Muser.init('testIsLogged');

            $('#joinEvent').live('submit',function(event){

                debugger
            });

        }
    }
    return app;
});