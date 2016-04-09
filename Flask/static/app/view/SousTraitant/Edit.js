
Ext.define("dalpeApp.view.SousTraitant.Edit",{
    extend: "Ext.panel.Panel",

    requires: [
        "dalpeApp.view.SousTraitant.EditController",
        "dalpeApp.view.SousTraitant.EditModel"
    ],

    controller: "soustraitant-edit",
    viewModel: {
        type: "soustraitant-edit"
    },

    html: "Hello, World!!"
});
