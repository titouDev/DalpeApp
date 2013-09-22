/*
 * File: app/controller/employes.js
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

Ext.define('dalpeApp.controller.employes', {
    extend: 'Ext.app.Controller',

    models: [
        'employe'
    ],
    stores: [
        'employes'
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

    onEmployesGridItemDblClick: function(dataview, record, item, index, e, eOpts) {

        //On affiche la fenetre d'edit
        var editEmployeWindow = Ext.widget('editEmployeWindow');

        //On load le soustraitant selecitonne dans le form
        var myForm = editEmployeWindow.down('form');

        //On prend le record selectionne
        var selectedRecord = this.getEmployesGrid().selModel.getSelection()[0];
        //On retourne chercher le data dans la db, au cas ou un autre user ait modifie la fiche
        Employes.get(selectedRecord.data, function(recordFromDb){
            var myData = recordFromDb[0];
            var myEmploye = this.getEmployeModel().create(myData);
            myForm.getForm().loadRecord(myEmploye);
            myForm.down('#photo').setSrc(myEmploye.data.photo);
        }, this);

        editEmployeWindow.show();

    },

    onEmployesGridSelect: function(rowmodel, record, index, eOpts) {
        var hours_store = Ext.getStore('employes_hours');
        hours_store.proxy.extraParams ={employeId:record.data.id};
        hours_store.load();
    },

    onEmployesPanelActivate: function(component, eOpts) {
        this.getEmployesStore().load();

    },

    init: function(application) {
        this.control({
            "#employesGrid #addEmploye": {
                click: this.onAddEmployeClick
            },
            "#employesGrid": {
                itemdblclick: this.onEmployesGridItemDblClick,
                select: this.onEmployesGridSelect
            },
            "#employesPanel": {
                activate: this.onEmployesPanelActivate
            }
        });
    }

});
