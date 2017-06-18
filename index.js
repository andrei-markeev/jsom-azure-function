var csomapi = require('csom-node');

module.exports = function(azureContext, req) {

    if (req.query.validationtoken) {
        azureContext.log('Validation token received: ' + req.query.validationtoken);
        azureContext.res = {
            body: req.query.validationtoken,
            isRaw: true
        };
        azureContext.done();
        return;
    }

    var settings = {
        url: "https://contoso.sharepoint.com/",
        appClientId: "APP-CLIENT-ID-GOES-HERE",
        appClientSecret: "APP-CLIENT-SECRET-GOES-HERE"
    };

    csomapi.setLoaderOptions({url: settings.url});  //set CSOM library settings

    var authCtx = new AuthenticationContext(settings.url);
    authCtx.acquireTokenForApp(settings.appClientId, settings.appClientSecret, function (err, data) {
        
        var ctx = new SP.ClientContext("/");  //set root web
        authCtx.setAuthenticationCookie(ctx);  //authenticate
        
        //retrieve SP.Web client object
        var web = ctx.get_web();
        ctx.load(web);
        ctx.executeQueryAsync(function () {
            azureContext.log(web.get_title());
            azureContext.res = { body: "Success!" };
            azureContext.done();
        },
        function (sender, args) {
            azureContext.log('An error occured: ' + args.get_message());
            azureContext.res = { status: 500, body: "Error!" };
            azureContext.done();
        });
        
    });

};
