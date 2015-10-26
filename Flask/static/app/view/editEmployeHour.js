/*
 * File: app/view/editEmployeHour.js
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

Ext.define('dalpeApp.view.editEmployeHour', {
    extend: 'Ext.window.Window',
    alias: 'widget.editEmployeHour',

    requires: [
        'dalpeApp.view.editEmployeHourViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.form.field.Number',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'editEmployeHour'
    },
    autoShow: true,
    height: 254,
    id: 'editEmployeHour',
    resizable: false,
    width: 386,
    layout: 'fit',
    title: 'Entrée d\'heures',
    modal: true,

    items: [
        {
            xtype: 'form',
            height: 208,
            width: 598,
            bodyPadding: 10,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
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
                    store: 'employes'
                },
                {
                    xtype: 'numberfield',
                    flex: 1,
                    height: 30,
                    itemId: 'coutHoraire',
                    maxHeight: 30,
                    fieldLabel: 'Cout Horaire',
                    name: 'hourRate',
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
                    itemId: 'editHoursWindow',
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