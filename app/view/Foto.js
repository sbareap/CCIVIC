/*
 * File: app/view/Foto.js
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

Ext.define('CCIVIC.view.Foto', {
    extend: 'Ext.Panel',

    config: {
        ui: '',
        layout: {
            type: 'vbox'
        },
        items: [
            {
                xtype: 'container',
                itemId: 'FotoContainer',
                items: [
                    {
                        xtype: 'image',
                        centered: true,
                        height: 201,
                        itemId: 'imgFoto',
                        width: 201
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                itemId: 'fotoBar',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'btnOk',
                        ui: 'round',
                        iconMask: true,
                        text: 'Acceptar'
                    },
                    {
                        xtype: 'button',
                        itemId: 'btnCapturar',
                        ui: 'round',
                        text: 'Capturar'
                    },
                    {
                        xtype: 'button',
                        itemId: 'btnSeleccionar',
                        ui: 'round',
                        text: 'Seleccionar'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onBtnOkTap',
                event: 'tap',
                delegate: '#btnOk'
            },
            {
                fn: 'onBtnCapturarTap',
                event: 'tap',
                delegate: '#btnCapturar'
            },
            {
                fn: 'onBtnSeleccionarTap',
                event: 'tap',
                delegate: '#btnSeleccionar'
            },
            {
                fn: 'onPanelShow',
                event: 'show'
            }
        ]
    },

    onBtnOkTap: function(button, e, options) {
        var foto = Ext.ComponentQuery.query('#imgFoto')[0].getSrc();

        //Gravar la foto a listIncid
        var store = Ext.data.StoreManager.lookup('IncidStore'),
        list = Ext.getCmp('incidList');

        ListStore = list.getStore();

        for(var i = 0; i < ListStore.getCount(); i++) {   
            if (ListStore.getAt(i).get('IdCamp') === 'FOTO'){        
                ListStore.getAt(i).set('ValorCamp', foto);          
            }
        }



        list.refresh();
        this.getParent().pop();



    },

    onBtnCapturarTap: function(button, e, options) {
        var storeImage = Ext.data.StoreManager.lookup('Image');

        Ext.device.Camera.capture({
            success: function(img){        
                if (storeImage.getCount() === 0){
                    storeImage.add({src:img});              
                }
                else{
                    storeImage.getAt(0).set('src', img);
                }        
                Ext.ComponentQuery.query('#imgFoto')[0].setSrc(img);

            },
            scope: this,
            source: 'camera',
            destination: 'file'
        });

        storeImage.sync();
    },

    onBtnSeleccionarTap: function(button, e, options) {
        var storeImage = Ext.data.StoreManager.lookup('Image');

        Ext.device.Camera.capture({
            success: function(img){        
                if (storeImage.getCount() === 0){
                    storeImage.add({src:img});              
                }
                else{
                    storeImage.getAt(0).set('src', img);
                }        
                Ext.ComponentQuery.query('#imgFoto')[0].setSrc(img);

            },
            scope: this,
            source: 'library',
            destination: 'file'
        });

        storeImage.sync();
    },

    onPanelShow: function(component, options) {
        var storeImage = Ext.data.StoreManager.lookup('Image');

        if (storeImage.getCount() > 0){
            var uri = storeImage.getAt(0).get('src');
            Ext.ComponentQuery.query('#imgFoto')[0].setSrc(uri);    
        }

    }

});