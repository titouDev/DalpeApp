/*
 * File: app/model/client.js
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

Ext.define('dalpeApp.model.client', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id',
            persist: false,
            type: 'int'
        },
        {
            name: 'prenom'
        },
        {
            name: 'nom'
        },
        {
            name: 'mail'
        },
        {
            name: 'phone'
        },
        {
            name: 'cell'
        },
        {
            name: 'adresse'
        },
        {
            name: 'codePostal'
        },
        {
            name: 'ville'
        },
        {
            name: 'province'
        }
    ],

    proxy: {
        type: 'rest',
        url: '/api/model/clients',
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