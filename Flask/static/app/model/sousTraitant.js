/*
 * File: app/model/sousTraitant.js
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

Ext.define('dalpeApp.model.sousTraitant', {
    extend: 'Ext.data.Model',

    proxy: {
        type: 'rest',
        sortParam: 'undefined',
        url: '/api/model/Soustraitant',
        reader: {
            type: 'json',
            root: 'records'
        },
        writer: {
            type: 'json'
        }
    },

    fields: [
        {
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
            name: 'email'
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
            defaultValue: true,
            name: 'isActive',
            type: 'boolean'
        },
        {
            name: 'note'
        },
        {
            name: 'webSite'
        },
        {
            name: 'rbqLicense'
        },
        {
            name: 'tpsNumber'
        },
        {
            name: 'specialites'
        }
    ]
});