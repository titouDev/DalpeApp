
Ext.define("dalpeApp.view.Heure.Grid",{
    extend: "Ext.grid.Panel",

    requires: [
        "dalpeApp.view.Heure.GridController",
        "dalpeApp.view.Heure.GridModel"
    ],

    controller: "heure-grid",
    viewModel: {
        type: "heure-grid"
    },
    alias: "widget.heure-grid",
    stateId: 'stateLogHoursGrid',
    stateful: true,
    itemId: 'logHoursGrid',
    store: 'employes_logHours',
    columns: [
        {
            xtype: 'datecolumn',
            dataIndex: 'workDate',
            text: 'Date',
            format: 'd-M-Y'
        },
        {
            xtype: 'numbercolumn',
            dataIndex: 'hours',
            text: 'Heures'
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                var chantierStore = Ext.getStore('chantiers');

                var chantier = chantierStore.getById(value);
                return chantier ? chantier.get('name') : "";

            },
            width: 200,
            dataIndex: 'chantierId',
            text: 'Chantier'
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                var employeStore = Ext.getStore('employes');

                var employe = employeStore.getById(value);

                return employe.get('name') + " " + employe.get('lastName');
            },
            width: 200,
            dataIndex: 'employeId',
            text: 'Employe'
        },
        {
            xtype: 'numbercolumn',
            dataIndex: 'hourRate',
            text: 'Cout Horaire'
        }
    ]
});
