/*
 * File: app/controller/logHours.js
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

Ext.define('dalpeApp.controller.logHours', {
    extend: 'Ext.app.Controller',

    models: [
        'employeHour'
    ],
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

        if (!myForm.isValid()) {
            return;
        }

        var formValues = myForm.getValues();
        var logHourModel = this.getEmployeHourModel();
        record = new logHourModel();
        record.set(formValues);

        if (! record.get('id')) {
            //POST
            record.getProxy().appendId=false; //bug fix pour eviter d'appender un slah a la fin de l'url
        }

        record.save({
            scope:this,
            callback:function(){
                button.up('window').close();
                this.loadHoursStore();
            }
        });
        record.getProxy().appendId=true;
    },

    onCancelClick: function(button, e, eOpts) {
        button.up('window').close();
    },

    onTabActivate: function(tab, eOpts) {
        this.refreshGrid();

    },

    onDeleteHourClick: function(button, e, eOpts) {
        //On va chercher le record selectionne

        var me = this;
        var myGrid = this.getLogHoursGrid();

        var selectedRecords = myGrid.selModel.getSelection();
        if (selectedRecords.length === 0) {
            Ext.Msg.alert('Attention','Aucune entrée n\'est selectionnée');
            return;
        }

        Ext.Msg.confirm('Attention','Voulez vous vraiment effacer l\'entrée selectionnée ? ', function(button) {
            if (button === 'yes') {
                var record = selectedRecords[0].data;
                this.deleteRecord(record)
                .then(function(){
                    me.refreshGrid();
                });
            }
        },this).setWidth(320);
    },

    onEmployeSelect: function(combo, records, eOpts) {
        //Lorsqu'on choisi un employe, le cout horaire est sette avec celui de l'employe
        var coutHoraire = records[0].data.coutHoraire;
        var myWindow = combo.up('window');
        coutHoraireField = myWindow.down('#coutHoraire');
        coutHoraireField.setValue(coutHoraire);
    },

    onEditHourClick: function(button, e, eOpts) {
        //On va chercher le record selectionne
        var myGrid = this.getLogHoursGrid();

        var selectedRecords = myGrid.selModel.getSelection();
        if (selectedRecords.length !== 1) {
            Ext.Msg.alert('Attention','Aucune entrée n\'est selectionnée');
            return;
        }

        var record = selectedRecords[0];
        this.editRecord(record);
    },

    refreshGrid: function() {
        //On reload le store pour afficher les heures loggues...
        var me = this;
        var promises = [
        this.loadEmployes(),
        this.loadChantiers()
        ];
        RSVP.all(promises)
        .then(function(){
            me.loadHoursStore();
        });

    },

    loadEmployes: function() {

        var me = this;

        var promise = new RSVP.Promise(function(resolve, reject) {
            me.getEmployesStore().load({
                callback:function(employes){
                    resolve(employes);
                }
            });
        });

        return promise;


    },

    loadChantiers: function() {

        var me = this;

        var promise = new RSVP.Promise(function(resolve, reject) {
            me.getChantiersStore().load({
                callback:function(){
                    resolve();
                }
            });
        });

        return promise;

    },

    deleteRecord: function(record) {
        var me = this;

        var promise = new RSVP.Promise(function(resolve, reject) {
            Ext.Ajax.request({
                url: ('/api/model/EmployeHour/'+record.id),
                method:'DELETE',
                success: function(response){
                    resolve();
                }
            });
        });

        return promise;

    },

    loadHoursStore: function() {
        var employes_logHours_store = Ext.getStore('employes_logHours');
        employes_logHours_store.load();
    },

    editRecord: function(record) {
        var myWindow = Ext.widget('editEmployeHour');
        //On disable le combo employe
        myWindow.down('#employe').setDisabled(true);

        var myForm = myWindow.down('form').getForm();

        myForm.loadRecord(record);

    },

    isLogChecked: function(record) {
        if (record.checked === 1) {
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
            "#employe": {
                select: this.onEmployeSelect
            },
            "#editHour": {
                click: this.onEditHourClick
            }
        });
    }

});