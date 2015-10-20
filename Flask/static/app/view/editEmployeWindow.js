/*
 * File: app/view/editEmployeWindow.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('dalpeApp.view.editEmployeWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.editEmployeWindow',

    requires: [
        'dalpeApp.view.editEmployeWindowViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Number',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'editEmployeWindow'
    },
    constrain: true,
    height: 290,
    id: 'editEmployeWindow',
    maxHeight: 290,
    minHeight: 290,
    minWidth: 650,
    resizable: false,
    width: 757,
    title: 'Edit Employe',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            itemId: 'editForm',
            bodyPadding: 10,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    flex: 1,
                    border: false,
                    margin: 5,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            margins: '10',
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    maxHeight: 25,
                                    fieldLabel: 'Nom',
                                    name: 'lastName',
                                    allowBlank: false,
                                    blankText: 'Ce champ est requis'
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    maxHeight: 25,
                                    fieldLabel: 'Prenom',
                                    name: 'name',
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
                                    name: 'email'
                                },
                                {
                                    xtype: 'numberfield',
                                    flex: 1,
                                    fieldLabel: 'Cout Horaire',
                                    name: 'hourRate'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            margins: '10',
                            border: false,
                            height: 171,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    maxHeight: 25,
                                    fieldLabel: 'Adresse',
                                    name: 'address'
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    maxHeight: 25,
                                    fieldLabel: 'Code Postal',
                                    name: 'postalCode'
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    maxHeight: 25,
                                    fieldLabel: 'Ville',
                                    name: 'city'
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
                                    name: 'password',
                                    inputType: 'password'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'textfield',
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