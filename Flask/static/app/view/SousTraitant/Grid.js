
Ext.define("dalpeApp.view.SousTraitant.Grid",{
    extend: "Ext.grid.Panel",

    requires: [
        "dalpeApp.view.SousTraitant.GridController",
        "dalpeApp.view.SousTraitant.GridModel"
    ],

    controller: "soustraitant-grid",
    viewModel: {
        type: "soustraitant-grid"
    },
    alias: "widget.soustraitant-grid",
    region: 'center',
    split: true,
    stateId: 'statesousTraitantsGrid',
    stateful: true,
    id: 'sousTraitantsGrid',
    minWidth: 700,
    store: 'sousTraitants',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'combobox',
                    itemId: 'comboSpecialites',
                    width: 251,
                    fieldLabel: 'Specialite',
                    labelWidth: 70,
                    anyMatch: true,
                    displayField: 'name',
                    minChars: 0,
                    store: 'specialites',
                    typeAhead: true,
                    typeAheadDelay: 0,
                    valueField: 'id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'searchText',
                    fieldLabel: 'Recherche Rapide',
                    checkChangeBuffer: 100
                },
                {
                    xtype: 'button',
                    itemId: 'addSousTraitant',
                    iconCls: 'icon-user-add',
                    text: 'Ajouter'
                },
                {
                    xtype: 'button',
                    itemId: 'editSousTraitant',
                    iconCls: 'icon-user-add',
                    text: 'Editer'
                },
                {
                    xtype: 'button',
                    hidden: true,
                    itemId: 'sendMail',
                    iconCls: 'icon-send',
                    text: 'Envoyer un courriel'
                }
            ]
        }
    ],
    columns: [
        {
            xtype: 'templatecolumn',
            tpl: [
                '<font style="font-weight: bold; font-size: 13px;">{name}</font><br>',
                'Contact:&nbsp;&nbsp;&nbsp;&nbsp;{contactName}<br>',
                'Note:&nbsp;&nbsp;&nbsp;&nbsp;{note}'
            ],
            width: 200,
            dataIndex: 'name',
            text: 'Societé',
            flex: 3
        },
        {
            xtype: 'gridcolumn',
            width: 250,
            dataIndex: 'email',
            text: 'Courriel',
            flex: 1
        },
        {
            xtype: 'templatecolumn',
            tpl: [
                'Telephone:&nbsp;&nbsp;{phone}<br>',
                'Cellulaire:&nbsp;&nbsp;{cell}<br>',
                'Fax:&nbsp;&nbsp;{fax}<br>'
            ],
            width: 200,
            dataIndex: 'phone',
            text: 'Telephones',
            flex: 1
        }
    ],
    selModel: Ext.create('Ext.selection.RowModel', {
        selType: 'rowmodel',
        mode: 'MULTI'
    })
});
