/*
 * File: app/model/chantier.js
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

Ext.define('dalpeApp.model.chantier', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id',
            persist: false,
            type: 'string'
        },
        {
            name: 'name'
        },
        {
            name: 'note'
        },
        {
            name: 'status',
            type: 'string'
        },
        {
            name: 'clientId',
            type: 'int'
        },
        {
            dateFormat: 'c',
            name: 'startDate',
            type: 'date'
        },
        {
            dateFormat: 'c',
            name: 'endDate',
            type: 'date'
        },
        {
            name: 'clientName'
        }
    ],

    proxy: {
        type: 'rest',
        url: '/api/model/chantiers',
        reader: {
            type: 'json',
            root: 'records'
        },
        writer: {
            type: 'json',
            writeRecordId: false
        }
    }
});