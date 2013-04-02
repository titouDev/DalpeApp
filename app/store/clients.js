/*
 * File: app/store/clients.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
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

Ext.define('dalpeApp.store.clients', {
    extend: 'Ext.data.Store',

    requires: [
        'dalpeApp.model.client'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'clients',
            model: 'dalpeApp.model.client',
            proxy: {
                type: 'direct',
                directFn: Clients.get,
                reader: {
                    type: 'json',
                    root: 'result'
                }
            }
        }, cfg)]);
    }
});