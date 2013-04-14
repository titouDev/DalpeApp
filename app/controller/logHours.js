/*
 * File: app/controller/logHours.js
 *
 * This file was generated by Sencha Architect version 2.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('dalpeApp.controller.logHours', {
    extend: 'Ext.app.Controller',

    stores: [
        'chantiers',
        'employes'
    ],
    views: [
        'editEmployeHour'
    ],

    refs: [
        {
            ref: 'logHoursGrid',
            selector: '#logHoursGrid'
        }
    ],

    onAddHourClick: function(button, e, eOpts) {
        Ext.widget('editEmployeHour');
    },

    onSaveClick: function(button, e, eOpts) {
        var myForm = button.up('window').down('form').getForm();

        if (!myForm.isValid())
        {
            return
        }



        var record = myForm.getValues();
        this.saveRecord(record);

        //On peut maintenant fermer la window
        button.up('window').close();

    },

    onCancelClick: function(button, e, eOpts) {
        button.up('window').close();
    },

    onTabActivate: function(tab, eOpts) {
        //On reload le store pour afficher les heures loggues...

        this.loadHoursStore();
        this.getEmployesStore().load();
        this.getChantiersStore().load();
    },

    onDeleteHourClick: function(button, e, eOpts) {
        //On va chercher le record selectionne
        var myGrid = this.getLogHoursGrid();

        var selectedRecords = myGrid.selModel.getSelection();
        if (selectedRecords.length === 0)
        {
            Ext.Msg.alert('Attention','Aucune entrée n\'est selectionnée');
            return;
        }



        Ext.Msg.confirm('Attention','Voulez vous vraiment effacer l\'entré selectionné ? ', function(button)
        {
            if (button === 'yes')
            {
                var record = selectedRecords[0].data;
                this.deleteRecord(record);

            }
        },this);
    },

    onLogHoursGridItemDblClick: function(dataview, record, item, index, e, eOpts) {
        if (this.isLogChecked(record.data))
        {
            return
        }
        this.editRecord(record);
    },

    deleteRecord: function(record) {
        if (!this.isLogChecked(record))
        {
            Employes.delete_hour(record, this.loadHoursStore,this);
        }
    },

    loadHoursStore: function() {
        var employes_logHours_store = Ext.getStore('employes_logHours');



        employes_logHours_store.proxy.extraParams ={employeId:user_logged};
        employes_logHours_store.load();
    },

    saveRecord: function(record) {

        if (record.id)
        {
            //On update la DB et on ferme la window
            Employes.update_hour(record, function(){
                this.loadHoursStore();
            },this);
        }
        else
        {
            //On cree le nouveau log hour 
            console.log(record);
            Employes.log_hour(record, function(newRecord){
                //On rajoute le nouvel employe dans le store
                this.loadHoursStore();
            },this);

        }
    },

    editRecord: function(record) {
        var myWindow = Ext.widget('editEmployeHour');
        //On disable le combo employe
        myWindow.down('#employe').setDisabled(true);

        var myForm = myWindow.down('form').getForm();

        myForm.loadRecord(record);

    },

    isLogChecked: function(record) {
        if (record.checked === 1)
        {
            Ext.Msg.alert('Attention','Impossible d\'effacer cette entrée. Merci de contacter la comptabilité.');
            return true;
        }
        return false;
    },

    init: function(application) {
        this.control({
            "#logHours #addHour": {
                click: this.onAddHourClick
            },
            "editEmployeHour #save": {
                click: this.onSaveClick
            },
            "editEmployeHour #cancel": {
                click: this.onCancelClick
            },
            "#logHours_tabConfig": {
                activate: this.onTabActivate
            },
            "#deleteHour": {
                click: this.onDeleteHourClick
            },
            "#logHoursGrid": {
                itemdblclick: this.onLogHoursGridItemDblClick
            }
        });
    }

});
