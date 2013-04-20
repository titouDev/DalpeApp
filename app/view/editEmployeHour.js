/*
 * File: app/view/editEmployeHour.js
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

Ext.define('dalpeApp.view.editEmployeHour', {
    extend: 'Ext.window.Window',
    alias: 'widget.editEmployeHour',

    autoShow: true,
    height: 254,
    id: 'editEmployeHour',
    width: 386,
    resizable: false,
    layout: {
        type: 'fit'
    },
    title: 'Entrée d\'heures',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    height: 208,
                    width: 598,
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Date de travail',
                            name: 'workDate',
                            allowBlank: false,
                            format: 'd-M-Y',
                            submitFormat: 'c'
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Heures travaillées',
                            name: 'hours',
                            allowBlank: false,
                            autoStripChars: true,
                            maxValue: 24,
                            minValue: 0
                        },
                        {
                            xtype: 'combobox',
                            flex: 1,
                            height: 30,
                            itemId: 'employe',
                            maxHeight: 30,
                            fieldLabel: 'Employe',
                            name: 'employeId',
                            allowBlank: false,
                            displayField: 'nom',
                            store: 'employes',
                            valueField: 'id'
                        },
                        {
                            xtype: 'numberfield',
                            flex: 1,
                            height: 30,
                            itemId: 'coutHoraire',
                            maxHeight: 30,
                            fieldLabel: 'Cout Horaire',
                            name: 'coutHoraire',
                            minValue: 0
                        },
                        {
                            xtype: 'combobox',
                            flex: 1,
                            height: 30,
                            itemId: 'chantier',
                            maxHeight: 30,
                            fieldLabel: 'Chantier',
                            name: 'chantierId',
                            displayField: 'name',
                            store: 'chantiers',
                            valueField: 'id'
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
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            itemId: 'save',
                            text: 'Sauvegarder'
                        },
                        {
                            xtype: 'button',
                            itemId: 'cancel',
                            text: 'Annuler'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});