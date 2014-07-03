/*
 * File: app/controller/mailWindow.js
 *
 * This file was generated by Sencha Architect version 2.2.3.
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

Ext.define('dalpeApp.controller.mailWindow', {
    extend: 'Ext.app.Controller',

    models: [
        'mail'
    ],
    stores: [
        'mailLinkSousTraitant',
        'chantiers'
    ],
    views: [
        'mailWindow'
    ],

    refs: [
        {
            ref: 'mailWindow',
            selector: 'mailWindow'
        },
        {
            ref: 'sousTraitantsDestMailGrid',
            selector: 'mailWindow #sousTraitantsDestMailGrid'
        }
    ],

    onSendClick: function(button, e, eOpts) {

    },

    onSaveClick: function(button, e, eOpts) {
        var myForm = button.up('window').down('form');

        var myMail = myForm.getValues();

        if (myMail.subject.trim() === '' && myMail.message.trim() === '')
        {
            Ext.MessageBox.alert('Attention','Vous devez saisir au moins le sujet ou le message.');
        }
        else
        {
            Mails.update(myMail.data);
        }
    },

    onContactsClick: function(button, e, eOpts) {

    },

    onAttachClick: function(button, e, eOpts) {

    },

    onAddClick: function(button, e, eOpts) {

    },

    onRemoveClick: function(button, e, eOpts) {
        //On enleve le contact selectionne
        var selection = this.getSousTraitantsDestMailGrid().selModel.getSelection();
        var myMail = this.getMailWindow().down('form').getValues();
        if (selection)
        {
            Mails.removeLinkSousTraitant(myMail,selection[0].data,function(){
                var linkStore = this.getMailLinkSousTraitantStore();
                linkStore.load({params:{mailId:myMail.id}});
            },this);
        }
    },

    onWindowBeforeDestroy: function(component, eOpts) {
        Ext.MessageBox.confirm('Question','Voulez vous sauvegarder le message avant de fermer la fenetre ?',function(btn){});
    },

    onCloseClick: function(tool, e, eOpts) {
        Ext.MessageBox.confirm('Question','Voulez vous sauvegarder le message avant de fermer la fenetre ?',
        function(btn){
            if (btn == 'no')
            {
                this.getMailWindow().close();
            }
        },this);

    },

    onComboChantiersRender: function(component, eOpts) {
        this.getChantiersStore().load();
    },

    init: function(application) {
        this.control({
            "#mailWindow #send": {
                click: this.onSendClick
            },
            "#mailWindow #save": {
                click: this.onSaveClick
            },
            "#mailWindow  #contacts": {
                click: this.onContactsClick
            },
            "#mailWindow #attach": {
                click: this.onAttachClick
            },
            "#mailWindow #add": {
                click: this.onAddClick
            },
            "#mailWindow #remove": {
                click: this.onRemoveClick
            },
            "#mailWindow  #close": {
                beforedestroy: this.onWindowBeforeDestroy
            },
            "#mailWindow #close": {
                click: this.onCloseClick
            },
            "#mailWindow #comboChantiers": {
                render: this.onComboChantiersRender
            }
        });
    }

});