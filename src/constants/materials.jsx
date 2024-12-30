// Material Database and Constants
export const MATERIALS_DATABASE = {
  "FCCL": {  
    displayName: "FCCL",  
    categories: [  
      {  
        name: "NIKKAN LF-8338",  
        thickness: 12.5,  
        dk: 3.2,  
        df: 0.02,  
        youngModulus: 2.5,  
        peelStrength: 1.2,  
        color: "#E6B17E",  
        manufacturer: "NIKKAN",  
        manufacturingDate: "2024-11-15",  
        testingDate: "2024-11-20",  
        absorptionRate: 0.85,  
        thermalConductivity: 0.12,  
        thermalExpansion: 20  
      },  
      {  
        name: "NIKKAN LF-8338R",  
        thickness: 25,  
        dk: 3.4,  
        df: 0.023,  
        youngModulus: 2.7,  
        peelStrength: 1.3,  
        color: "#E6B17E",  
        manufacturer: "NIKKAN",  
        manufacturingDate: "2024-11-18",  
        testingDate: "2024-11-23",  
        absorptionRate: 0.85,  
        thermalConductivity: 0.12,  
        thermalExpansion: 20 
      },  
      {  
        name: "UPILEX-50S",  
        thickness: 12.5,  
        dk: 3.5,  
        df: 0.002,  
        youngModulus: 3.2,  
        peelStrength: 1.4,  
        color: "#FFD700",  
        manufacturer: "UBE",  
        manufacturingDate: "2024-11-20",  
        testingDate: "2024-11-25",  
        absorptionRate: 0.83,  
        thermalConductivity: 0.29,  
        thermalExpansion: 12  
      },  
      {  
        name: "APICAL-50N",  
        thickness: 12.5,  
        dk: 3.4,  
        df: 0.0025,  
        youngModulus: 3.0,  
        peelStrength: 1.3,  
        color: "#DAA520",  
        manufacturer: "KANEKA",  
        manufacturingDate: "2024-11-22",  
        testingDate: "2024-11-27",  
        absorptionRate: 0.84,  
        thermalConductivity: 0.26,  
        thermalExpansion: 16 
      },  
      {  
        name: "KAPTON-200V",  
        thickness: 50,  
        dk: 3.3,  
        df: 0.0026,  
        youngModulus: 3.3,  
        peelStrength: 1.4,  
        color: "#FFA500",  
        manufacturer: "DuPont",  
        manufacturingDate: "2024-11-25",  
        testingDate: "2024-11-30",  
        absorptionRate: 0.85,  
        thermalConductivity: 0.12,  
        thermalExpansion: 20 
      },  
      {  
        name: "KF330",  
        thickness: 25,  
        dk: 3.4,  
        df: 0.002,  
        youngModulus: 2.8,  
        peelStrength: 1.2,  
        color: "#FFB6C1",  
        manufacturer: "Kingfa",  
        manufacturingDate: "2024-11-28",  
        testingDate: "2024-12-03",  
        absorptionRate: 0.84,  
        thermalConductivity: 0.15,  
        thermalExpansion: 18  
      },  
      {  
        name: "TU767",  
        thickness: 30,  
        dk: 3.5,  
        df: 0.003,  
        youngModulus: 2.9,  
        peelStrength: 1.3,  
        color: "#FFB6C1",  
        manufacturer: "Taiflex",  
        manufacturingDate: "2024-12-01",  
        testingDate: "2024-12-06",  
        absorptionRate: 0.84,  
        thermalConductivity: 0.14,  
        thermalExpansion: 19  
      }  
    ]  
  },  

  "ADHESIVE": {  
    displayName: "背膠",  
    categories: [  
      {  
        name: "9150",  
        thickness: 50,  
        dk: 3.2,  
        df: 0.025,  
        youngModulus: 0.05,  
        peelStrength: 1.5,  
        color: "#F5F5DC",  
        manufacturer: "3M",  
        manufacturingDate: "2024-11-15",  
        testingDate: "2024-11-20",  
        absorptionRate: 0.90,  
        thermalConductivity: 0.18,  
        thermalExpansion: 150 
      },  
      {  
        name: "468MP",  
        thickness: 50,  
        dk: 3.2,  
        df: 0.018,  
        youngModulus: 0.06,  
        peelStrength: 1.6,  
        color: "#F5F5DC",  
        manufacturer: "3M",  
        manufacturingDate: "2024-11-18",  
        testingDate: "2024-11-23",  
        absorptionRate: 0.89,  
        thermalConductivity: 0.17,  
        thermalExpansion: 160  
      },  
      {  
        name: "467MP",  
        thickness: 60,  
        dk: 3.3,  
        df: 0.020,  
        youngModulus: 0.055,  
        peelStrength: 1.7,  
        color: "#F5F5DC",  
        manufacturer: "3M",  
        manufacturingDate: "2024-11-20",  
        testingDate: "2024-11-25",  
        absorptionRate: 0.89,  
        thermalConductivity: 0.17,  
        thermalExpansion: 155 
      }  
    ]  
  },  

  "CONDUCTIVE_ADHESIVE": {  
    displayName: "導電膠",  
    categories: [  
      {  
        name: "9713",  
        thickness: 127,  
        dk: 4.0,  
        df: 0.030,  
        youngModulus: 0.08,  
        peelStrength: 1.8,  
        color: "#A9A9A9",  
        manufacturer: "3M",  
        manufacturingDate: "2024-11-15",  
        testingDate: "2024-11-20",  
        absorptionRate: 0.75,  
        thermalConductivity: 3.0,  
        thermalExpansion: 90  
      },  
      {  
        name: "9712",  
        thickness: 127,  
        dk: 4.1,  
        df: 0.028,  
        youngModulus: 0.075,  
        peelStrength: 1.9,  
        color: "#A9A9A9",  
        manufacturer: "3M",  
        manufacturingDate: "2024-11-18",  
        testingDate: "2024-11-23",  
        absorptionRate: 0.75,  
        thermalConductivity: 2.8,  
        thermalExpansion: 95  
      }  
    ]  
  },  

  "PI_REINFORCEMENT": {  
    displayName: "PI補強",  
    categories: [  
      {  
        name: "UPILEX-S",  
        thickness: 25,  
        dk: 3.5,  
        df: 0.001,  
        youngModulus: 3.2,  
        peelStrength: null,  
        color: "#FFD700",  
        manufacturer: "UBE",  
        manufacturingDate: "2024-11-15",  
        testingDate: "2024-11-20",  
        absorptionRate: 0.83,  
        thermalConductivity: 0.29,  
        thermalExpansion: 12 
      },  
      {  
        name: "KAPTON HN",  
        thickness: 25,  
        dk: 3.4,  
        df: 0.002,  
        youngModulus: 3.0,  
        peelStrength: null,  
        color: "#FFD700",  
        manufacturer: "DuPont",  
        manufacturingDate: "2024-11-18",  
        testingDate: "2024-11-23",  
        absorptionRate: 0.85,  
        thermalConductivity: 0.12,  
        thermalExpansion: 20  
      }  
    ]  
  },  

  "INK": {  
    displayName: "INK",  
    categories: [  
      {  
        name: "PSR-4000 AUS703",  
        thickness: 15,  
        dk: 4.1,  
        df: 0.025,  
        youngModulus: 2.8,  
        peelStrength: 1.0,  
        color: "#000080",  
        manufacturer: "Taiyo",  
        manufacturingDate: "2024-11-15",  
        testingDate: "2024-11-20",  
        absorptionRate: 0.95,  
        thermalConductivity: 0.20,  
        thermalExpansion: 60  
      },  
      {  
        name: "PSR-4000 HS240",  
        thickness: 20,  
        dk: 4.0,  
        df: 0.023,  
        youngModulus: 2.9,  
        peelStrength: 1.1,  
        color: "#013220",  
        manufacturer: "Taiyo",  
        manufacturingDate: "2024-11-18",  
        testingDate: "2024-11-23",  
        absorptionRate: 0.95,  
        thermalConductivity: 0.21,  
        thermalExpansion: 58  
      },  
      {  
        name: "LOCTITE EDAG PF 050",  
        thickness: 15,  
        dk: 3.8,  
        df: 0.020,  
        youngModulus: 2.7,  
        peelStrength: 1.0,  
        color: "#000000",  
        manufacturer: "Henkel",  
        manufacturingDate: "2024-11-20",  
        testingDate: "2024-11-25",  
        absorptionRate: 0.93,  
        thermalConductivity: 0.19,  
        thermalExpansion: 62  
      },  
      {  
        name: "LOCTITE ECI 5000 E&C",  
        thickness: 20,  
        dk: 4.2,  
        df: 0.022,  
        youngModulus: 2.8,  
        peelStrength: 1.1,  
        color: "#013220",  
        manufacturer: "Henkel",  
        manufacturingDate: "2024-11-22",  
        testingDate: "2024-11-27",  
        absorptionRate: 0.94,  
        thermalConductivity: 0.22,  
        thermalExpansion: 59 
      }  
    ]  
  },  

  "PTFE": {  
    displayName: "PTFE",  
    categories: [  
      {  
        name: "Rogers RO3003",  
        thickness: 127,  
        dk: 3.0,  
        df: 0.0013,  
        youngModulus: 18.0,  
        peelStrength: 1.5,  
        color: "#FFFFFF",  
        manufacturer: "Rogers",  
        manufacturingDate: "2024-11-15",  
        testingDate: "2024-11-20",  
        absorptionRate: 0.02,  
        thermalConductivity: 0.50,  
        thermalExpansion: 17  
      },  
      {  
        name: "Rogers RT/duroid 5880",  
        thickness: 254,  
        dk: 2.2,  
        df: 0.0009,  
        youngModulus: 19.0,  
        peelStrength: 1.6,  
        color: "#F0F0F0",  
        manufacturer: "Rogers",  
        manufacturingDate: "2024-11-18",  
        testingDate: "2024-11-23",  
        absorptionRate: 0.02,  
        thermalConductivity: 0.45,  
        thermalExpansion: 31  
      },  
      {  
        name: "Taconic TLY-5",  
        thickness: 127,  
        dk: 2.2,  
        df: 0.0009,  
        youngModulus: 17.5,  
        peelStrength: 1.4,  
        color: "#F8F8FF",  
        manufacturer: "Taconic",  
        manufacturingDate: "2024-11-20",  
        testingDate: "2024-11-25",  
        absorptionRate: 0.02,  
        thermalConductivity: 0.40,  
        thermalExpansion: 29  
      },  
      {  
        name: "CLTE-XT",  
        thickness: 254,  
        dk: 2.94,  
        df: 0.0012,  
        youngModulus: 18.5,  
        peelStrength: 1.5,  
        color: "#F5F5F5",  
        manufacturer: "Arlon",  
        manufacturingDate: "2024-11-22",  
        testingDate: "2024-11-27",  
        absorptionRate: 0.02,  
        thermalConductivity: 0.48,  
        thermalExpansion: 19  
      },  
      {  
        name: "DiClad 880",  
        thickness: 127,  
        dk: 2.2,  
        df: 0.0009,  
        youngModulus: 17.8,  
        peelStrength: 1.4,  
        color: "#FFFAFA",  
        manufacturer: "Arlon",  
        manufacturingDate: "2024-11-25",  
        testingDate: "2024-11-30",
        absorptionRate: 0.02,  
        thermalConductivity: 0.42,  
        thermalExpansion: 30  
      }  
    ]  
  },  

  "FR4": {  
    displayName: "FR4",  
    categories: [  
      {  
        name: "TU-872",  
        thickness: 100,  
        dk: 4.4,  
        df: 0.02,  
        youngModulus: 20.0,  
        peelStrength: 1.5,  
        color: "#DEB887",  
        manufacturer: "TUC",  
        manufacturingDate: "2024-11-15",  
        testingDate: "2024-11-20",  
        absorptionRate: 0.75,  
        thermalConductivity: 0.30,  
        thermalExpansion: 14  
      },  
      {  
        name: "NPG-170T",  
        thickness: 100,  
        dk: 4.5,  
        df: 0.019,  
        youngModulus: 21.0,  
        peelStrength: 1.6,  
        color: "#D2B48C",  
        manufacturer: "Nanya",  
        manufacturingDate: "2024-11-18",  
        testingDate: "2024-11-23",  
        absorptionRate: 0.75,  
        thermalConductivity: 0.31,  
        thermalExpansion: 13  
      },  
      {  
        name: "MCL-E-679F",  
        thickness: 100,  
        dk: 4.6,  
        df: 0.018,  
        youngModulus: 22.0,  
        peelStrength: 1.7,  
        color: "#BC8F8F",  
        manufacturer: "Hitachi",  
        manufacturingDate: "2024-11-20",  
        testingDate: "2024-11-25",  
        absorptionRate: 0.76,  
        thermalConductivity: 0.32,  
        thermalExpansion: 15  
      },  
      {  
        name: "S1000-2M",  
        thickness: 100,  
        dk: 4.4,  
        df: 0.019,  
        youngModulus: 20.5,  
        peelStrength: 1.5,  
        color: "#F4A460",  
        manufacturer: "Shengyi",  
        manufacturingDate: "2024-11-22",  
        testingDate: "2024-11-27",  
        absorptionRate: 0.75,  
        thermalConductivity: 0.30,  
        thermalExpansion: 14  
      },  
      {  
        name: "ITEQ IT-180A",  
        thickness: 100,  
        dk: 4.5,  
        df: 0.02,  
        youngModulus: 21.5,  
        peelStrength: 1.6,  
        color: "#DAA520",  
        manufacturer: "ITEQ",  
        manufacturingDate: "2024-11-25",  
        testingDate: "2024-11-30",  
        absorptionRate: 0.75,  
        thermalConductivity: 0.31,  
        thermalExpansion: 14  
      }  
    ]  
  },  

  "Cu": {  
    displayName: "Cu",  
    categories: [    
      {  
        name: "MITSUI LD",  
        thickness: 35,  
        dk: 1,  
        df: 0,  
        youngModulus: 115.0,  
        peelStrength: 1.3,  
        color: "#CD7F32",  
        manufacturer: "Mitsui",  
        manufacturingDate: "2024-11-15",  
        testingDate: "2024-11-20",  
        absorptionRate: 0.03,  
        thermalConductivity: 385,  
        thermalExpansion: 17 
      },  
      {  
        name: "Chang Chun VLP",  
        thickness: 35,  
        dk: 1,  
        df: 0,  
        youngModulus: 112.0,  
        peelStrength: 1.25,  
        color: "#B8860B",  
        manufacturer: "Chang Chun",  
        manufacturingDate: "2024-11-18",  
        testingDate: "2024-11-23",  
        absorptionRate: 0.03,  
        thermalConductivity: 385,  
        thermalExpansion: 17  
      },  
      {  
        name: "Furukawa C7025",  
        thickness: 35,  
        dk: 1,  
        df: 0,  
        youngModulus: 118.0,  
        peelStrength: 1.35,  
        color: "#CD853F",  
        manufacturer: "Furukawa",  
        manufacturingDate: "2024-11-21",  
        testingDate: "2024-11-26",  
        absorptionRate: 0.03,  
        thermalConductivity: 385,  
        thermalExpansion: 17  
      }  
    ]  
  },  

  "CVL": {  
    displayName: "CVL",  
    categories: [  
      {  
        name: "TLX-8",  
        thickness: 18,  
        dk: 2.55,  
        df: 0.0019,  
        youngModulus: 2.8,  
        peelStrength: 1.1,  
        color: "#E6E6FA",  
        manufacturer: "Taconic",  
        manufacturingDate: "2024-11-25",  
        testingDate: "2024-11-30",  
        absorptionRate: 0.02,  
        thermalConductivity: 0.45,  
        thermalExpansion: 18  
      },  
      {  
        name: "TLY-5",  
        thickness: 127,  
        dk: 2.17,  
        df: 0.0009,  
        youngModulus: 2.9,  
        peelStrength: 1.2,  
        color: "#E6E6FA",  
        manufacturer: "Taconic",  
        manufacturingDate: "2024-11-28",  
        testingDate: "2024-12-03",  
        absorptionRate: 0.02,  
        thermalConductivity: 0.40,  
        thermalExpansion: 19  
      },
      {
        name: "UTB",  
        thickness: 25,  
        dk: 2.60,  
        df: 0.0020,  
        youngModulus: 2.7,  
        peelStrength: 1.0,  
        color: "#E6E6FA",  
        manufacturer: "Taiflex",  
        manufacturingDate: "2024-12-01",  
        testingDate: "2024-12-06",  
        absorptionRate: 0.02,  
        thermalConductivity: 0.42,  
        thermalExpansion: 20
      },
      {
        name: "STB-F",  
        thickness: 25,  
        dk: 2.65,  
        df: 0.0021,  
        youngModulus: 2.8,  
        peelStrength: 1.1,  
        color: "#E6E6FA",  
        manufacturer: "DuPont",  
        manufacturingDate: "2024-12-04",  
        testingDate: "2024-12-09",  
        absorptionRate: 0.02,  
        thermalConductivity: 0.43,  
        thermalExpansion: 21
      }
    ]  
  },  

  "EMI": {  
    displayName: "EMI",  
    categories: [  
      {  
        name: "SF-PC5",  
        thickness: 25,  
        dk: 4.5,  
        df: 0.025,  
        youngModulus: 3.0,  
        peelStrength: 1.4,  
        color: "#C0C0C0",  
        manufacturer: "Tatsuta",  
        manufacturingDate: "2024-12-02",  
        testingDate: "2024-12-07",  
        absorptionRate: 0.70,  
        thermalConductivity: 2.5,  
        thermalExpansion: 25  
      },  
      {  
        name: "SF-PC3",  
        thickness: 30,  
        dk: 4.3,  
        df: 0.022,  
        youngModulus: 2.9,  
        peelStrength: 1.3,  
        color: "#C0C0C0",  
        manufacturer: "Tatsuta",  
        manufacturingDate: "2024-12-05",  
        testingDate: "2024-12-10",  
        absorptionRate: 0.70,  
        thermalConductivity: 2.3,  
        thermalExpansion: 27  
      } 
    ]  
  }
};
