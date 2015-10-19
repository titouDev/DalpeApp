/*
 * File: app/model/employe.js
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

Ext.define('dalpeApp.model.employe', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.writer.Json',
        'Ext.data.reader.Json',
        'Ext.data.field.Boolean',
        'Ext.data.field.Number'
    ],

    proxy: {
        type: 'rest',
        url: '/api/model/Employe',
        writer: {
            type: 'json',
            writeRecordId: false
        },
        reader: {
            type: 'json',
            rootProperty: 'records'
        }
    },

    fields: [
        {
            type: 'int',
            name: 'id',
            persist: false
        },
        {
            name: 'name'
        },
        {
            name: 'lastName'
        },
        {
            name: 'contactName'
        },
        {
            name: 'email',
            validators: [
                {
                    type: 'email'
                }
            ]
        },
        {
            name: 'phone'
        },
        {
            name: 'cell'
        },
        {
            name: 'fax'
        },
        {
            name: 'address'
        },
        {
            name: 'postalCode'
        },
        {
            name: 'city'
        },
        {
            name: 'province'
        },
        {
            type: 'boolean',
            defaultValue: true,
            name: 'isActive'
        },
        {
            name: 'note'
        },
        {
            type: 'boolean',
            defaultValue: true,
            name: 'isAdmin'
        },
        {
            name: 'login'
        },
        {
            type: 'float',
            name: 'hourRate'
        },
        {
            name: 'password'
        }
    ]
});