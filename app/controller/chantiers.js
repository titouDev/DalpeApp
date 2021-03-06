/*
 * File: app/controller/chantiers.js
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

Ext.define('dalpeApp.controller.chantiers', {
    extend: 'Ext.app.Controller',

    models: [
        'chantier'
    ],
    stores: [
        'chantiers',
        'clients',
        'chantiers_hours'
    ],

    refs: [
        {
            ref: 'chantiersGrid',
            selector: '#chantiersGrid'
        }
    ],

    onAddClick: function(button, e, eOpts) {
        Ext.widget('editChantierWindow').show();
    },

    onAnnulerClick: function(button, e, eOpts) {
        button.up('window').close();
    },

    onChantiersGridSelect: function(rowmodel, record, index, eOpts) {
        this.refreshHoursGrid();

    },

    onEnregistrerClick: function(button, e, eOpts) {
        //On va chercher les infos du form
        var myForm = Ext.getCmp('editChantierWindow').down('form').getForm();
        if (! myForm.isValid()) {
            return;
        }

        var chantierData = myForm.getValues();
        if (chantierData.id) {
            //On update la DB et on ferme la window
            Chantiers.update(chantierData, function(){
                //On peut maintenant fermer la window
                button.up('window').close();
                this.getChantiersGrid().store.load();
            },this);
        }
        else {
            //On cree le nouvel employe
            //On update la DB et on ferme la window
            Chantiers.create(chantierData, function(newRecord){
                //On peut maintenant fermer la window
                button.up('window').close();
                //On rajoute le nouvel employe dans le store
                this.getChantiersGrid().store.load();
            },this);
        }
    },

    onFileUpdalodChange: function(filefield, value, eOpts) {
        var selectedRecord = this.getChantiersGrid().selModel.getSelection();
        if (selectedRecord.length != 1) {
            Ext.Msg.alert('Attention','Vous devez d\'abord choisir un chantier');
        }
        var chantierId = selectedRecord[0].data.id;

        var form = button.up('#fileForm').getForm();
        if(form.isValid()){
            form.submit({
                url: 'document-upload.php',
                scope:this,
                params: {
                    sousTraitantId: sousTraitantId,
                    documentTypeId:form.getValues().documentTypeId,
                    documentNote:form.getValues().documentNote
                },
                waitMsg: 'Sauvegarde du document...',
                success: function(fp, o) {
                    //On reload le sotre de documents
                    var documentsStore = Ext.getStore('documents');
                    documentsStore.load();
                    //Ext.Msg.alert('Succès', 'Le document "' + o.result.file + '" est enregistré.');
                }
            });
        }

    },

    onChantiersPanelActivate: function(component, eOpts) {
        this.getChantiersStore().load();
        this.getClientsStore().load();
        this.refreshHoursGrid();

    },

    onEditChantierClick: function(button, e, eOpts) {
        //On prend le record selectionne
        var selectedRecord = this.getChantiersGrid().selModel.getSelection()[0];
        if (!selectedRecord) {
            Ext.Msg.alert('Attention','Vous devez selectionner un chantier...').setWidth(200);
            return;
        }

        //On affiche la fenetre d'edit
        var editChantierWindow = Ext.widget('editChantierWindow');

        //On load le soustraitant selecitonne dans le form
        var myForm = editChantierWindow.down('form');

        //On retourne chercher le data dans la db, au cas ou un autre user ait modifie la fiche
        Chantiers.get(selectedRecord.data, function(recordFromDb){
            var myData = recordFromDb[0];
            var myChantier = this.getChantierModel().create(myData);
            myForm.getForm().loadRecord(myChantier);
        }, this);

        editChantierWindow.show();

    },

    refreshHoursGrid: function() {
        //On verifie qu'un record de chantier est selectionne
        var chantierGrid = this.getChantiersGrid();
        var selection = chantierGrid.getSelectionModel().getSelection();
        if (selection.length == 1) {
            var hours_store = this.getChantiers_hoursStore();
            hours_store.load({
                params:{chantierId:selection[0].data.id}
            });
        }

    },

    init: function(application) {
        this.control({
            "#chantiersGrid #addChantier": {
                click: this.onAddClick
            },
            "#editChantierWindow #annuler": {
                click: this.onAnnulerClick
            },
            "#chantiersGrid": {
                select: this.onChantiersGridSelect
            },
            "#editChantierWindow #enregistrer": {
                click: this.onEnregistrerClick
            },
            "#chantiersPanel #documentsGrid #fileUpdalod": {
                change: this.onFileUpdalodChange
            },
            "#chantiersPanel": {
                activate: this.onChantiersPanelActivate
            },
            "#editChantier": {
                click: this.onEditChantierClick
            }
        });
    }

});
