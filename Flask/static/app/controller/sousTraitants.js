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
        'sousTraitants_full',
        'specialitesLinkSoustraitants'
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
            ref: 'comboSpecialites',
            selector: '#comboSpecialites'
        },
        {
            ref: 'comboAddSpecialites',
            selector: '#comboAddSpecialites'
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
        this.applyQuickSearch();

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

    onRefreshClick: function(tool, e, eOpts) {
        this.reloadSousTraitantsStore();
    },

    onRefreshClickMailsGrid: function(tool, e, eOpts) {
        var selectedSousTraitant = this.getSousTraitantsGrid().selModel.getSelection()[0];
        if (selectedSousTraitant) this.updateMailsGrid(selectedSousTraitant.internalId);


    },

    onComboSpecialitesSelect: function(combo, records, eOpts) {
        this.refreshGrid();

    },

    onSousTraitantsPanelActivate: function(component, eOpts) {
        this.refreshGrid();

    },

    onCreateMailButtonClick: function(button, e, eOpts) {
        this.prepareMail();
    },

    onRefreshMailsNotSentGridClick: function(tool, e, eOpts) {
        this.getMails_notsentStore().load();
    },

    onAddSousTraitantClick: function(button, e, eOpts) {
        //On s'assure que le store des links specialites/sous traitant est vide
        //var myStore = Ext.getStore('specialiteLinkSousTraitant');
        //myStore.proxy.extraParams = '';
        //myStore.removeAll();
        this.currentSpecialites = [];
        this.loadSpecialiteLinkSoustraitantsStore(this.currentSpecialites);
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
        var mySousTraitant = myForm.getRecord();

        if (!mySousTraitant) {
            var sousTraitantModel = this.getSousTraitantModel();    
            mySousTraitant = new sousTraitantModel();
        }
        mySousTraitant.set(myForm.getValues());

        //Un peu broche a fouin...
        var store = this.getSpecialitesLinkSoustraitantsStore();
        mySousTraitant.set('specialites', store.collect('name'));

        if (! mySousTraitant.get('id')) {
            //POST
            mySousTraitant.getProxy().appendId=false; //bug fix pour eviter d'appender un slah a la fin de l'url
        }

        mySousTraitant.save({
            scope:this,
            callback:function(){
                button.up('window').close();
                this.refreshGrid();
            }
        });
        mySousTraitant.getProxy().appendId=true;
    },

    onAddSpecialiteClick: function(button, e, eOpts) {
        var specialite = this.getComboAddSpecialites().getValue();
        this.addOrRemoveSpecialite(specialite, 'add');
        button.up('window').close();
    },

    addOrRemoveSpecialite: function(specialite, operation) {

        if (operation === 'add') {
            this.currentSpecialites.push({name:specialite});

        }
        else if (operation === 'remove') {

            this.currentSpecialites = Ext.Array.filter(this.currentSpecialites, function(s){
                return s.name != specialite;    
            });
        }
        this.loadSpecialiteLinkSoustraitantsStore(this.currentSpecialites);

    },

    refreshGrid: function() {
        var me = this;

        //On prend la valeur du comboSpecialite
        var specialiteId = me.getSousTraitantsGrid().down('#comboSpecialites').getValue();
        me.reloadSousTraitantsStore()
        .then(function(){
            me.applyQuickSearch();

        });

    },

    loadSpecialiteLinkSoustraitantsStore: function(specialites) {
        var store = this.getSpecialitesLinkSoustraitantsStore();
        store.removeAll();

        store.loadData(specialites);

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

    init: function() {
        this.currentSpecialites = [];

        this.control({
            "#sousTraitantsGrid #searchText": {
                change: this.onTextfieldChange
            },
            "#deleteMailNotSentButton": {
                click: this.onDeleteMailNotSentButtonClick
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
            },
            "#addSpecialite": {
                click: this.onAddSpecialiteClick
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
            }
        });



        //On affiche la fenetre
        var editSousTraitantWindow = Ext.widget('editSousTraitantWindow');

        editSousTraitantWindow.show();

        //On load le soustraitant selecitonne dans le form
        var myForm = editSousTraitantWindow.down('form');

        //On filtre le store des documents
        var documentsStore = Ext.getStore('documents');
        documentsStore.removeAll();
        documentsStore.load({params:{sousTraitantId:selectedRecord.data.id}});


        this.currentSpecialites = Ext.clone(selectedRecord.get('specialites'));
        this.loadSpecialiteLinkSoustraitantsStore(this.currentSpecialites);
    },

    reloadSousTraitantsStore: function(params) {
        var me = this;
        var promise = new RSVP.Promise(function(resolve, reject) {
            var store = me.getSousTraitantsStore();
            store.removeAll();
            store.getProxy().extraParams = params;
            store.load({
                callback:function(){
                    resolve();
                }
            });

        });

        return promise;

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

    applyQuickSearch: function() {
        var newValue = this.getSearchField().getValue();
        //On filtre le store en local
        var regFind = new RegExp(newValue,"i");
        var store = this.getSousTraitantsStore();
        store.clearFilter(true);
        store.filter([
        {filterFn: function(item) {
            return (regFind.test(item.get("name")) || regFind.test(item.get("contactName"))  );
        }}
        ]);
    },

    showMailWindow: function(record) {
        var myMail = record.data;



        //On reload le store de liens
        var linkStore = this.getMailLinkSousTraitantStore();
        linkStore.load({params:{mailId:myMail.id}});

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

    }

});
