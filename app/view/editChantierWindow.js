/*
 * File: app/view/editChantierWindow.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
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

Ext.define('dalpeApp.view.editChantierWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.editChantierWindow',

    height: 302,
    id: 'editChantierWindow',
    minHeight: 290,
    minWidth: 650,
    width: 839,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: 'Edit Chantier',
    constrain: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    flex: 1,
                    itemId: 'editForm',
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            border: 0,
                            margin: 5,
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    margins: '10',
                                    border: 0,
                                    layout: {
                                        align: 'stretch',
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            maxHeight: 25,
                                            fieldLabel: 'Nom',
                                            name: 'name',
                                            allowBlank: false,
                                            blankText: 'Ce champ est requis'
                                        },
                                        {
                                            xtype: 'textareafield',
                                            flex: 1,
                                            fieldLabel: 'Notes',
                                            name: 'note'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    margins: '10',
                                    border: 0,
                                    layout: {
                                        align: 'stretch',
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            fieldLabel: 'Client',
                                            labelWidth: 150,
                                            name: 'clientId',
                                            allowBlank: false,
                                            displayField: 'displayName',
                                            queryMode: 'local',
                                            store: 'clients',
                                            valueField: 'id'
                                        },
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            fieldLabel: 'Status',
                                            labelWidth: 150,
                                            name: 'status',
                                            allowBlank: false,
                                            store: [
                                                'Devis',
                                                'Encours',
                                                'Termine'
                                            ]
                                        },
                                        {
                                            xtype: 'datefield',
                                            flex: 1,
                                            fieldLabel: 'Debut des Travaux',
                                            labelWidth: 150,
                                            name: 'startDate',
                                            submitFormat: 'Y-m-d'
                                        },
                                        {
                                            xtype: 'datefield',
                                            flex: 1,
                                            fieldLabel: 'Fin des Travaux',
                                            labelWidth: 150,
                                            name: 'endDate',
                                            submitFormat: 'Y-m-d'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'numberfield',
                            flex: 1,
                            hidden: true,
                            fieldLabel: 'Label',
                            name: 'id'
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'bottom',
                    itemId: 'toolBar',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            itemId: 'enregistrer',
                            text: 'Enregistrer'
                        },
                        {
                            xtype: 'button',
                            itemId: 'annuler',
                            text: 'Annuler'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});