/*
 * File: dalpeApp/model/client.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
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

Ext.define('dalpeApp.model.client', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Rest',
        'Ext.data.writer.Json',
        'Ext.data.reader.Json'
    ],

    fields: [
        {
            name: 'name'
        },
        {
            name: 'lastName'
        },
        {
            name: 'email'
        },
        {
            name: 'phone'
        },
        {
            name: 'cell'
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
            name: 'id',
            persist: false,
            type: 'int'
        },
        {
            name: 'fax'
        },
        {
            defaultValue: true,
            name: 'isActive',
            type: 'boolean'
        }
    ],

    proxy: {
        type: 'rest',
        url: '/api/model/Client',
        writer: {
            type: 'json',
            writeRecordId: false
        },
        reader: {
            type: 'json',
            root: 'records'
        }
    }
});