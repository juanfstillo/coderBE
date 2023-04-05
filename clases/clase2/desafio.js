class ticketManager {
    constructor(){
        this.eventos = [] ;
        this.precioBasedeGanancia = 10;
    }

    getEventos(){
        console.log(this.eventos)
    }

    agregarEvento(nombre,lugar,precio,capacidad=50, fecha= new Date()){

        const id = this.eventos.length +1;
        const evento = {
            id,
            nombre,
            lugar,
            precio: precio * 1.15 + this.precioBasedeGanancia,
            capacidad,
            fecha,
            participantes:[]
        }

        this.eventos.push(evento);

        console.log(`Evento ${nombre} agregado con éxito`)
        }
        
        agregarUsuario(eventoId,usuarioId){
            const evento = this.eventos.find(e => e.id === eventoId);

            if(!evento){
                console.log(`Evento con id ${eventoId} no existe`);
                return
            }
            if(evento.participantes.includes(usuarioId)){
                console.log(`Usuario con id ${usuarioId} ya está registrado en el evento`)
            }

            else {
                evento.participantes.push(usuarioId)
    
                console.log(`Usuario con id ${usuarioId} agregado con éxito al evento ${evento.nombre}`);
    
            }
        }

        ponerEventoEnGira(eventoId,nuevaLocalidad, nuevaFecha){
            const evento = this.eventos.find(e => e.id === eventoId);
            if(!evento){
                console.log(`Evento con id ${eventoId} no existe`);
                return;
            }
            const nuevoId = this.eventos.length++;

            const nuevoEvento = {
                id:nuevoId,
                nombre: evento.nombre,
                lugar: nuevaLocalidad,
                precio: evento.precio,
                capacidad: evento.capacidad,
                fecha:nuevaFecha,
                participantes:[]
            }

            this.eventos.push(nuevoEvento);

            console.log(`Evento ${evento.nombre} puesto en gira con éxito`);

        }
    }

    //Ejemplo de uso

    const ticketManager1 = new ticketManager();
    ticketManager1.agregarEvento("Concierto1","Teatro A", 500,100);
    ticketManager1.getEventos();
    ticketManager1.agregarUsuario(1,"user1");
    ticketManager1.ponerEventoEnGira(1,"Parque Roca");
    ticketManager1.getEventos();
