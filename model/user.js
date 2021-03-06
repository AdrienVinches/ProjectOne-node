if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}

//class name : USER Model
(function (define) {
    define([
        "sequelize",
        "./message",
        "./event",
        "password-hash"
    ], function (Sequelize, message,event, hash) {


        if (!global.sequelize) {
            var sequelize = global.sequelize = new Sequelize("projectone", "root", "root");
        } else {
            var sequelize = global.sequelize;
        }


        var user = sequelize.define('User', {
            Name:{ type:Sequelize.STRING},
            Surname:{ type:Sequelize.STRING},
            Email:{type:Sequelize.STRING,unique: true, validate:{ isEmail:{msg:"L'adresse mail n'est pas conforme"}, notNull:{msg:"L'adresse mail ne peut pas etre vide"}}},
            Password:{type:Sequelize.STRING, validate:{len:{args:6, msg:"le mot de passe doit faire au moins 6 charactere"}, notNull:{msg:"Le mot de passe ne peut pas etre vide"}}},
            Birthday:{type:Sequelize.DATE},
            Img:{type:Sequelize.STRING}
        }, {
            instanceMethods:{
                hashthispassword:function () {
                    this.Password = hash.generate(this.Password);
                },
                getCreated:function(next){
                    sequelize.query('SELECT * FROM projectone.Events where Creator_id='+this.id, null, { raw: true }).success(function(data){
                        next(data);
                    })
                }
            },
            classMethods:{
                verify:function (password,hashedPassword) {
                  return hash.verify(password, hashedPassword)
                }
            }
        });


        return user;
    });

})(typeof define != "undefined" ? define : function () {
    var result = arguments[arguments.length - 1]();
    if ("undefined" != typeof(result)) {
        module.exports = result;
    }
});