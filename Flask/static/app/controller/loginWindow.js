/*
 * File: app/controller/loginWindow.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('dalpeApp.controller.loginWindow', {
    extend: 'Ext.app.Controller',

    control: {
        "#loginWindow #login": {
            click: 'onLoginClick'
        },
        "#appViewport #logout": {
            click: 'onLogoutButtonClick'
        },
        "#loginWindow #password": {
            specialkey: 'onPasswordSpecialkey'
        }
    },

    onLoginClick: function(button, e, eOpts) {
        var myForm = button.up('window').down('form').getForm();
        this.sendLoginForm(myForm);
    },

    onLogoutButtonClick: function(button, e, eOpts) {
        this.logOut();
        window.onbeforeunload=undefined;
        window.location.reload();
    },

    onPasswordSpecialkey: function(field, e, eOpts) {
        if (e.button === 12) {
            //ENTER KEY
            var myForm = Ext.ComponentQuery.query('#loginWindow  form')[0].getForm();
            this.sendLoginForm(myForm);
        }
    },

    verifyInfos: function(response) {
        if (response.length) {
            var user_logged = response[0].id;
            //L'authentification a fonctionne, on peut rentrer dans l'application
            dalpeApp.app.applyStateProviderInfos(user_logged);
            Ext.getCmp('loginWindow').close();
            var myAppToolbar = Ext.getCmp('appToolbar');
            myAppToolbar.down('#userLogged').setText('Utilisateur connecté: ' + response[0].prenom + " " + response[0].nom);
        }
        else {
            Ext.Msg.alert('Attention', 'Nom d\'utilisateur ou mot de passe incorrects.');
        }
    },

    sendLoginForm: function(myForm) {
        if (!myForm.isValid()) {
            return;
        }
        var me = this;
        //On verifie l'identification dans la base de donnees...
        myForm.submit({
            success:function(form, action){
                me.credentialsApproved(action.result.user.login);
                window.onbeforeunload=undefined;
                window.location.reload();
            },
            failure:function(){

                Ext.Msg.show({
                    title:'Erreur',
                    msg: "Nom d'utilisateur ou mot de passe incorrects.",
                    buttons: Ext.Msg.YES,
                    buttonText:{yes:'OK'},
                    icon: Ext.Msg.ERROR
                });
            }
        });

    },

    getUserLogged: function() {
        return Ext.util.Cookies.get('dalpeApp.userLogged');
    },

    isLogged: function() {
        return Ext.util.Cookies.get('dalpeApp.userLogged') ? true : false;
    },

    isFirstUser: function() {
        return this.getController('logHours').loadEmployes()
        .then(function(employes){
            return RSVP.resolve(employes.length === 0 ? true : false);
        });
    },

    credentialsApproved: function(userName) {
        Ext.util.Cookies.set('dalpeApp.userLogged', userName);
    },

    logOut: function() {
        Ext.util.Cookies.clear('dalpeApp.userLogged')
    }

});
