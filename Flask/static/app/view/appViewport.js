/*
 * File: app/view/appViewport.js
 *
 * This file was generated by Sencha Architect version 2.2.3.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('dalpeApp.view.appViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.appViewport',

    id: 'appViewport',
    layout: {
        type: 'fit'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    layout: {
                        type: 'fit'
                    },
                    title: 'Construction Julien Dalpé Inc.',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            id: 'appToolbar',
                            itemId: '',
                            items: [
                                {
                                    xtype: 'tbtext',
                                    itemId: 'userLogged',
                                    text: 'Utilisateur connecté'
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'logout',
                                    text: 'se déconnecter...'
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'tabpanel',
                            stateId: 'stateTabPanel',
                            stateful: true,
                            title: '',
                            activeTab: 1,
                            items: [
                                {
                                    xtype: 'panel',
                                    id: 'employesPanel',
                                    layout: {
                                        type: 'border'
                                    },
                                    title: 'Employés',
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            flex: 1,
                                            region: 'east',
                                            split: true,
                                            stateId: 'stateEmployeHoursGrid',
                                            stateful: true,
                                            title: 'Heures',
                                            store: 'employes_hours',
                                            columns: [
                                                {
                                                    xtype: 'datecolumn',
                                                    dataIndex: 'workDate',
                                                    text: 'Date',
                                                    format: 'd-M-Y'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'hours',
                                                    text: 'Heure'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if (record.data.chantierId)
                                                        {
                                                            return Ext.getStore('chantiers').getById(record.data.chantierId).data.name;
                                                        }
                                                        return '';
                                                    },
                                                    dataIndex: 'chantierId',
                                                    text: 'Chantier'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'gridpanel',
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
                                                            text: 'Ajouter'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            itemId: 'editEmploye',
                                                            iconCls: 'icon-user-add',
                                                            text: 'Editer'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    stateId: 'stateSousTraitantsPanel',
                                    stateful: true,
                                    id: 'sousTraitantsPanel',
                                    layout: {
                                        type: 'border'
                                    },
                                    title: 'Sous Traitants',
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            region: 'center',
                                            split: true,
                                            stateId: 'statesousTraitantsGrid',
                                            stateful: true,
                                            id: 'sousTraitantsGrid',
                                            minWidth: 700,
                                            focusOnToFront: false,
                                            store: 'sousTraitants',
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            listConfig: {
                                                                loadingText: 'Searching...',
                                                                emptyText: 'No matching posts found.',
                                                                getInnerTpl: function() {
                                                                                return '{name}';
                                                                            }
                                                            },
                                                            itemId: 'comboSpecialites',
                                                            width: 251,
                                                            fieldLabel: 'Specialite',
                                                            labelWidth: 70,
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
                                                            checkChangeBuffer: 5
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
                                                mode: 'MULTI'
                                            })
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: 'chantiersPanel',
                                    layout: {
                                        type: 'border'
                                    },
                                    title: 'Chantiers',
                                    items: [
                                        {
                                            xtype: 'gridpanel',
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
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            region: 'east',
                                            split: true,
                                            width: 150,
                                            layout: {
                                                align: 'stretch',
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    flex: 1,
                                                    stateId: 'stateChantiersHoursGrid',
                                                    stateful: true,
                                                    title: 'Hours',
                                                    store: 'chantiers_hours',
                                                    columns: [
                                                        {
                                                            xtype: 'datecolumn',
                                                            dataIndex: 'workDate',
                                                            text: 'Date'
                                                        },
                                                        {
                                                            xtype: 'numbercolumn',
                                                            dataIndex: 'hours',
                                                            text: 'Heures'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                var employe =  Ext.getStore('employes').getById(record.data.employeId)
                                                                return (employe.data.prenom + employe.data.nom);
                                                            },
                                                            dataIndex: 'employeId',
                                                            text: 'Employe'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
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
                                },
                                {
                                    xtype: 'panel',
                                    id: 'logHours',
                                    title: 'Entrée des Heures',
                                    tabConfig: {
                                        xtype: 'tab',
                                        id: 'logHours_tabConfig',
                                        itemId: ''
                                    },
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    itemId: 'addHour',
                                                    iconCls: 'icon-add',
                                                    text: 'Ajouter une entrée'
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'editHour',
                                                    iconCls: '',
                                                    text: 'Editer'
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'deleteHour',
                                                    iconCls: 'icon-delete',
                                                    text: 'Effacer'
                                                }
                                            ]
                                        }
                                    ],
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            stateId: 'stateLogHoursGrid',
                                            stateful: true,
                                            id: 'logHoursGrid',
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
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    tools: [
                        {
                            xtype: 'tool',
                            itemId: 'preferences',
                            tooltip: 'Preferences',
                            tooltipType: 'title',
                            type: 'gear'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});