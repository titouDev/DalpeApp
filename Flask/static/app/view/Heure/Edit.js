
Ext.define("dalpeApp.view.Heure.Edit",{
    extend: "Ext.panel.Panel",

    requires: [
        "dalpeApp.view.Heure.EditController",
        "dalpeApp.view.Heure.EditModel"
    ],

    controller: "heure-edit",
    viewModel: {
        type: "heure-edit"
    },

    html: "Hello, World!!"
});
