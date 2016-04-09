Ext.define('dalpeApp.view.Employe.GridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employe-grid',
   	
   	onAddEmployeClick: function(button, e, eOpts) {
        Ext.widget('editemployewindow').show();
    },
    
    onEditEmployeClick: function(button, e, eOpts) {
        //On prend le record selectionne
        var grid = this.getView();
        var selectedRecord = grid.selModel.getSelection()[0];
        if (!selectedRecord) {
            Ext.Msg.alert('Attention','Vous devez selectionner un employe...').setWidth(200);
            return;
        }

        //On affiche la fenetre d'edit
        var editEmployeWindow = Ext.widget('editemployewindow');

        //On load le soustraitant selecitonne dans le form
        var myForm = editEmployeWindow.down('form');

        //On retourne chercher le data dans la db, au cas ou un autre user ait modifie la fiche
        var employeModel = grid.getStore().getModel();
        employeModel.load(selectedRecord.get('id'),{
            scope:this,
            callback:function(employe){
                myForm.getForm().loadRecord(employe);
            }
        });

        editEmployeWindow.show();

    }
});
