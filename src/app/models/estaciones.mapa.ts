export const iconos:{
    iconAzul:any,
    iconRojo:any,
    iconGris:any
} = {
	iconAzul: { url: 'assets/A.png', scaledSize: { width: 25, height: 25 } },
	iconRojo: { url: 'assets/R.png', scaledSize: { width: 25, height: 25 } },
	iconGris: { url: 'assets/G.png', scaledSize: { width: 25, height: 25 } }
}

export const ubicacioneEstaciones: { pos: google.maps.LatLngLiteral, opt: google.maps.MarkerOptions }[] = [
    { pos: { lat: -29.9988307, lng: -70.587333 }, opt: { icon: iconos.iconAzul, title: 'Algarrobal' } },
    { pos: { lat: -29.998736, lng: -71.39852 }, opt: { icon: iconos.iconAzul, title: 'Coquimbo [El Panul]' } },
    { pos: { lat: -30.405266, lng: -70.279483 }, opt: { icon: iconos.iconAzul, title: 'El Jote' } },
    { pos: { lat: -30.1583, lng: -69.908179 }, opt: { icon: iconos.iconAzul, title: 'El Tapado' } },
    { pos: { lat: -30.38407, lng: -70.412858 }, opt: { icon: iconos.iconAzul, title: 'Estero Derecho' } },
    { pos: { lat: -29.97852, lng: -71.080386 }, opt: { icon: iconos.iconAzul, title: 'Gabriela Mistral' } },
    { pos: { lat: -30.203112, lng: -70.037224 }, opt: { icon: iconos.iconAzul, title: 'La Laguna [Elqui]' } },
    { pos: { lat: -29.915015, lng: -71.242214 }, opt: { icon: iconos.iconAzul, title: 'La Serena [CEAZA]' } },
    { pos: { lat: -29.938475, lng: -71.223505 }, opt: { icon: iconos.iconAzul, title: 'La Serena [Cerro Grande]' } },
    { pos: { lat: -29.754064, lng: -71.257442 }, opt: { icon: iconos.iconAzul, title: 'La Serena [El Romeral]' } },
    { pos: { lat: -30.251452, lng: -71.256903 }, opt: { icon: iconos.iconAzul, title: 'Las Cardas' } },
    { pos: { lat: -30.257406, lng: -69.936986 }, opt: { title: 'Llano de Las Liebres', icon: iconos.iconAzul } },
    { pos: { lat: -29.827418, lng: -70.354471 }, opt: { title: 'Llanos de Huanta', icon: iconos.iconAzul } },
    { pos: { lat: -30.161408, lng: -69.875994 }, opt: { title: 'Los Corrales', icon: iconos.iconAzul } },
    { pos: { lat: -30.074646, lng: -71.238945 }, opt: { title: 'Pan de Azucar', icon: iconos.iconAzul } },
    { pos: { lat: -30.190704, lng: -69.82553 }, opt: { title: 'Paso Agua Negra', icon: iconos.iconAzul } },
    { pos: { lat: -30.129028, lng: -70.494712 }, opt: { title: 'Pisco Elqui', icon: iconos.iconAzul } },
    { pos: { lat: -29.3541129, lng: -71.0328595 }, opt: { title: 'Punta Colorada', icon: iconos.iconAzul } },
    { pos: { lat: -29.24724, lng: -71.467969 }, opt: { title: 'Punta de Choros', icon: iconos.iconAzul } },
    { pos: { lat: -29.96173, lng: -70.539081 }, opt: { title: 'Rivadavia', icon: iconos.iconAzul } },
    { pos: { lat: -29.96663, lng: -71.352844 }, opt: { title: 'UCN Guayacan', icon: iconos.iconAzul } },
    { pos: { lat: -30.038318, lng: -70.696553 }, opt: { title: 'Vicuna', icon: iconos.iconAzul } }
]