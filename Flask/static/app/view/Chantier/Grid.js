Ext.define("dalpeApp.view.Chantier.Grid",{
    extend: "Ext.grid.Panel",

    requires: [
        "dalpeApp.view.Chantier.GridController",
        "dalpeApp.view.Chantier.GridModel"
    ],

    controller: "chantier-grid",
    viewModel: {
        type: "chantier-grid"
    },
    alias: "widget.chantier-grid",
    flex: 1,
    region: 'center',
    split: true,
    stateId: 'stateChantiersGrid',
    stateful: true,
    height: 250,
    id: 'chantiersGrid',
    store: 'chantiers',
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'name',
            text: 'Nom',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'note',
            text: 'Note',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'status',
            text: 'Status',
            flex: 1
        },
        {
            xtype: 'datecolumn',
            dataIndex: 'startDate',
            text: 'Debut',
            format: 'd-M-Y'
        },
        {
            xtype: 'datecolumn',
            dataIndex: 'endDate',
            text: 'Fin',
            format: 'd-M-Y'
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                var clientStore = Ext.getStore('clients');
                var client = clientStore.getById(record.get('clientId'));
                return client ? client.get('nom') : '';
            },
            dataIndex: 'clientId',
            text: 'Client',
            flex: 1
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    itemId: 'addChantier',
                    iconCls: 'icon-add',
                    text: 'Nouveau Chantier'
                },
                {
                    xtype: 'button',
                    itemId: 'editChantier',
                    iconCls: '',
                    text: 'Editer'
                }
            ]
        }
    ]
});
