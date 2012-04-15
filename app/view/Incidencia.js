/*
 * File: app/view/Incidencia.js
 *
 * This file was generated by Sencha Designer version 2.0.0.
 * http://www.sencha.com/products/designer/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Designer does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('CCIVIC.view.Incidencia', {
    extend: 'Ext.tab.Panel',

    config: {
        tabBar: {
            docked: 'top'
        },
        items: [
            {
                xtype: 'formpanel',
                itemId: 'tabIncidencia',
                title: 'Incidencia',
                items: [
                    {
                        xtype: 'fieldset',
                        id: 'descIncid',
                        itemId: 'descIncid',
                        items: [
                            {
                                xtype: 'textfield',
                                itemId: 'adrecaMap',
                                label: 'Adreça',
                                labelAlign: 'top'
                            },
                            {
                                xtype: 'textareafield',
                                itemId: 'observacions',
                                label: 'Observacions',
                                labelAlign: 'top'
                            },
                            {
                                xtype: 'togglefield',
                                label: 'Comporta un risc?',
                                labelWidth: 160,
                                name: 'risc'
                            },
                            {
                                xtype: 'button',
                                id: 'btnEnviar',
                                itemId: 'BtnEnviar',
                                ui: 'round',
                                text: 'Enviar'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                id: 'tabLocalitzacio',
                itemId: 'tabLocalitzacio',
                title: 'Localització',
                items: [
                    {
                        xtype: 'map',
                        height: 400,
                        id: 'map',
                        itemId: 'Map'
                    },
                    {
                        xtype: 'label',
                        itemId: 'adreca',
                        padding: 12
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onTabLocalitzacioShow',
                event: 'show',
                delegate: '#tabLocalitzacio'
            }
        ]
    },

    onTabLocalitzacioShow: function(component, options) {
        var initialLocation;
        var cornella = new google.maps.LatLng(41.35, 2.08333);
        var browserSupportFlag;
        var map;
        var infowindow = new google.maps.InfoWindow();

        var myOptions = {
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map"), myOptions);

        // Variables globales
        var map, geocoder;

        // Instancia del geocodificador
        geocoder = new google.maps.Geocoder();

        // Try W3C Geolocation method (Preferred)
        if(navigator.geolocation) {
            browserSupportFlag = true;
            navigator.geolocation.getCurrentPosition(function(position) {
                initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                //contentString = "Estamos aqui";
                map.setCenter(initialLocation);

                var marker = new google.maps.Marker({map: map, 
                    position: map.getCenter(),
                    draggable: true
                });

                processReverseGeocoding(map.getCenter(), showMarkerInfo);

                google.maps.event.addListener(marker, 'mouseup', function(event) {
                    //infowindow.open(map, marker);     
                    processReverseGeocoding(event.latLng, showMarkerInfo);
                    console.log('evento');

                });      

                //infowindow.setContent(contentString);        
                infowindow.setPosition(initialLocation);
                infowindow.open(map);
            }, function() {
                handleNoGeolocation(browserSupportFlag);
            });
        } else {
            // El navegador no soporta la Geolocalización
            browserSupportFlag = false;
            handleNoGeolocation(browserSupportFlag);
        }

        function handleNoGeolocation(errorFlag) {
            if (errorFlag === true) {
                initialLocation = cornella;
                contentString = "Error: El servicio de geolocalización ha fallado.";
            } else {
                initialLocation = cornella;
                contentString = "Error: Tu navegador no soporta la geolocalización. Estas en Cornellà?";
            }
            map.setCenter(initialLocation);    
            infowindow.setContent(contentString);
            infowindow.setPosition(initialLocation);
            infowindow.open(map);
        }

        function processReverseGeocoding(location, callback)
        {
            // Propiedades de la georreferenciación

            var request = {
                latLng: location
            };

            // Invocación a la georreferenciación (proceso asíncrono)

            geocoder.geocode(request, function(results, status) {

                /*
                * OK
                * ZERO_RESULTS
                * OVER_QUERY_LIMIT
                * REQUEST_DENIED
                * INVALID_REQUEST 
                */

                // Notifica al usuario el resultado obtenido

                //document.getElementById('message').innerHTML = "Respuesta obtenida: " + status;

                // En caso de terminarse exitosamente el proyecto ...

                if(status == google.maps.GeocoderStatus.OK)
                {
                    // Invoca la función de callback

                    callback (results);            
                    // Retorna los resultados obtenidos

                    return results;
                }

                // En caso de error retorna el estado        
                return status;
            });
        }

        function showMarkerInfo(locations)
        {
            // Centra el mapa en la ubicación especificada
            map.setCenter(locations[0].geometry.location);

            Ext.ComponentQuery.query('#adreca')[0].setHtml(locations[0].formatted_address);
            Ext.ComponentQuery.query('#adrecaMap')[0].setValue(locations[0].formatted_address);

            // Crea el mensaje para mostrar la información georreferenciada
            /*    var infoWindow = new google.maps.InfoWindow();
            infoWindow.setPosition(locations[0].geometry.location);

            // Prepara el mensaje con la información obtenida del proceso
            // de georreferenciación inversa
            var content = 'Latitud:  ' + locations[0].geometry.location.lat() + '<br />' +
            'Longitud:  ' + locations[0].geometry.location.lng() + '<br />' +
            '<br />Topónimos:<br /><ul>';

            for (var i=0; i<locations.length; i++)
            {
                if (locations[i].formatted_address)
                content += '<li>' + locations[i].formatted_address + '</li>';
                else
                content += '<li>No se encontró información.</li>';
            }

            content += "</ul>";
            infoWindow.setContent(content);
            // Muestra el mensaje sobre el mapa
            infoWindow.open(map);    */

        }
    }

});