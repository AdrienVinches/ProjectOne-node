require.config({
    baseUrl: "javascripts",
    paths: {
        "bootstrap": "extern/bootstrap.min",
        async:'extern/async'
    }
});

require(['extern/jquery.min','extern/jquery-ui','extern/backbone'], function() {
   require(["routes"],function(routes){
       routes.init();
   })
});
