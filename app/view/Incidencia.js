/*
 * File: app/view/Incidencia.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('CCIVIC.view.Incidencia', {
    extend: 'Ext.Panel',

    config: {
        items: [
            {
                xtype: 'fieldset',
                itemId: 'descIncid',
                items: [
                    {
                        xtype: 'list',
                        height: 400,
                        id: 'incidList',
                        itemId: 'IncidList',
                        ui: 'round',
                        itemTpl: [
                            '<p>{CodiCamp}&nbsp;{Req}</p><p><small>{ValorCamp}</small></p>'
                        ],
                        store: 'IncidStore',
                        onItemDisclosure: true
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                itemId: 'IncidBar',
                items: [
                    {
                        xtype: 'button',
                        id: 'btnEnviar',
                        itemId: 'BtnEnviar',
                        ui: 'round',
                        text: 'Enviar'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onIncidListItemTap',
                event: 'itemtap',
                delegate: '#incidList'
            },
            {
                fn: 'onBtnEnviarTap',
                event: 'tap',
                delegate: '#btnEnviar'
            }
        ]
    },

    onIncidListItemTap: function(dataview, index, target, record, e, options) {
        var textObsCmp = Ext.getCmp('textObs');
        var textSiNo;
        var store = Ext.data.StoreManager.lookup('IncidStore');

        if (textObsCmp){
            Ext.getCmp('textObs').destroy();
        }
        else{
            if (record.get('IdCamp') == 'OBS'){ 
                Ext.Msg.prompt('Dades incidencia', 
                record.get('CodiCamp')+':', 
                function(btn,text) {    
                    if (btn == 'ok'){                                             
                        record.set('ValorCamp', text);         
                    } 
                },
                this,
                true,
                null,
                {xtype : 'textareafield',
                    id : 'textObs',
                    height: 350,
                    clearIcon : false
                });

                //Ext.getCmp('textObs').focus();

                var textObs = record.get('ValorCamp').toString();                   
                Ext.ComponentQuery.query('#textObs')[0].setValue(textObs);        
            }
        }

        if (record.get('IdCamp') == 'RISC'){
            Ext.Msg.confirm(null,'Comporta un risc pel ciutadà?', function(btn) {                                    
                if (btn == 'yes'){
                    textSiNo = 'Si';
                }
                else {
                    textSiNo = 'No';
                }
                record.set('ValorCamp', textSiNo);               
            }); 
        }

        if (record.get('IdCamp') == 'LOC'){        
            var Panel = Ext.create('CCIVIC.view.Localitzacio',{title:'Localització', fullscreen: true});
            this.getParent().push(Panel);
        }

        if (record.get('IdCamp') == 'FOTO'){        
            var Panel = Ext.create('CCIVIC.view.Foto',{title:'Fotografia', fullscreen: true});
            this.getParent().push(Panel);    
        }

        console.log(dataview.getId());
        dataview.refresh();
    },

    onBtnEnviarTap: function(button, e, options) {
        console.log('Inici');
        var store = Ext.data.StoreManager.lookup('IncidStore'),
        //JSONStore = Ext.data.StoreManager.lookup('IncidJsonStore'),
        list = Ext.getCmp('incidList'),
        correcte = 1,
        ListStore = list.getStore();

        //console.log('Creo record');
        //var rIncid = Ext.data.Record.create(['nom', 'cognoms', 'nif', 'email','telefon','inc_Adreca', 'inc_Lat', 'inc_Lng', 'inc_Obsercacions', 'inc_Risc', 'inc_Foto', 'inc_Tipus']);
        //console.log('Creo record');

        for(var i = 0; i < ListStore.getCount(); i++) {   
            if ((ListStore.getAt(i).get('Req') == '*') && (ListStore.getAt(i).get('ValorCamp').length === 0)){        
                Ext.Msg.alert('Error:', 'Falta introduir dades requerides.');       
                correcte = 0;
            }
        }

        /*console.log('inserto record');
        var nr = new rIncid({
        nom: 'Silvia',
        cognoms: 'Barea',
        nif: '52624910j',
        email: 'sbarea@uoc.edu',
        telefon: '',
        inc_Adreca: '',
        inc_Lat: '',
        inc_Lng: '',
        inc_Observacions: '',
        inc_Risc: '',
        inc_Foto: '',
        inc_Tipus: ''
        });*/

        if (correcte == 1) {
            //JSONStore.add(nr);
            //JSONStore.save();
            //es graven les dades a local
            store.sync();
            Ext.Msg.alert('Avís:', 'Dades gravades correctament.');
            this.getParent().pop();
        }
    }

});