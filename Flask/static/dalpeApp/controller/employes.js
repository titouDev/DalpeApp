/*
 * File: dalpeApp/controller/employes.js
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

Ext.define('dalpeApp.controller.employes', {
    extend: 'Ext.app.Controller',

    models: [
        'employe'
    ],
    stores: [
        'employes',
        'clients'
    ],
    views: [
        'editEmployeWindow'
    ],

    refs: [
        {
            ref: 'employesGrid',
            selector: '#employesGrid'
        }
    ],

    onAddEmployeClick: function(button, e, eOpts) {
        Ext.widget('editEmployeWindow').show();
    },

    onEmployesGridSelect: function(dataview, record, item, index, e, eOpts) {
        var hours_store = Ext.getStore('employes_hours');
        hours_store.load({params:{employeId:record.data.id}});
    },

    onEmployesPanelActivate: function(component, eOpts) {
        this.getEmployesStore().load();

    },

    onEditEmployeClick: function(button, e, eOpts) {
        //On prend le record selectionne
        var selectedRecord = this.getEmployesGrid().selModel.getSelection()[0];
        if (!selectedRecord) {
            Ext.Msg.alert('Attention','Vous devez selectionner un employe...').setWidth(200);
            return;
        }

        //On affiche la fenetre d'edit
        var editEmployeWindow = Ext.widget('editEmployeWindow');

        //On load le soustraitant selecitonne dans le form
        var myForm = editEmployeWindow.down('form');

        //On retourne chercher le data dans la db, au cas ou un autre user ait modifie la fiche
        var employeModel = this.getEmployeModel();
        employeModel.load(selectedRecord.get('id'),{
            scope:this,
            callback:function(employe){
                myForm.getForm().loadRecord(employe);
            }
        });

        editEmployeWindow.show();

    },

    onAnnulerClick: function(button, e, eOpts) {
        button.up('window').close();
    },

    onEnregistrerClick: function(button, e, eOpts) {
        //On va chercher les infos du form
        var myForm = Ext.getCmp('editEmployeWindow').down('form').getForm();
        if (! myForm.isValid()) {
            return;
        }

        var record = myForm.getRecord();
        if (!record) {
            var employeModel = this.getEmployeModel();
            record = new employeModel();
        }
        record.set(myForm.getValues());
        if (!record.get('id')) {
            //POST
            record.getProxy().appendId=false; //bug fix pour eviter d'appender un slah a la fin de l'url
        }

        record.save({
            scope:this,
            callback:function(){
                button.up('window').close();
                this.getEmployesGrid().store.load();
            }
        });
        record.getProxy().appendId=true;



    },

    init: function(application) {
        this.control({
            "#employesGrid #addEmploye": {
                click: this.onAddEmployeClick
            },
            "#employesGrid": {
                itemclick: this.onEmployesGridSelect
            },
            "#employesPanel": {
                activate: this.onEmployesPanelActivate
            },
            "#editEmploye": {
                click: this.onEditEmployeClick
            },
            "editEmployeWindow #annuler": {
                click: this.onAnnulerClick
            },
            "editEmployeWindow #enregistrer": {
                click: this.onEnregistrerClick
            }
        });
    }

});
