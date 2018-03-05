export class Init {
    load() {
        if (localStorage.getItem('markers') == null || localStorage.getItem('markers') == undefined) {
            console.log('No se ecnontraron marcadores...');

            var markers = [
                {
                    Nombre: "Soda Nantia",
                    Lat: -34.4493549,
                    Long: -56.4004827,
                    Movil: true
                },
                {
                    Nombre: "Hotel Oriental",
                    Lat: -34.4500677,
                    Long: -56.3986372,
                    Movil: true
                },
                {
                    Nombre: "Hotel Oriente",
                    Lat: -34.45781,
                    Long: -56.3927696,
                    Movil: true
                },
            ];

            localStorage.setItem('markers', JSON.stringify(markers));
        } else {
            console.log('Cargando Marcadores...');
        }
    }
}