// Material Database and Constants
export const MATERIALS_DATABASE = {
  "FCCL": {
    displayName: "FCCL",
    categories: [
      {  
        name: "NIKKAN LF-8338",  
        thickness: 0.0125,  
        dk: 3.2,  
        df: 0.02,
        youngModulus: 2.5,  // GPa
        peelStrength: 1.2,  // N/mm  
        color: "#E6B17E",  
        manufacturer: "NIKKAN"
      },  
      {  
        name: "NIKKAN LF-8338R",  
        thickness: 0.025,  
        dk: 3.4,  
        df: 0.023,
        youngModulus: 2.7,
        peelStrength: 1.3,
        color: "#E6B17E",  
        manufacturer: "NIKKAN"
      },  
      {  
        name: "UPILEX-50S",  
        thickness: 0.0125,  
        dk: 3.5,  
        df: 0.002,
        youngModulus: 3.2,
        peelStrength: 1.4,
        color: "#FFD700",  
        manufacturer: "UBE"
      },  
      {  
        name: "APICAL-50N",  
        thickness: 0.0125,  
        dk: 3.4,  
        df: 0.0025,
        youngModulus: 3.0,
        peelStrength: 1.3,
        color: "#DAA520",  
        manufacturer: "KANEKA"
      },  
      {  
        name: "KAPTON-200V",  
        thickness: 0.05,  
        dk: 3.3,  
        df: 0.0026,
        youngModulus: 3.3,
        peelStrength: 1.4,
        color: "#FFA500",  
        manufacturer: "DuPont"
      },
      {
        name: "KF330",
        thickness: 0.025,
        dk: 3.4,
        df: 0.002,
        youngModulus: 2.8,
        peelStrength: 1.2,
        color: "#FFB6C1",
        manufacturer: "Kingfa"
      },
      {
        name: "TU767",
        thickness: 0.030,
        dk: 3.5,
        df: 0.003,
        youngModulus: 2.9,
        peelStrength: 1.3,
        color: "#FFB6C1",
        manufacturer: "Taiflex"
      }
    ]
  },

  "ADHESIVE": {
    displayName: "背膠",
    categories: [
      {  
        name: "9150",  
        thickness: 0.050,  
        dk: 3.2,  
        df: 0.025,
        youngModulus: 0.05,
        peelStrength: 1.5,
        color: "#F5F5DC",  
        manufacturer: "3M"
      },
      {
        name: "468MP",
        thickness: 0.050,
        dk: 3.2,
        df: 0.018,
        youngModulus: 0.06,
        peelStrength: 1.6,
        color: "#F5F5DC",
        manufacturer: "3M"
      },
      {
        name: "467MP",
        thickness: 0.060,
        dk: 3.3,
        df: 0.020,
        youngModulus: 0.055,
        peelStrength: 1.7,
        color: "#F5F5DC",
        manufacturer: "3M"
      }
    ]
  },

  "CONDUCTIVE_ADHESIVE": {
    displayName: "導電膠",
    categories: [
      {
        name: "9713",
        thickness: 0.127,
        dk: 4.0,
        df: 0.030,
        youngModulus: 0.08,
        peelStrength: 1.8,
        color: "#A9A9A9",
        manufacturer: "3M"
      },
      {
        name: "9712",
        thickness: 0.127,
        dk: 4.1,
        df: 0.028,
        youngModulus: 0.075,
        peelStrength: 1.9,
        color: "#A9A9A9",
        manufacturer: "3M"
      }
    ]
  },

  "PI_REINFORCEMENT": {
    displayName: "PI補強",
    categories: [
      {
        name: "UPILEX-S",
        thickness: 0.025,
        dk: 3.5,
        df: 0.001,
        youngModulus: 3.2,
        peelStrength: null,  // N/A for PI reinforcement
        color: "#FFD700",
        manufacturer: "UBE"
      },
      {
        name: "KAPTON HN",
        thickness: 0.025,
        dk: 3.4,
        df: 0.002,
        youngModulus: 3.0,
        peelStrength: null,  // N/A for PI reinforcement
        color: "#FFD700",
        manufacturer: "DuPont"
      }
    ]
  },

  "INK": {
    displayName: "INK",
    categories: [
      {
        name: "PSR-4000 AUS703",
        thickness: 0.015,
        dk: 4.1,
        df: 0.025,
        youngModulus: 2.8,
        peelStrength: 1.0,
        color: "#000080",
        manufacturer: "Taiyo"
      },
      {
        name: "PSR-4000 HS240",
        thickness: 0.020,
        dk: 4.0,
        df: 0.023,
        youngModulus: 2.9,
        peelStrength: 1.1,
        color: "#013220",
        manufacturer: "Taiyo"
      },
      {
        name: "LOCTITE EDAG PF 050",
        thickness: 0.015,
        dk: 3.8,
        df: 0.020,
        youngModulus: 2.7,
        peelStrength: 1.0,
        color: "#000000",
        manufacturer: "Henkel"
      },
      {
        name: "LOCTITE ECI 5000 E&C",
        thickness: 0.020,
        dk: 4.2,
        df: 0.022,
        youngModulus: 2.8,
        peelStrength: 1.1,
        color: "#013220",
        manufacturer: "Henkel"
      }
    ]
  },

  "PTFE": {  
    displayName: "PTFE",  
    categories: [  
      {  
        name: "Rogers RO3003",  
        thickness: 0.127,  
        dk: 3.0,  
        df: 0.0013,
        youngModulus: 18.0,
        peelStrength: 1.5,
        color: "#FFFFFF",  
        manufacturer: "Rogers"
      },  
      {  
        name: "Rogers RT/duroid 5880",  
        thickness: 0.254,  
        dk: 2.2,  
        df: 0.0009,
        youngModulus: 19.0,
        peelStrength: 1.6,
        color: "#F0F0F0",  
        manufacturer: "Rogers"
      },  
      {  
        name: "Taconic TLY-5",  
        thickness: 0.127,  
        dk: 2.2,  
        df: 0.0009,
        youngModulus: 17.5,
        peelStrength: 1.4,
        color: "#F8F8FF",  
        manufacturer: "Taconic"
      },  
      {  
        name: "CLTE-XT",  
        thickness: 0.254,  
        dk: 2.94,  
        df: 0.0012,
        youngModulus: 18.5,
        peelStrength: 1.5,
        color: "#F5F5F5",  
        manufacturer: "Arlon"
      },  
      {  
        name: "DiClad 880",  
        thickness: 0.127,  
        dk: 2.2,  
        df: 0.0009,
        youngModulus: 17.8,
        peelStrength: 1.4,
        color: "#FFFAFA",  
        manufacturer: "Arlon"
      }  
    ]  
  },  

  "FR4": {  
    displayName: "FR4",  
    categories: [  
      {  
        name: "TU-872",  
        thickness: 0.1,  
        dk: 4.4,  
        df: 0.02,
        youngModulus: 20.0,
        peelStrength: 1.5,
        color: "#DEB887",  
        manufacturer: "TUC"
      },  
      {  
        name: "NPG-170T",  
        thickness: 0.1,  
        dk: 4.5,  
        df: 0.019,
        youngModulus: 21.0,
        peelStrength: 1.6,
        color: "#D2B48C",  
        manufacturer: "Nanya"
      },  
      {  
        name: "MCL-E-679F",  
        thickness: 0.1,  
        dk: 4.6,  
        df: 0.018,
        youngModulus: 22.0,
        peelStrength: 1.7,
        color: "#BC8F8F",  
        manufacturer: "Hitachi"
      },  
      {  
        name: "S1000-2M",  
        thickness: 0.1,  
        dk: 4.4,  
        df: 0.019,
        youngModulus: 20.5,
        peelStrength: 1.5,
        color: "#F4A460",  
        manufacturer: "Shengyi"
      },  
      {  
        name: "ITEQ IT-180A",  
        thickness: 0.1,  
        dk: 4.5,  
        df: 0.02,
        youngModulus: 21.5,
        peelStrength: 1.6,
        color: "#DAA520",  
        manufacturer: "ITEQ"
      }  
    ]  
  },  

  "Cu": {  
    displayName: "Cu",  
    categories: [    
      {  
        name: "MITSUI LD",  
        thickness: 0.035,  
        dk: 1,  
        df: 0,
        youngModulus: 115.0,
        peelStrength: 1.3,
        color: "#CD7F32",  
        manufacturer: "Mitsui"
      },  
      {  
        name: "Chang Chun VLP",  
        thickness: 0.035,  
        dk: 1,  
        df: 0,
        youngModulus: 112.0,
        peelStrength: 1.25,
        color: "#B8860B",  
        manufacturer: "Chang Chun"
      },  
      {  
        name: "Furukawa C7025",  
        thickness: 0.035,  
        dk: 1,  
        df: 0,
        youngModulus: 118.0,
        peelStrength: 1.35,
        color: "#CD853F",  
        manufacturer: "Furukawa"
      }  
    ]  
  },  

  "CVL": {  
    displayName: "CVL",  
    categories: [  
      {  
        name: "TLX-8",  
        thickness: 0.018,  
        dk: 2.55,  
        df: 0.0019,
        youngModulus: 2.8,
        peelStrength: 1.1,
        color: "#E6E6FA",  
        manufacturer: "Taconic"
      },  
      {  
        name: "TLY-5",  
        thickness: 0.127,  
        dk: 2.17,  
        df: 0.0009,
        youngModulus: 2.9,
        peelStrength: 1.2,
        color: "#E6E6FA",  
        manufacturer: "Taconic"
      }  
    ]  
  },  

  "EMI": {  
    displayName: "EMI",  
    categories: [  
      {  
        name: "SF-PC5",  
        thickness: 0.025,  
        dk: 4.5,  
        df: 0.025,
        youngModulus: 3.0,
        peelStrength: 1.4,
        color: "#C0C0C0",  
        manufacturer: "Tatsuta"
      },  
      {  
        name: "SF-PC3",  
        thickness: 0.030,  
        dk: 4.3,  
        df: 0.022,
        youngModulus: 2.9,
        peelStrength: 1.3,
        color: "#C0C0C0",  
        manufacturer: "Tatsuta"
      }  
    ]  
  }
};

export const CHART_COLORS = {
  thickness: "#8884d8",
  dk: "#82ca9d",
  df: "#ffc658",
  youngModulus: "#ff7300",
  peelStrength: "#82ca9d"
};