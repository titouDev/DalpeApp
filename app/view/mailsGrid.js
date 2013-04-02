/*
 * File: app/view/mailsGrid.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
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

Ext.define('dalpeApp.view.mailsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mailsgrid',

    id: 'mailsGrid',
    width: 150,
    collapsed: false,
    collapsible: false,
    title: 'Courriels',
    store: 'mails',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.RowModel', {

            }),
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'subject',
                    text: 'Sujet'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var chantiersStore = Ext.getStore('chantiers');
                        var chantierId = record.data.chantierId;
                        if (chantierId)
                        {

                            return chantiersStore.getById(chantierId).data.name;
                        }
                        else
                        {
                            return '';
                        }
                    },
                    dataIndex: 'chantierId',
                    text: 'Chantier'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'creationDate',
                    text: 'Cree le'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var employesStore = Ext.getStore('employes');
                        var userId = record.data.userCreateId;
                        if (userId)
                        {

                            return employesStore.getById(userId).data.prenom + " " + employesStore.getById(userId).data.nom;
                        }
                        else
                        {
                            return '';
                        }
                    },
                    dataIndex: 'userCreateId',
                    text: 'Cree par'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'sentDate',
                    text: 'Envoye le'
                }
            ],
            listeners: {
                itemdblclick: {
                    fn: me.onMailsGridItemDblClick,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onMailsGridItemDblClick: function(tablepanel, record, item, index, e, options) {


        var myMail = record.data;



        //On reload le store de liens
        var linkStore = Ext.getStore('mailLinkSousTraitant');
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


        }

    }

});