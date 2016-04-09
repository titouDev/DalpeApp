
Ext.define("dalpeApp.view.Chantier.Edit",{
    extend: "Ext.panel.Panel",

    requires: [
        "dalpeApp.view.Chantier.EditController",
        "dalpeApp.view.Chantier.EditModel"
    ],

    controller: "chantier-edit",
    viewModel: {
        type: "chantier-edit"
    },

    html: "Hello, World!!"
});
