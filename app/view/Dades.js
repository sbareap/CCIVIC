/*
 * File: app/view/Dades.js
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

Ext.define('CCIVIC.view.Dades', {
    extend: 'Ext.Panel',

    config: {
        modal: false,
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                itemId: 'dadesBar',
                title: 'Dades Personals'
            },
            {
                xtype: 'list',
                height: 370,
                id: 'prefList',
                itemId: 'PrefList',
                ui: 'round',
                itemTpl: [
                    '<p>{CodiPref}&nbsp;{Req}</p><p><small>{ValorPref}</small></p>'
                ],
                store: 'PrefStore',
                onItemDisclosure: true
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                itemId: 'dadesBar',
                items: [
                    {
                        xtype: 'button',
                        id: 'btnGravar',
                        itemId: 'BtnGravar',
                        ui: 'round',
                        width: 70,
                        text: 'Gravar'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onPrefListItemTap',
                event: 'itemtap',
                delegate: '#prefList'
            },
            {
                fn: 'onBtnGrabarTap',
                event: 'tap',
                delegate: '#btnGravar'
            }
        ]
    },

    onPrefListItemTap: function(dataview, index, target, record, e, options) {
        Ext.Msg.prompt('Dades personals', record.get('CodiPref')+':', function(btn,text) {    
            if (btn == 'ok'){      
                // Validació del mail
                if (record.get('IdPref') == 'EMAIL'){
                    console.log('Estoy en email');
                    if (valEmail(text)){
                        record.set('ValorPref', text);
                    }
                    else{
                        Ext.Msg.alert('Avís:', 'Adreça electrònica incorrecta. Torna a introduir-la.');
                    }
                } 
                // Validació del NIF o NIE
                else if (record.get('IdPref') == 'NUMDOC'){
                    console.log('Estoy en numdoc');
                    var res = valNumDoc(text);
                    if (res == 1 || res == 2){
                        record.set('ValorPref', text);
                    }
                    else{
                        Ext.Msg.alert('Avís:', 'Número de document incorrecte. Torna a introduir-lo.');
                    }
                }
                // Validació del mòvil
                else if (record.get('IdPref') == 'TEL'){
                    console.log('Estoy en TEL');
                    if (valMovil(text)){
                        record.set('ValorPref', text);
                    }
                    else{
                        Ext.Msg.alert('Avís: ', 'Mòvil incorrecta. Torna a introduir-lo.');
                    }
                }
                else record.set('ValorPref', text);
            }       
        });

        function valEmail(valor){
            re = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
            if(!re.exec(valor))    {
                return false;
            }else{
                return true;
            }
        }

        //Retorna: 1 = NIF ok, 2 = NIE ok, -1 = NIF error, -2 = NIE error, 0 = formato invalido
        //fuente: http://compartecodigo.com/javascript/validar-nif-cif-nie-segun-ley-vigente-31.html
        function valNumDoc(a) 
        {
            var temp=a.toUpperCase();
            var cadenadni="TRWAGMYFPDXBNJZSQVHLCKE";

            if (temp!==''){
                //si no tiene un formato valido devuelve error
                if ((!/^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$/.test(temp) && !/^[T]{1}[A-Z0-9]{8}$/.test(temp)) && !/^[0-9]{8}[A-Z]{1}$/.test(temp))
                {
                    return 0;
                }

                //comprobacion de NIFs estandar
                if (/^[0-9]{8}[A-Z]{1}$/.test(temp))
                {
                    posicion = a.substring(8,0) % 23;
                    letra = cadenadni.charAt(posicion);
                    var letradni=temp.charAt(8);
                    if (letra == letradni)
                    {
                        return 1;
                    }
                    else
                    {
                        return -1;
                    }
                }

                //comprobacion de NIFs especiales (se calculan como CIFs)
                if (/^[KLM]{1}/.test(temp))
                {
                    if (a[8] == String.fromCharCode(64 + n))
                    {
                        return 1;
                    }
                    else
                    {
                        return -1;
                    }
                }


                //comprobacion de NIEs
                //T
                if (/^[T]{1}/.test(temp))
                {
                    if (a[8] == /^[T]{1}[A-Z0-9]{8}$/.test(temp))
                    {
                        return 2;
                    }
                    else
                    {
                        return -2;
                    }
                }

                //XYZ
                if (/^[XYZ]{1}/.test(temp))
                {
                    pos = str_replace(['X', 'Y', 'Z'], ['0','1','2'], temp).substring(0, 8) % 23;
                    if (a[8] == cadenadni.substring(pos, pos + 1))
                    {
                        return 2;
                    }
                    else
                    {
                        return -2;
                    }
                }
            }

            return 0;
        }

        //fuente: https://raw.github.com/kvz/phpjs/master/functions/strings/str_replace.js
        function str_replace (search, replace, subject, count) {
            var i = 0,
            j = 0,
            temp = '',
            repl = '',
            sl = 0,
            fl = 0,
            f = [].concat(search),
            r = [].concat(replace),
            s = subject,
            ra = Object.prototype.toString.call(r) === '[object Array]',
            sa = Object.prototype.toString.call(s) === '[object Array]';
            s = [].concat(s);
            if (count) {
                this.window[count] = 0;
            }

            for (i = 0, sl = s.length; i < sl; i++) {
                if (s[i] === '') {
                    continue;
                }
                for (j = 0, fl = f.length; j < fl; j++) {
                    temp = s[i] + '';
                    repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
                    s[i] = (temp).split(f[j]).join(repl);
                    if (count && s[i] !== temp) {
                        this.window[count] += (temp.length - s[i].length) / f[j].length;
                    }
                }
            }
            return sa ? s : s[0];
        }

        function valMovil(valor) {
            re=/^\d{9}$/
            if(!re.exec(valor))    {
                return false;
            }else{
                return true;
            }    
        }
    },

    onBtnGrabarTap: function(button, e, options) {
        var store = Ext.data.StoreManager.lookup('PrefStore'),
        list = Ext.getCmp('prefList'),
        correcte = 1,
        ListStore = list.getStore();

        for(var i = 0; i < ListStore.getCount(); i++) {   
            if ((ListStore.getAt(i).get('Req') == '*') && (ListStore.getAt(i).get('ValorPref').length === 0)){        
                Ext.Msg.alert('Error:', 'Falta introduir dades requerides.');       
                correcte = 0;
            }
        }

        if (correcte == 1) {
            store.sync();
            Ext.Msg.alert('Avís:', 'Dades gravades correctament.');
            this.getParent().pop();
        }
    }

});