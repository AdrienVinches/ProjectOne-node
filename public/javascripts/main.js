require.config({
    baseUrl: "javascripts",
    paths: {
        "bootstrap": "extern/bootstrap.min",
        async:'extern/async'
    }
});

require(["routes",'extern/jquery.min','extern/jquery-ui','extern/backbone'], function(routes) {
   routes.init();
});
