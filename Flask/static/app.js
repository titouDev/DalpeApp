/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

// @require @packageOverrides
Ext.Loader.setConfig({
    enabled: true
});


Ext.application({
    models: [
        'specialite',
        'chantier'
    ],
    stores: [
        'specialites',
        'employes_hours',
        'chantiers_hours',
        'employes_logHours'
    ],
    views: [
        'appViewport',
        'sousTraitantsContextMenu',
        'editChantierWindow',
        'loginWindow'
    ],
    appFolder: 'dalpeApp',
    appProperty: 'dalpeApp',
    controllers: [
        'sousTraitants',
        'employes',
        'clients',
        'chantiers',
        'loginWindow',
        'global',
        'logHours'
    ],
    name: 'dalpeApp',

    launch: function() {
        function confirm_exit(e) {
            if(!e) e = window.event;

            e.cancelBubble = true;
            e.returnValue = 'Etes vous sur de vouloir quitter l\'application?';

            if (e.stopPropagation) {
                e.stopPropagation();
                e.preventDefault();
            }
        }
        window.onbeforeunload=confirm_exit;

        document.oncontextmenu = function(){return false;}; //permet de ne pas ouvrir le context menu de windows

        var allStores = Ext.StoreManager.items;

        for (var i in allStores)
        {
            var currentStore = allStores[i];
            if (currentStore.proxy && currentStore.proxy.sortParam)
            {
                currentStore.proxy.sortParam = undefined;
            }
        }


        var loginController = dalpeApp.getApplication().getController('loginWindow');

        if (loginController.isLogged()) {
            dalpeApp.view.appViewport.create();
            var user = loginController.getUserLogged();
            Ext.ComponentQuery.query('#userLogged')[0].setText('Utilisateur Connecté: ' + user);
            return;
        }

        loginController.isFirstUser()
        .then(function(response){
            if (response === true) {
                if (response === true) {
                    dalpeApp.view.appViewport.create();
                    alert('Vous etes le premier utilisateur a vous connecter,'+
                    'allez dans l\'onglet employes pour creer votre fiche et celle des autres employes');
                }
            }
            else {
                //On affiche la login window
                dalpeApp.view.loginWindow.create();
            }
        });

    },

    createRecord: function(model, data) {
        var me =this;
        var promise = new RSVP.Promise(function(resolve, reject) {
            Ext.Ajax.request({
                url: ('/api/model/'+model),
                method:'POST',
                jsonData: data,
                success: function(response){
                    var jsonData = Ext.JSON.decode(response.responseText);
                    var myModel = me.getModel(model);
                    var record = new myModel(jsonData);
                }
            });
        });

        return promise;
    }

});
