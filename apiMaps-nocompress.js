/* Criado em 13/maio/2018 19:56*/
let modeRouter;
let msgMap = document.querySelector('#msgMap');
let map;
let renderMap;
let directionsService;
let geocodePLace;
let latitude;
let longitude;
let origin;
let destino;

function autocompleteMap(str) {
    let dataList = document.querySelector('#addressSuggest');
    const objGeo = {
        region: 'BR',
        address: str
    }
    geocodePLace.geocode(objGeo, (r, s) => {
        if (s == google.maps.GeocoderStatus.OK) {
            autocompleteMap(r[0]);
            dataList.innerHTML = `<option value="${r[0].formatted_address}">`;
        }
    })
}

function getLatLng(str, callback) {
    const objGeo = {
        region: 'BR',
        address: str
    }
    geocodePLace.geocode(objGeo, (r, s) => {
        if (s == google.maps.GeocoderStatus.OK) {
            latitude = r[0].geometry.location.lat();
            longitude = r[0].geometry.location.lng();
            callback();
        } else {
            msgMap.innerHTML = "Falha ao obter cordenadas para " + str;
        }
    })
}

function initMap() {
    directionsService = new google.maps.DirectionsService();
    renderMap = new google.maps.DirectionsRenderer();
    geocodePLace = new google.maps.Geocoder();

    const latlng = new google.maps.LatLng(-23.5625759, -46.65436510000001);
    const options = {
        zoom: 16,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), options);

    renderMap.setMap(map);
    let marker = new google.maps.Marker({
        position: latlng,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        title: 'WeWork'
    });
}

function renderRoute() {
    const request = {
        origin: origin,
        destination: destino,
        travelMode: google.maps.TravelMode[modeRouter],
        provideRouteAlternatives: true
    }

    directionsService.route(request, (r, s) => {
        if (s == google.maps.DirectionsStatus.OK) {
            renderMap.setDirections(r);
        } else {
            msgMap.innerHTML = 'Não foi possivel criar rota';
        }
    });
}

function trackRouter() {
    modeRouter = document.querySelector('#modeRouter').value;
    if (!document.querySelector('#srcOrigem').value || document.querySelector('#srcOrigem').value == ' ') {
        msgMap.innerHTML = 'Digite o endereço de origem';
    } else {
        getLatLng(document.querySelector('#srcOrigem').value, () => {
            origin = new google.maps.LatLng(latitude, longitude);
        })
    }
    if (!document.querySelector('#srcDestino').value || document.querySelector('#srcDestino').value == ' ') {
        msgMap.innerHTML = 'Digite o endereço de destino';
    } else {
        getLatLng(document.querySelector('#srcDestino').value, () => {
            destino = new google.maps.LatLng(latitude, longitude);
            renderRoute();
        })
    }
}