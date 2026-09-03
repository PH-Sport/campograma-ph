# Cotejo: campograma (150) vs `ph-sport-web/data/jugadores.json` (129)

Generado automáticamente el 2026-09-03 con emparejamiento aproximado por tokens de nombre.
**El emparejamiento tiene falsos positivos** (empareja por nombre de pila cuando no hay más señal).
Esto es un punto de partida para una revisión manual con Eva, no un resultado.

| | |
|---|---|
| Campograma | 150 |
| jugadores.json | 129 (12 ocultos) |
| Sin pareja evidente en la web | 23 |
| En la web sin pareja en el campograma | 27 |
| Emparejados con club distinto | 53 |

---

## A. En el campograma, sin pareja evidente en la web

Altas nuevas, o nombres tan abreviados que no emparejan. Revisar uno a uno.

| Nombre | Año | Club | Demarcación | Categoría |
|---|---|---|---|---|
| A. Córcova | 2008 | Juv. Real Madrid | MC | cantera |
| Abdellah Raihani | 2004 | Muaither | DEL | elite |
| Abdoulaye Keyta | 2002 | AVS | EI | elite |
| Adán Benítez | 2006 | R. Huelva | LI | rfef |
| B. Billups | 2005 | Eldense | MCOD | rfef |
| Billy Gee | 2005 | Zelec. Pancevo | LD | elite |
| Eduard Mohedano | 2004 | LP C | POR | rfef |
| Emanuel Yeboah | 2008 | — | DEL | cantera |
| Eneas | 2008 | Juv. Mérida | MC | cantera |
| F. Tafalla | 2004 | Mallorca B | DFCD | rfef |
| G. Mascali | 2009 | Juv. Torrejón | MC | cantera |
| JL Mejías | 2010 | Juv. Betis | DEL | cantera |
| João Rgues. | 2007 | Sporting Lisb. | MCOI | elite |
| João Vogt | 2009 | Zúrich | DEL | elite |
| Leon Viera | 2010 | Juv. Extremadura | LD | cantera |
| Lámina Ndir | 2007 | Constancia | ED | rfef |
| M. Guilavert | 2005 | Mestalla | MCOI | rfef |
| M. Talavera | 2006 | Portuense | MCOI | rfef |
| Manzanara | 1996 | Alcorcón | MCOI | rfef |
| Pelayo M. | 2010 | Juv. Real Sociedad | DEL | cantera |
| Saúl Glez. | 2011 | Utrera | DEL | cantera |
| Soldevilla | 2001 | Hércules | ED | rfef |
| Youssef | 2006 | Granada C | EI | rfef |

## B. En la web, sin pareja en el campograma

Bajas no reflejadas en el Numbers, o el mismo problema de abreviaturas.

| Nombre | Club | Estado |
|---|---|---|
| Abd. Keita | SD Ponferradina |  |
| Alberto Cordero | CD Tenerife |  |
| Alejandro Anes | CD Guadalajara |  |
| Alejandro Santiago | RCD Espanyol |  |
| Andrés Corcoba | Real Madrid CF |  |
| Axel Montaña | Danubio FC |  |
| Bernt Klavervoer | — | oculto |
| Brayan de la Cruz | Atlético de Madrid |  |
| Carles Garrido | Girona FC | oculto |
| Dani Guty | Girona FC |  |
| David Rosado | Getafe CF |  |
| Hugo Caballero | Ciudad de Lucena |  |
| Jesús Jaime | UD Almería |  |
| Jorge Rajado | Real Madrid CF |  |
| Manuel López | Sevilla FC |  |
| Marc de Pedro | CE Manresa |  |
| Marcos García | — | oculto |
| Mario Guilabert | Valencia CF |  |
| Miguel Díaz de Burgos | Getafe CF |  |
| Oriol Soldevila | Hércules CF |  |
| Paco Esteban | US Lecce | oculto |
| Raúl Ojeda | SD Huesca |  |
| Rebollo | Nástic Tarragona | oculto |
| Sergio Esteban | Atlético de Madrid | oculto |
| Tiago Leal | SC União Torreense |  |
| Vinicius da Conceição | — | oculto |
| Álvaro Gutiérrez | Getafe CF |  |

## C. Emparejados pero con club distinto

En muchos casos **no es un error**: la web guarda dónde juega hoy, el campograma guarda
el club propietario más la cesión. Los que llevan `cedido a` en la última columna
son exactamente ese caso y confirman el patrón.

| Nombre | Campograma | Web | Cesión |
|---|---|---|---|
| Adri Pérez | Conquense | Real Betis Balompié |  |
| Adrián Martín | Getafe B | Real Betis Balompié |  |
| Alberto C. «Tito» | Tenerife B | HNK Hajduk Split |  |
| Alberto Vela | R. Huelva | HNK Hajduk Split |  |
| Andrei Lupu | Portuense | CD Leganés |  |
| Babacar W. | Villarreal | Vitória Guimarães SC |  |
| Carlos Guirao | Leganés | CD Eldense | Eldense |
| Dani Hdez. | Inf. Girona | Levante UD |  |
| Dani Rebollo | AVS | Levante UD |  |
| Dani Requena | Villarreal | Levante UD | Levante |
| David Carreira | Montañeros | CD Estradense |  |
| David Fdez. | Atm. C | CD Estradense |  |
| David Nunes | Académ. Viseu | CD Estradense |  |
| F. Iglesias | Juv. Depor | RC Deportivo de La Coruña |  |
| Hugo Ríos | Depor Fabril | RC Deportivo de La Coruña |  |
| Héctor Peña | RC Portuense | CD Numancia |  |
| Iker Luque | Atm. B | Real Racing Club |  |
| Iker Vidal | Depor Fabril | RC Deportivo de La Coruña |  |
| Izan Muñoz | Atco. Paso | Iraklis de Tesalónica |  |
| J. Florek | Juv. Depor | RC Deportivo de La Coruña |  |
| Javi Benítez | Juv. Algeciras | Cerezo Osaka |  |
| Javi Hdez. | Leganés | Cerezo Osaka |  |
| Jesús | Juv. Almería | Racing Club de Ferrol |  |
| Jordi Ortega | Olot | CE Sabadell FC |  |
| Jorge Franco | Zaragoza B | Cultural Leonesa |  |
| José Rey | Depor Fabril | RC Deportivo de La Coruña |  |
| Juan Cruz | Leganés | Málaga CF | Málaga |
| Juan Lapasta | Boston River | Málaga CF |  |
| Lawson S. | Sin equipo | FC Dordrecht |  |
| Liam Fdez. | Juv. Sporting | Albacete Balompié |  |
| Lucas Macazaga | Leganés B | SD Ponferradina | Ponferradina |
| Lucas Palma | Juv. Cádiz | SD Ponferradina |  |
| M. de Pedro | Manresa | Wolverhampton Wanderers |  |
| Manu López | Cad. Sevilla | Málaga CF |  |
| Marcos Ortega | Zaragoza | CE Sabadell FC |  |
| Mateo Scianc. | Ilicitano | Elche CF |  |
| Mauro Valeiro | Depor Fabril | RC Deportivo de La Coruña |  |
| Miguel | Juv. Getafe | Atlético de Madrid |  |
| Ojgen Teofilovic | Lugo | SD Compostela | Compostela |
| Rayan Zinebi | Granada | Real Madrid CF | Real Madrid |
| Raúl Picazo | Juv. Albacete | Antequera CF |  |
| Santi Pallarés | LP C | UD Las Palmas |  |
| Sebastián Vidal | Río Ave | RC Deportivo de La Coruña |  |
| T. Helguera | Braga | Atlético de Madrid | Atm. B |
| Thiago Leal | Torreense | Atlético de Madrid |  |
| Tomás Méndez | Juv. Sevilla | SC União Torreense |  |
| Víc. Santiago | Cad. Barcelona | EF Gavà |  |
| Víctor Villote | Las Palmas | Gimnàstic de Tarragona |  |
| Álex Domínguez | Ponferradina | CE Sabadell FC |  |
| Álvaro Caso | Huesca | AD Alcorcón |  |
| Álvaro Guti | Juv. Getafe | AD Alcorcón |  |
| Ángel Rguez. | Extremadura | Atlético La Paz |  |
| Óscar López | Getafe B | Málaga CF |  |

---

## Qué hacer con esto

1. Repasar A y B con Eva y decidir alta, baja o mismo jugador con otro nombre.
2. En C, separar el modelo en dos campos (`clubPropietario` y `clubActual`) en vez de elegir uno.
3. Fijar el nombre canónico de cada jugador: el de la web (completo, oficial) manda.
4. Solo entonces fusionar.
