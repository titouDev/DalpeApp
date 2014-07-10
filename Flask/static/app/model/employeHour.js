/*
 * File: app/model/employeHour.js
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

Ext.define('dalpeApp.model.employeHour', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id',
            persist: false,
            type: 'int'
        },
        {
            dateFormat: 'c',
            name: 'workDate',
            type: 'date'
        },
        {
            name: 'hours',
            type: 'float'
        },
        {
            name: 'chantierId',
            type: 'int',
            useNull: true
        },
        {
            name: 'employeId',
            type: 'int'
        },
        {
            name: 'checked',
            type: 'int'
        },
        {
            name: 'hourRate',
            type: 'float'
        }
    ],

    proxy: {
        type: 'rest',
        url: '/api/model/EmployeHour',
        reader: {
            type: 'json',
            root: 'records'
        },
        writer: {
            type: 'json',
            writeAllFields: false
        }
    }
});