/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
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

//@require @packageOverrides
Ext.Loader.setConfig({
    disableCaching: false,
    enabled: true
});

Ext.application({
    models: [
        'specialite',
        'employeHour',
        'chantierStatus',
        'document',
        'document_type',
        'chantier_link_documents'
    ],
    stores: [
        'specialites',
        'specialiteLinkSousTraitant',
        'employes_hours',
        'chantiers_hours',
        'documents',
        'document_type',
        'employes_logHours',
        'chantiers_documents',
        'mails_notsent',
        'sousTraitants_full',
        'MyJsonStore'
    ],
    views: [
        'appViewport',
        'sousTraitantsContextMenu',
        'editChantierWindow',
        'mailWindow',
        'loginWindow'
    ],
    autoCreateViewport: true,
    controllers: [
        'sousTraitants',
        'employes',
        'clients',
        'chantiers',
        'mailWindowController',
        'loginWindow',
        'global',
        'logHours',
        'editSousTraitantController',
        'editEmploye'
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



        setInterval(function(){
            if(!Ext.getCmp("loginWindow")){
                Employes.checkLoginSession(function(response){
                    if (!response) {
                        Ext.widget("loginWindow");
                    }
                })
            }
        }, 3700000);

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





    },

    applyStateProviderInfos: function(userId) {
        Ext.state.Manager.setProvider(
        Ext.create('MyApp.util.JsonPStorageProvider', {
            userId: userId,
            url: 'php/classes/state_db_save.php'
        })
        );

    },

    init: function() {
        Ext.define('MyApp.util.JsonPStorageProvider', {
            /* Begin Definitions */

            extend : 'Ext.state.Provider',
            alias : 'state.jsonpstorage',

            config: {
                userId : null,
                url: "http://www.senchatraining.com/ftextjs4/webservices/stateprovider.cfc",
                timeout: 30000
            },

            constructor : function(config) {
                this.initConfig(config);
                var me = this;

                me.restoreState();
                me.callParent(arguments);
            },
            set : function(name, value) {
                var me = this;

                if( typeof value == "undefined" || value === null) {
                    me.clear(name);
                    return;
                }
                me.persist(name, value);
                me.callParent(arguments);
            },
            // private
            restoreState : function() {
                var me = this;
                Ext.data.JsonP.request({
                    url : this.getUrl(),
                    method : "GET",
                    params : {
                        userId : this.getUserId(),
                        method : 'get'
                    },
                    disableCaching : true,
                    success : function(results) {
                        for(var i in results) {
                            var currentComponent = Ext.ComponentQuery.query('[stateId="'+results[i].name+'"]')[0];
                            if (currentComponent === undefined) continue;
                            currentComponent.applyState(this.decodeValue(results[i].value));
                        }
                    },
                    failure : function() {
                        //console.log('failed', arguments);
                    },
                    scope : this
                });
            },
            // private
            clear : function(name) {
                this.clearKey(name);
                this.callParent(arguments);
            },
            // private
            persist : function(name, value) {
                var me = this;
                Ext.data.JsonP.request({
                    url : this.getUrl(),
                    params : {
                        userId : this.getUserId(),
                        method : 'save',
                        name : name,
                        value : me.encodeValue(value)
                    },
                    disableCaching : true,
                    success : function() {
                        //console.log('success');
                    },
                    failure : function() {
                        //console.log('failed', arguments);
                    }
                });
            },
            // private
            clearKey : function(name) {
                Ext.data.JsonP.request({
                    url : this.getUrl(),
                    params : {
                        userId : this.getUserId(),
                        method : 'clear',
                        name : name
                    },
                    disableCaching : true,
                    success : function() {
                        //console.log('success');
                    },
                    failure : function() {
                        //console.log('failed', arguments);
                    }
                });
            }
        });

    }

});
