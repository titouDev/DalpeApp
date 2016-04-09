Ext.define("dalpeApp.view.Employe.Grid",{
    extend: "Ext.grid.Panel",

    requires: [
        "dalpeApp.view.Employe.GridController",
        "dalpeApp.view.Employe.GridModel"
    ],

    controller: "employe-grid",
    viewModel: {
        type: "employe-grid"
    },

    alias:'widget.employe-grid',
    flex: 1,
    region: 'center',
    split: true,
    stateId: 'stateEmployesGrid',
    stateful: true,
    id: 'employesGrid',
    store: 'employes',
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
            flex: 1.5
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
                    itemId: 'addEmploye',
                    iconCls: 'icon-user-add',
                    text: 'Ajouter',
                    listeners:{
                        click:"onAddEmployeClick"
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'editEmploye',
                    iconCls: 'icon-user-add',
                    text: 'Editer',
                    listeners:{
                        click:"onEditEmployeClick"
                    }
                }
            ]
        }
    ]
});
