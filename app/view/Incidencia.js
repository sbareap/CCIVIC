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
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'fieldset',
                itemId: 'descIncid',
                layout: {
                    type: 'fit'
                },
                items: [
                    {
                        xtype: 'list',
                        id: 'incidList',
                        itemId: 'IncidList',
                        ui: 'round',
                        itemTpl: [
                            '<div><p>{CodiCamp}&nbsp;{Req}</p><p><small>{ValorCamp}</small>{ValorImg}</p></div>'
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
            },
            {
                xtype: 'hiddenfield',
                itemId: 'temaHidden'
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
                Ext.Msg.show({
                    title: record.get('CodiCamp')+':',           
                    buttons:  [{text : 'Cancel·lar'}, {text : 'Acceptar'}],           
                    prompt : {xtype : 'textareafield',
                        id : 'textObs',            
                        clearIcon : true
                    },
                    fn: function(btn,value) {                        
                        if (btn == 'Acceptar'){                                             
                            record.set('ValorCamp', value);         
                        }              
                    }
                });        

                var textObs = record.get('ValorCamp').toString();                   
                Ext.ComponentQuery.query('#textObs')[0].setValue(textObs);        
            }          
        }

        if (record.get('IdCamp') == 'RISC'){        
            Ext.Msg.show({
                title: 'Comporta un risc pel ciutadà?',           
                buttons:  [{text : 'No'}, {text : 'Si'}],                      
                fn: function(btn) {                        
                    record.set('ValorCamp', btn);               
                }
            });
        }

        if (record.get('IdCamp') == 'LOC'){        
            var Panel = Ext.create('CCIVIC.view.Localitzacio',{title:'Localització', fullscreen: true});
            this.getParent().push(Panel);
        }

        if (record.get('IdCamp') == 'FOTO'){        
            var Panelf = Ext.create('CCIVIC.view.Foto',{title:'Fotografia', fullscreen: true});
            this.getParent().push(Panelf);    
        }

        dataview.refresh();
        store.sync();
    },

    onBtnEnviarTap: function(button, e, options) {
        var ListStore = Ext.data.StoreManager.lookup('IncidStore'),    
        storeJSONIncid = Ext.data.StoreManager.lookup('IncidJSONStore'),
        storeDades = Ext.data.StoreManager.lookup('PrefStore'),
        correcte = 1, vNom, vCognom, vNif, vEmail, vTelefon, vAdreca, 
        vLat, vLng, vObserva, vRisc, vFoto, vTipus, 
        vData = new Date();

        for(var j = 0; j < ListStore.getCount(); j++) {   
            if (ListStore.getAt(j).get('IdCamp') == 'LOC') {
                vAdreca = ListStore.getAt(j).get('ValorCamp');
                vLat = ListStore.getAt(j).get('ValorCamp1');
                vLng = ListStore.getAt(j).get('ValorCamp2');
            }
            if (ListStore.getAt(j).get('IdCamp') == 'OBS') vObserva = ListStore.getAt(j).get('ValorCamp');
            if (ListStore.getAt(j).get('IdCamp') == 'RISC') vRisc = ListStore.getAt(j).get('ValorCamp');
            if (ListStore.getAt(j).get('IdCamp') == 'FOTO') vFoto = ListStore.getAt(j).get('ValorCamp1');

            if ((ListStore.getAt(j).get('Req') == '*') && (ListStore.getAt(j).get('ValorCamp').length === 0)){                
                Ext.Msg.show({ title: 'Error:',
                    message: 'Falta introduir dades requerides.',
                    buttons:  [{text : 'Acceptar'}]});
                    correcte = 0;
                }
            }

            if (correcte == 1) {    
                // generar registro per enviar a l'Ajuntament.
                for(var i = 0; i < storeDades.getCount(); i++) {   
                    if (storeDades.getAt(i).get('IdPref') == 'NOM') vNom = storeDades.getAt(i).get('ValorPref');                  
                    if (storeDades.getAt(i).get('IdPref') == 'COGNOM') vCognom = storeDades.getAt(i).get('ValorPref');              
                    if (storeDades.getAt(i).get('IdPref') == 'NUMDOC') vNif = storeDades.getAt(i).get('ValorPref');
                    if (storeDades.getAt(i).get('IdPref') == 'EMAIL') vEmail = storeDades.getAt(i).get('ValorPref');        
                    if (storeDades.getAt(i).get('IdPref') == 'TEL') vTelefon = storeDades.getAt(i).get('ValorPref');              
                }                 

                storeJSONIncid.add(
                {nom: vNom, 
                    cognoms: vCognom, 
                    nif: vNif, 
                    email: vEmail,
                    telefon: vTelefon,
                    inc_Adreca: vAdreca, 
                    inc_Lat: vLat,
                    inc_Lng: vLng,
                    inc_Observacions: vObserva,
                    inc_Risc: vRisc,
                    inc_Foto: vFoto,
                    inc_Tipus: Ext.ComponentQuery.query('#temaHidden')[0].getValue(),
                inc_Data: vData.toUTCString()});

                storeJSONIncid.sync();   

                // borrar pantalla d'entrada de dades de la incidencia
                for(var i = 0; i < ListStore.getCount(); i++) {   
                    ListStore.getAt(i).set('ValorCamp','');
                    ListStore.getAt(i).set('ValorCamp1','');        
                    ListStore.getAt(i).set('ValorCamp2','');                      
                    ListStore.getAt(i).set('ValorImg','');                      
                }   

                ListStore.sync();

                Ext.Msg.show({ title: 'Avís:',
                    message: 'Dades enviades correctament.',
                    buttons:  [{text : 'Acceptar'}]});
                    this.getParent().pop();
                }
    }

});