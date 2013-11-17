/*
 * File: app/view/editEmployeWindow.js
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

Ext.define('dalpeApp.view.editEmployeWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.editEmployeWindow',

    height: 515,
    id: 'editEmployeWindow',
    minHeight: 515,
    minWidth: 650,
    width: 757,
    constrain: true,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: 'Edit Employe',
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
                            maxWidth: 200,
                            width: 75,
                            layout: {
                                type: 'fit'
                            },
                            title: 'Photos',
                            items: [
                                {
                                    xtype: 'image',
                                    height: 201,
                                    itemId: 'photo',
                                    width: 201
                                }
                            ]
                        },
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
                                            name: 'nom',
                                            allowBlank: false,
                                            blankText: 'Ce champ est requis'
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            maxHeight: 25,
                                            fieldLabel: 'Prenom',
                                            name: 'prenom',
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            maxHeight: 25,
                                            fieldLabel: 'Telephone',
                                            name: 'phone'
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            maxHeight: 25,
                                            fieldLabel: 'Cellulaire',
                                            name: 'cell'
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            maxHeight: 25,
                                            fieldLabel: 'Couriel',
                                            name: 'mail'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            flex: 1,
                                            fieldLabel: 'Cout Horaire',
                                            name: 'coutHoraire'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    margins: '10',
                                    border: 0,
                                    height: 171,
                                    layout: {
                                        align: 'stretch',
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            maxHeight: 25,
                                            fieldLabel: 'Adresse',
                                            name: 'adresse'
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            maxHeight: 25,
                                            fieldLabel: 'Code Postal',
                                            name: 'codePostal'
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            maxHeight: 25,
                                            fieldLabel: 'Ville',
                                            name: 'ville'
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            maxHeight: 25,
                                            fieldLabel: 'Province',
                                            name: 'province'
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            maxHeight: 25,
                                            fieldLabel: 'nom d\'utilisateur',
                                            name: 'login'
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            maxHeight: 25,
                                            fieldLabel: 'mot de passe',
                                            name: 'password'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            flex: 1,
                            margins: '0 0 0 0',
                            border: '0 0 0 0',
                            itemId: 'fileForm',
                            maxHeight: 30,
                            shadow: false,
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'filefield',
                                    flex: 1,
                                    margins: '5',
                                    itemId: 'photoImport',
                                    maxHeight: 30,
                                    fieldLabel: 'Photo',
                                    name: 'photoImport',
                                    buttonText: 'Rechercher...'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'savePhoto',
                                    maxHeight: 30,
                                    text: 'Enregistrer'
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