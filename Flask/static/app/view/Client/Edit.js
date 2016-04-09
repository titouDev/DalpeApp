
Ext.define("dalpeApp.view.Client.Edit",{
    extend: "Ext.panel.Panel",

    requires: [
        "dalpeApp.view.Client.EditController",
        "dalpeApp.view.Client.EditModel"
    ],

    controller: "client-edit",
    viewModel: {
        type: "client-edit"
    },

    html: "Hello, World!!"
});
