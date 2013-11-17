/*
 * File: app/controller/sousTraitants.js
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

Ext.define('dalpeApp.controller.sousTraitants', {
    extend: 'Ext.app.Controller',

    models: [
        'sousTraitant',
        'mail'
    ],
    stores: [
        'mails',
        'sousTraitants',
        'mailLinkSousTraitant',
        'specialites',
        'mails_notsent',
        'chantiers',
        'sousTraitants_full'
    ],
    views: [
        'editSousTraitantWindow',
        'windowAddSpecialite'
    ],

    refs: [
        {
            ref: 'mailsNotSentGrid',
            selector: '#mails_notsent_grid'
        },
        {
            ref: 'searchField',
            selector: '#sousTraitantsGrid #searchText'
        },
        {
            ref: 'mailsGrid',
            selector: '#mailsGrid'
        },
        {
            ref: 'sousTraitantsGrid',
            selector: '#sousTraitantsGrid'
        }
    ],

    onTextfieldChange: function(field, newValue, oldValue, eOpts) {
        //On filtre le store en local
        var regFind = new RegExp(newValue,"i");
        this.getSousTraitantsStore().clearFilter(true);
        this.getSousTraitantsStore().filter([
        {filterFn: function(item) {
            return (regFind.test(item.get("name")) || regFind.test(item.get("contactName"))  );
        }}
        ]);
        this.resetMailsGrid();
    },

    onDeleteMailNotSentButtonClick: function(button, e, eOpts) {
        var selectedMail = this.getMailsNotSentGrid().selModel.getSelection()[0];

        if (!selectedMail) {
            Ext.Msg.alert('Attention','Vous devez selectionner un courriel...');
            return;
        }

        Ext.Msg.confirm('Attention',
        'Etes vous sur de vouloir effacer le courriel?',
        function(button) {
            if (button === 'yes') {
                Mails.delete(
                selectedMail.data,
                function(){
                    this.getMails_notsentStore().load();
                },
                this
                );
            }
            else {
                return;
            }
        },
        this
        );

    },

    onRowselectionmodelSelect: function(rowmodel, record, index, eOpts) {

        var mailsStore = this.getMailsGrid().store;
        mailsStore.clearFilter(true);
        mailsStore.filter('sousTraitantId',record.data.id);

        //On update egalement le tire du mail panel
        var newTitle = 'Courriels envoyés à ' + record.data.name;
        this.getMailsGrid().setTitle(newTitle);


    },

    onRefreshClick: function(tool, e, eOpts) {
        this.reloadSousTraitantsStore();
    },

    onRefreshClickMailsGrid: function(tool, e, eOpts) {
        var selectedSousTraitant = this.getSousTraitantsGrid().selModel.getSelection()[0];
        if (selectedSousTraitant) this.updateMailsGrid(selectedSousTraitant.internalId);


    },

    onComboSpecialitesSelect: function(combo, records, eOpts) {
        this.reloadSousTraitantsStore();
        this.resetMailsGrid();
    },

    onSousTraitantsPanelActivate: function(component, eOpts) {
        this.getSousTraitantsStore().proxy.sortParam = undefined; //empeche d'envoye le param sort dans le proxy
        this.getSousTraitantsStore().load();
    },

    onCreateMailButtonClick: function(button, e, eOpts) {
        this.prepareMail();
    },

    onRefreshMailsNotSentGridClick: function(tool, e, eOpts) {
        this.getMails_notsentStore().load();
    },

    onAddSousTraitantClick: function(button, e, eOpts) {
        //On s'assure que le store des links specialites/sous traitant est vide
        var myStore = Ext.getStore('specialiteLinkSousTraitant');
        myStore.proxy.extraParams = '';
        myStore.removeAll();

        Ext.widget('editSousTraitantWindow').show();
    },

    onEditSousTraitantClick: function(button, e, eOpts) {
        this.editSousTraitant();
    },

    onSendMailClick: function(button, e, eOpts) {
        this.prepareMail();
    },

    onEditMailButtonClick: function(button, e, eOpts) {
        var selectedMail = this.getMailsNotSentGrid().selModel.getSelection()[0];

        if (!selectedMail) {
            Ext.Msg.alert('Attention','Vous devez selectionner un courriel...');
            return;
        }

        this.editMail(selectedMail);

    },

    onAnnulerClick: function(button, e, eOpts) {
        button.up('window').close();
    },

    onSaveDocumentClick: function(button, e, eOpts) {
        var myEditForm = button.up('window').down('#editForm').getForm();
        var sousTraitantId = myEditForm.getValues().id;

        if (! sousTraitantId) {
            Ext.Msg.alert('Attention','Vous devez d\'abord créer un Sous Traitant pour enregistrer un document');
        }
        else {

            var form = button.up('#fileForm').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'document-upload.php',
                    scope:this,
                    timeout:100,
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
                    }
                });
            }
        }
    },

    onEnregistrerClick: function(button, e, eOpts) {
        //On va chercher les infos du form
        var myForm = Ext.getCmp('editSousTraitantWindow').down('form').getForm();
        if (! myForm.isValid()) {
            return;
        }
        var sousTraitantModel = this.getSousTraitantModel();

        var mySousTraitant = myForm.getRecord();

        if (!mySousTraitant) {
            mySousTraitant = new sousTraitantModel();
        }
        mySousTraitant.set(myForm.getValues());
        mySousTraitant.save({
            scope:this,
            callback:function(){
                button.up('window').close();
                this.getSousTraitantsStore().load();
            }
        });

    },

    editMail: function(record) {
        //On reload le store des chantiers, puis on show la window

        this.getChantiersStore().load({
            scope:this,
            callback:function(){
                this.showMailWindow(record);
            }
        });

    },

    prepareMail: function() {

        //On ajoute les  sous traitants selectionnes dans le store (mais pas encore dans la DB)
        //Le user va peut etre annuler son mail.
        var selectedRecords = this.getSousTraitantsGrid().selModel.getSelection();
        if (selectedRecords.length >0) {
            var count = 0;
            var linkStore = this.getMailLinkSousTraitantStore();
            linkStore.removeAll();
            for (var i in selectedRecords)
            {
                record = selectedRecords[i];
                if (record.data.mail)
                {
                    //Le sous traitant a une adresse email, on peut l'ajouter au store
                    linkStore.add(record);
                    count++;
                }
            }
        }

        this.getSousTraitants_fullStore().load();
        //On affiche la fenetre
        var mailWindow = Ext.widget('mailWindow');

    },

    editSousTraitant: function() {
        //On prend le record selectionne
        var selectedRecord = this.getSousTraitantsGrid().selModel.getSelection()[0];

        if (!selectedRecord) {
            Ext.Msg.alert('Attention','Vous devez selectionner un sous traitant...').setWidth(200);
            return;
        }


        //On retourne chercher le data dans la db, au cas ou un autre user ait modifie la fiche
        var sousTraitantModel = this.getSousTraitantModel();
        sousTraitantModel.load(selectedRecord.get('id'),{
            callback:function(sousTraitant){
                myForm.getForm().loadRecord(sousTraitant);
            }});



            //On affiche la fenetre
            var editSousTraitantWindow = Ext.widget('editSousTraitantWindow');

            editSousTraitantWindow.show();

            //On load le soustraitant selecitonne dans le form
            var myForm = editSousTraitantWindow.down('form');



            //On filtre le store des specialites
            var specialiteLinkStore = editSousTraitantWindow.down('#specialitesGrid').store;
            specialiteLinkStore.removeAll();
            specialiteLinkStore.proxy.extraParams = {sousTraitantId:selectedRecord.data.id};
            specialiteLinkStore.load();

            //On filtre le store des documents
            var documentsStore = Ext.getStore('documents');
            documentsStore.removeAll();
            documentsStore.proxy.extraParams = {sousTraitantId:selectedRecord.data.id};
            documentsStore.load();


    },

    reloadSousTraitantsStore: function() {
        //On vide les stores qui ont besoin d'etre vides
        this.getMailsStore().removeAll();

        //On prend la valeur du comboSpecialite
        var specialiteId = this.getSousTraitantsGrid().down('#comboSpecialites').getValue();

        this.getSousTraitantsGrid().selModel.deselectAll();
        var myStore = this.getSousTraitantsStore();
        myStore.proxy.extraParams = {
            searchText:this.getSearchField().value,
            specialiteId:specialiteId
        };
        myStore.load();
    },

    filterSousTraitantsStoreWithText: function() {
        //On va chercher la valeur du text search
        var newValue = this.getSearchField().value;

        var sousTraitantsStore = this.getSousTraitantsGrid().store;
        sousTraitantsStore.clearFilter();
        sousTraitantsStore.filter([
        {filterFn: function(item) {
            if (item.get("name") )
            {
                return (item.get("name").toLowerCase().indexOf(newValue.toLowerCase()) != -1);
            }
            return false;
        }}

        ]);



    },

    confirmAddSousTraitant: function(btn, text) {
        if (btn == 'ok')
        {
            var model = this.getSousTraitantModel();

            // create a record
            var newRecord = Ext.create(model);
            newRecord.data.name = text;
            SousTraitants.create(newRecord.data,function(){
                this.getSearchField().setValue(text);
            },this);


        }
    },

    getSelectedSousTraitant: function() {
        var sousTraitantGrid = Ext.ComponentQuery.query('#sousTraitantsGrid');
        if (sousTraitantGrid[0].selModel.selected.items)
        {
            return sousTraitantGrid[0].selModel.selected.items[0];

        }
        return false;

    },

    updateMailsGrid: function(sousTraitantId) {
        var mailsStore = this.getMailsGrid().store;
        mailsStore.clearFilter(true);
        mailsStore.filter('sousTraitantId',sousTraitantId);
    },

    resetMailsGrid: function() {
        var mailsGrid = this.getMailsGrid();
        mailsGrid.store.removeAll();
        mailsGrid.setTitle('Courriels');
    },

    showMailWindow: function(record) {
        var myMail = record.data;



        //On reload le store de liens
        var linkStore = this.getMailLinkSousTraitantStore();
        linkStore.proxy.extraParams = {mailId:myMail.id};
        linkStore.load();

        //On affiche la fenetre
        var mailWindow = Ext.widget('mailWindow');
        //On update le form
        var myForm = mailWindow.down('form');
        myForm.getForm().setValues(myMail);


        if (myMail.sentDate)
        {
            //Le form va etre read Only
            //Ext.Msg.alert('Attention', 'Ce mail a deja ete envoye, vous ne pourrez donc pas le modifier.');
            mailWindow.down('#comboChantiers').readOnly = true;
            mailWindow.down('#subject').setReadOnly(true);
            mailWindow.down('#message').setReadOnly(true);

            //On hide les boutons send et save
            mailWindow.down('#save').hide();
            mailWindow.down('#send').hide();
            //On hide  les boutons add et remove destinataire
            mailWindow.down('#add').hide();
            mailWindow.down('#remove').hide();

        }

    },

    init: function(application) {
        this.control({
            "#sousTraitantsGrid #searchText": {
                change: this.onTextfieldChange
            },
            "#deleteMailNotSentButton": {
                click: this.onDeleteMailNotSentButtonClick
            },
            "#sousTraitantsGrid": {
                select: this.onRowselectionmodelSelect
            },
            "#sousTraitantsGrid #refresh": {
                click: this.onRefreshClick
            },
            "#mailsGrid #refresh": {
                click: this.onRefreshClickMailsGrid
            },
            "#sousTraitantsGrid #comboSpecialites": {
                select: this.onComboSpecialitesSelect
            },
            "#sousTraitantsPanel": {
                activate: this.onSousTraitantsPanelActivate
            },
            "#createMailButton": {
                click: this.onCreateMailButtonClick
            },
            "#refreshMailsNotSentGrid": {
                click: this.onRefreshMailsNotSentGridClick
            },
            "#addSousTraitant": {
                click: this.onAddSousTraitantClick
            },
            "#editSousTraitant": {
                click: this.onEditSousTraitantClick
            },
            "#sendMail": {
                click: this.onSendMailClick
            },
            "#editMailButton": {
                click: this.onEditMailButtonClick
            },
            "editSousTraitantWindow #annuler": {
                click: this.onAnnulerClick
            },
            "#editSousTraitantWindow #saveDocument": {
                click: this.onSaveDocumentClick
            },
            "editSousTraitantWindow #enregistrer": {
                click: this.onEnregistrerClick
            }
        });
    }

});
