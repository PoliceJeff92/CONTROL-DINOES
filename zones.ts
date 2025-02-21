import { Zone } from '../types';

export const zones: Zone[] = [
  {
    id: 'z1',
    name: 'Zona 1 - Norte',
    subzones: [
      {
        id: 'z1s1',
        name: 'Subzona Carchi',
        districts: [
          {
            id: 'z1s1d1',
            name: 'Tulcán',
            code: '04D01',
            circuits: []
          },
          {
            id: 'z1s1d2',
            name: 'San Pedro de Huaca-Tulcán',
            code: '04D02',
            circuits: []
          }
        ]
      },
      {
        id: 'z1s2',
        name: 'Subzona Esmeraldas',
        districts: [
          {
            id: 'z1s2d1',
            name: 'Esmeraldas',
            code: '08D01',
            circuits: []
          },
          {
            id: 'z1s2d2',
            name: 'Eloy Alfaro-San Lorenzo',
            code: '08D02',
            circuits: []
          },
          {
            id: 'z1s2d3',
            name: 'Muisne-Atacames',
            code: '08D03',
            circuits: []
          },
          {
            id: 'z1s2d4',
            name: 'Quinindé',
            code: '08D04',
            circuits: []
          },
          {
            id: 'z1s2d5',
            name: 'Río Verde',
            code: '08D05',
            circuits: []
          }
        ]
      },
      {
        id: 'z1s3',
        name: 'Subzona Imbabura',
        districts: [
          {
            id: 'z1s3d1',
            name: 'Ibarra-Pimampiro-San Miguel de Urcuquí',
            code: '10D01',
            circuits: []
          },
          {
            id: 'z1s3d2',
            name: 'Antonio Ante-Otavalo',
            code: '10D02',
            circuits: []
          },
          {
            id: 'z1s3d3',
            name: 'Cotacachi',
            code: '10D03',
            circuits: []
          }
        ]
      },
      {
        id: 'z1s4',
        name: 'Subzona Sucumbíos',
        districts: [
          {
            id: 'z1s4d1',
            name: 'Lago Agrio',
            code: '21D01',
            circuits: []
          },
          {
            id: 'z1s4d2',
            name: 'Gonzalo Pizarro-Sucumbíos',
            code: '21D02',
            circuits: []
          },
          {
            id: 'z1s4d3',
            name: 'Putumayo-Cuyabeno',
            code: '21D03',
            circuits: []
          },
          {
            id: 'z1s4d4',
            name: 'Shushufindi',
            code: '21D04',
            circuits: []
          }
        ]
      }
    ]
  },
  {
    id: 'z2',
    name: 'Zona 2 - Centro Norte',
    subzones: [
      {
        id: 'z2s1',
        name: 'Subzona Napo',
        districts: [
          {
            id: 'z2s1d1',
            name: 'Tena',
            code: '15D01',
            circuits: []
          },
          {
            id: 'z2s1d2',
            name: 'Archidona-Carlos Julio Arosemena Tola',
            code: '15D02',
            circuits: []
          }
        ]
      },
      {
        id: 'z2s2',
        name: 'Subzona Orellana',
        districts: [
          {
            id: 'z2s2d1',
            name: 'Orellana-Loreto',
            code: '22D01',
            circuits: []
          },
          {
            id: 'z2s2d2',
            name: 'Aguarico',
            code: '22D02',
            circuits: []
          },
          {
            id: 'z2s2d3',
            name: 'La Joya de los Sachas',
            code: '22D03',
            circuits: []
          }
        ]
      },
      {
        id: 'z2s3',
        name: 'Subzona Pichincha',
        districts: [
          {
            id: 'z2s3d1',
            name: 'Cayambe-Pedro Moncayo',
            code: '17D10',
            circuits: []
          },
          {
            id: 'z2s3d2',
            name: 'Mejía-Rumiñahui',
            code: '17D11',
            circuits: []
          },
          {
            id: 'z2s3d3',
            name: 'Pedro Vicente Maldonado-Puerto Quito-San Miguel de los Bancos',
            code: '17D12',
            circuits: []
          }
        ]
      }
    ]
  },
  {
    id: 'z3',
    name: 'Zona 3 - Centro',
    subzones: [
      {
        id: 'z3s1',
        name: 'Subzona Chimborazo',
        districts: [
          {
            id: 'z3s1d1',
            name: 'Riobamba-Chambo',
            code: '06D01',
            circuits: []
          },
          {
            id: 'z3s1d2',
            name: 'Alausí-Chunchi',
            code: '06D02',
            circuits: []
          },
          {
            id: 'z3s1d3',
            name: 'Pallatanga-Cumandá',
            code: '06D03',
            circuits: []
          }
        ]
      },
      {
        id: 'z3s2',
        name: 'Subzona Cotopaxi',
        districts: [
          {
            id: 'z3s2d1',
            name: 'Latacunga',
            code: '05D01',
            circuits: []
          },
          {
            id: 'z3s2d2',
            name: 'La Maná',
            code: '05D02',
            circuits: []
          },
          {
            id: 'z3s2d3',
            name: 'Pangua',
            code: '05D03',
            circuits: []
          }
        ]
      },
      {
        id: 'z3s3',
        name: 'Subzona Pastaza',
        districts: [
          {
            id: 'z3s3d1',
            name: 'Pastaza-Mera-Santa Clara',
            code: '16D01',
            circuits: []
          },
          {
            id: 'z3s3d2',
            name: 'Arajuno',
            code: '16D02',
            circuits: []
          }
        ]
      },
      {
        id: 'z3s4',
        name: 'Subzona Tungurahua',
        districts: [
          {
            id: 'z3s4d1',
            name: 'Ambato Norte',
            code: '18D01',
            circuits: []
          },
          {
            id: 'z3s4d2',
            name: 'Ambato Sur',
            code: '18D02',
            circuits: []
          },
          {
            id: 'z3s4d3',
            name: 'Baños',
            code: '18D03',
            circuits: []
          }
        ]
      }
    ]
  },
  {
    id: 'z4',
    name: 'Zona 4 - Pacífico',
    subzones: [
      {
        id: 'z4s1',
        name: 'Subzona Manabí',
        districts: [
          {
            id: 'z4s1d1',
            name: 'Portoviejo',
            code: '13D01',
            circuits: []
          },
          {
            id: 'z4s1d2',
            name: 'Manta-Jaramijó-Montecristi',
            code: '13D02',
            circuits: []
          },
          {
            id: 'z4s1d3',
            name: 'Jipijapa-Puerto López',
            code: '13D03',
            circuits: []
          }
        ]
      },
      {
        id: 'z4s2',
        name: 'Subzona Santo Domingo de los Tsáchilas',
        districts: [
          {
            id: 'z4s2d1',
            name: 'Santo Domingo',
            code: '23D01',
            circuits: []
          },
          {
            id: 'z4s2d2',
            name: 'La Concordia',
            code: '23D02',
            circuits: []
          }
        ]
      }
    ]
  },
  {
    id: 'z5',
    name: 'Zona 5 - Litoral',
    subzones: [
      {
        id: 'z5s1',
        name: 'Subzona Bolívar',
        districts: [
          {
            id: 'z5s1d1',
            name: 'Guaranda',
            code: '02D01',
            circuits: []
          },
          {
            id: 'z5s1d2',
            name: 'Chillanes',
            code: '02D02',
            circuits: []
          },
          {
            id: 'z5s1d3',
            name: 'San Miguel',
            code: '02D03',
            circuits: []
          }
        ]
      },
      {
        id: 'z5s2',
        name: 'Subzona Galápagos',
        districts: [
          {
            id: 'z5s2d1',
            name: 'San Cristóbal-Santa Cruz',
            code: '20D01',
            circuits: []
          },
          {
            id: 'z5s2d2',
            name: 'Isabela',
            code: '20D02',
            circuits: []
          }
        ]
      },
      {
        id: 'z5s3',
        name: 'Subzona Guayas',
        districts: [
          {
            id: 'z5s3d1',
            name: 'Guayaquil',
            code: '09D01',
            circuits: []
          },
          {
            id: 'z5s3d2',
            name: 'Durán',
            code: '09D02',
            circuits: []
          },
          {
            id: 'z5s3d3',
            name: 'Samborondón',
            code: '09D03',
            circuits: []
          }
        ]
      },
      {
        id: 'z5s4',
        name: 'Subzona Los Ríos',
        districts: [
          {
            id: 'z5s4d1',
            name: 'Babahoyo',
            code: '12D01',
            circuits: []
          },
          {
            id: 'z5s4d2',
            name: 'Puebloviejo-Urdaneta',
            code: '12D02',
            circuits: []
          },
          {
            id: 'z5s4d3',
            name: 'Quevedo',
            code: '12D03',
            circuits: []
          },
          {
            id: 'z5s4d4',
            name: 'Ventanas',
            code: '12D04',
            circuits: []
          },
          {
            id: 'z5s4d5',
            name: 'Vinces',
            code: '12D05',
            circuits: []
          },
          {
            id: 'z5s4d6',
            name: 'Buena Fe-Valencia',
            code: '12D06',
            circuits: []
          }
        ]
      }
    ]
  },
  {
    id: 'z6',
    name: 'Zona 6 - Austro',
    subzones: [
      {
        id: 'z6s1',
        name: 'Subzona Azuay',
        districts: [
          {
            id: 'z6s1d1',
            name: 'Cuenca Norte',
            code: '01D01',
            circuits: []
          },
          {
            id: 'z6s1d2',
            name: 'Cuenca Sur',
            code: '01D02',
            circuits: []
          },
          {
            id: 'z6s1d3',
            name: 'Girón-Santa Isabel',
            code: '01D03',
            circuits: []
          }
        ]
      },
      {
        id: 'z6s2',
        name: 'Subzona Cañar',
        districts: [
          {
            id: 'z6s2d1',
            name: 'Azogues-Biblián-Déleg',
            code: '03D01',
            circuits: []
          },
          {
            id: 'z6s2d2',
            name: 'Cañar-El Tambo-Suscal',
            code: '03D02',
            circuits: []
          }
        ]
      },
      {
        id: 'z6s3',
        name: 'Subzona Morona Santiago',
        districts: [
          {
            id: 'z6s3d1',
            name: 'Morona',
            code: '14D01',
            circuits: []
          },
          {
            id: 'z6s3d2',
            name: 'Huamboya-Pablo Sexto-Palora',
            code: '14D02',
            circuits: []
          }
        ]
      }
    ]
  },
  {
    id: 'z7',
    name: 'Zona 7 - Sur',
    subzones: [
      {
        id: 'z7s1',
        name: 'Subzona El Oro',
        districts: [
          {
            id: 'z7s1d1',
            name: 'Machala',
            code: '07D01',
            circuits: []
          },
          {
            id: 'z7s1d2',
            name: 'Huaquillas',
            code: '07D02',
            circuits: []
          },
          {
            id: 'z7s1d3',
            name: 'Zaruma-Portovelo',
            code: '07D03',
            circuits: []
          }
        ]
      },
      {
        id: 'z7s2',
        name: 'Subzona Loja',
        districts: [
          {
            id: 'z7s2d1',
            name: 'Loja',
            code: '11D01',
            circuits: []
          },
          {
            id: 'z7s2d2',
            name: 'Catamayo',
            code: '11D02',
            circuits: []
          },
          {
            id: 'z7s2d3',
            name: 'Saraguro',
            code: '11D03',
            circuits: []
          }
        ]
      },
      {
        id: 'z7s3',
        name: 'Subzona Zamora Chinchipe',
        districts: [
          {
            id: 'z7s3d1',
            name: 'Zamora',
            code: '19D01',
            circuits: []
          },
          {
            id: 'z7s3d2',
            name: 'Yantzaza',
            code: '19D02',
            circuits: []
          }
        ]
      }
    ]
  },
  {
    id: 'z8',
    name: 'Zona 8 - Guayaquil',
    subzones: [
      {
        id: 'z8s1',
        name: 'Subzona Guayaquil',
        districts: [
          {
            id: 'z8s1d1',
            name: 'Guayaquil Centro',
            code: '09D04',
            circuits: []
          },
          {
            id: 'z8s1d2',
            name: 'Guayaquil Norte',
            code: '09D05',
            circuits: []
          },
          {
            id: 'z8s1d3',
            name: 'Guayaquil Sur',
            code: '09D06',
            circuits: []
          }
        ]
      }
    ]
  },
  {
    id: 'z9',
    name: 'Zona 9 - Distrito Metropolitano de Quito',
    subzones: [
      {
        id: 'z9s1',
        name: 'Subzona DMQ',
        districts: [
          {
            id: 'z9s1d1',
            name: 'Quito Norte',
            code: '17D01',
            circuits: []
          },
          {
            id: 'z9s1d2',
            name: 'Quito Centro',
            code: '17D02',
            circuits: []
          },
          {
            id: 'z9s1d3',
            name: 'Quito Sur',
            code: '17D03',
            circuits: []
          }
        ]
      }
    ]
  }
];