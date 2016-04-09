
Ext.define("dalpeApp.view.Client.Grid",{
    extend: "Ext.grid.Panel",

    requires: [
        "dalpeApp.view.Client.GridController",
        "dalpeApp.view.Client.GridModel"
    ],

    controller: "client-grid",
    viewModel: {
        type: "client-grid"
    },
    alias: "widget.client-grid",
    stateId: 'stateClientsGrid',
    stateful: true,
    id: 'clientsGrid',
    title: 'Clients',
    store: 'clients',
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'name',
            text: 'Prenom',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'lastName',
            text: 'Nom',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'email',
            text: 'Courriel',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'phone',
            text: 'Telephone',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'cell',
            text: 'Cellulaire',
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
                    itemId: 'addClient',
                    iconCls: 'icon-user-add',
                    text: 'Ajouter'
                },
                {
                    xtype: 'button',
                    itemId: 'editClient',
                    iconCls: 'icon-user-add',
                    text: 'Editer'
                }
            ]
        }
    ]
});
