import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Complete Materials Database  
const MATERIALS_DATABASE = {  
  "FCCL": {  
    displayName: "FCCL",  
    categories: [  
      {  
        name: "NIKKAN LF-8338",  
        thickness: 0.0125,  
        dk: 3.2,  
        df: 0.02,  
        color: "#E6B17E",  
        manufacturer: "NIKKAN",  
        price: 100  
      },  
      {  
        name: "NIKKAN LF-8338R",  
        thickness: 0.025,  
        dk: 3.4,  
        df: 0.023,  
        color: "#E6B17E",  
        manufacturer: "NIKKAN",  
        price: 120  
      },  
      {  
        name: "UPILEX-50S",  
        thickness: 0.0125,  
        dk: 3.5,  
        df: 0.002,  
        color: "#FFD700",  
        manufacturer: "UBE",  
        price: 150  
      },  
      {  
        name: "APICAL-50N",  
        thickness: 0.0125,  
        dk: 3.4,  
        df: 0.0025,  
        color: "#DAA520",  
        manufacturer: "KANEKA",  
        price: 140  
      },  
      {  
        name: "KAPTON-200V",  
        thickness: 0.05,  
        dk: 3.3,  
        df: 0.0026,  
        color: "#FFA500",  
        manufacturer: "DuPont",  
        price: 160  
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
        color: "#FFFFFF",  
        manufacturer: "Rogers",  
        price: 200  
      },  
      {  
        name: "Rogers RT/duroid 5880",  
        thickness: 0.254,  
        dk: 2.2,  
        df: 0.0009,  
        color: "#F0F0F0",  
        manufacturer: "Rogers",  
        price: 250  
      },  
      {  
        name: "Taconic TLY-5",  
        thickness: 0.127,  
        dk: 2.2,  
        df: 0.0009,  
        color: "#F8F8FF",  
        manufacturer: "Taconic",  
        price: 180  
      },  
      {  
        name: "CLTE-XT",  
        thickness: 0.254,  
        dk: 2.94,  
        df: 0.0012,  
        color: "#F5F5F5",  
        manufacturer: "Arlon",  
        price: 220  
      },  
      {  
        name: "DiClad 880",  
        thickness: 0.127,  
        dk: 2.2,  
        df: 0.0009,  
        color: "#FFFAFA",  
        manufacturer: "Arlon",  
        price: 190  
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
        color: "#DEB887",  
        manufacturer: "TUC",  
        price: 80  
      },  
      {  
        name: "NPG-170T",  
        thickness: 0.1,  
        dk: 4.5,  
        df: 0.019,  
        color: "#D2B48C",  
        manufacturer: "Nanya",  
        price: 75  
      },  
      {  
        name: "MCL-E-679F",  
        thickness: 0.1,  
        dk: 4.6,  
        df: 0.018,  
        color: "#BC8F8F",  
        manufacturer: "Hitachi",  
        price: 85  
      },  
      {  
        name: "S1000-2M",  
        thickness: 0.1,  
        dk: 4.4,  
        df: 0.019,  
        color: "#F4A460",  
        manufacturer: "Shengyi",  
        price: 70  
      },  
      {  
        name: "ITEQ IT-180A",  
        thickness: 0.1,  
        dk: 4.5,  
        df: 0.02,  
        color: "#DAA520",  
        manufacturer: "ITEQ",  
        price: 78  
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
        color: "#CD7F32",  
        manufacturer: "Mitsui",  
        price: 55  
      },  
      {  
        name: "Chang Chun VLP",  
        thickness: 0.035,  
        dk: 1,  
        df: 0,  
        color: "#B8860B",  
        manufacturer: "Chang Chun",  
        price: 52  
      },  
      {  
        name: "Furukawa C7025",  
        thickness: 0.035,  
        dk: 1,  
        df: 0,  
        color: "#CD853F",  
        manufacturer: "Furukawa",  
        price: 58  
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
        color: "#E6E6FA",  
        manufacturer: "Taconic",  
        price: 120  
      },  
      {  
        name: "TLY-5",  
        thickness: 0.127,  
        dk: 2.17,  
        df: 0.0009,  
        color: "#E6E6FA",  
        manufacturer: "Taconic",  
        price: 150  
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
        color: "#C0C0C0",  
        manufacturer: "Tatsuta",  
        price: 180  
      },  
      {  
        name: "SF-PC3",  
        thickness: 0.030,  
        dk: 4.3,  
        df: 0.022,  
        color: "#C0C0C0",  
        manufacturer: "Tatsuta",  
        price: 170  
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
        color: "#F5F5DC",  
        manufacturer: "3M",  
        price: 85  
      },  
      {  
        name: "467MP",  
        thickness: 0.060,  
        dk: 3.3,  
        df: 0.020,  
        color: "#F5F5DC",  
        manufacturer: "3M",  
        price: 90  
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
        color: "#A9A9A9",  
        manufacturer: "3M",  
        price: 200  
      },  
      {  
        name: "9712",  
        thickness: 0.127,  
        dk: 4.1,  
        df: 0.028,  
        color: "#A9A9A9",  
        manufacturer: "3M",  
        price: 195  
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
        color: "#FFD700",  
        manufacturer: "UBE",  
        price: 160  
      },  
      {  
        name: "KAPTON HN",  
        thickness: 0.025,  
        dk: 3.4,  
        df: 0.002,  
        color: "#FFD700",  
        manufacturer: "DuPont",  
        price: 150  
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
        color: "#000080",  
        manufacturer: "Taiyo",  
        price: 80  
      },  
      {  
        name: "PSR-4000 HS240",  
        thickness: 0.020,  
        dk: 4.0,  
        df: 0.023,  
        color: "#013220",  
        manufacturer: "Taiyo",  
        price: 85  
      },  
      {  
        name: "LOCTITE EDAG PF 050",  
        thickness: 0.015,  
        dk: 3.8,  
        df: 0.020,  
        color: "#000000",  
        manufacturer: "Henkel",  
        price: 82  
      },  
      {  
        name: "LOCTITE ECI 5000 E&C",  
        thickness: 0.020,  
        dk: 4.2,  
        df: 0.022,  
        color: "#013220",  
        manufacturer: "Henkel",  
        price: 88  
      }  
    ]  
  }  
};

const CHART_COLORS = {
  thickness: "#8884d8",
  dk: "#82ca9d",
  df: "#ffc658",
  price: "#ff7300"
};

export default function MaterialStackApp() {
  const [selectedMaterialType, setSelectedMaterialType] = useState("FCCL");
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS_DATABASE["FCCL"].categories[0]);
  const [layers, setLayers] = useState([
    { type: "FCCL", material: MATERIALS_DATABASE["FCCL"].categories[0] }
  ]);

  // Add the missing functions
  const addLayer = () => {
    setLayers([...layers, { type: selectedMaterialType, material: selectedMaterial }]);
  };

  const removeLayer = () => {
    if (layers.length > 1) {
      setLayers(layers.slice(0, -1));
    }
  };

  const updateLayerMaterial = (index, materialType, material) => {
    const newLayers = [...layers];
    newLayers[index] = { type: materialType, material: material };
    setLayers(newLayers);
  };

  const calculateTotalThickness = () => {
    return layers.reduce((sum, layer) => sum + layer.material.thickness, 0);
  };

  const calculateEffectiveDk = () => {
    const totalThickness = calculateTotalThickness();
    return layers.reduce((sum, layer) => 
      sum + (layer.material.dk * layer.material.thickness / totalThickness), 0);
  };

  const calculateEffectiveDf = () => {
    const totalThickness = calculateTotalThickness();
    return layers.reduce((sum, layer) => 
      sum + (layer.material.df * layer.material.thickness / totalThickness), 0);
  };

  const getComparisonData = () => {
    return MATERIALS_DATABASE[selectedMaterialType].categories.map(material => ({
      name: material.name,
      manufacturer: material.manufacturer,
      thickness: material.thickness,
      dk: material.dk,
      df: material.df,
      price: material.price
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">PCB材料疊構設計系統</h1>
        
        {/* Material Selection */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-4">材料選擇</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Material Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                材料類型
              </label>
              <select
                className="w-full border-gray-300 rounded-md shadow-sm"
                value={selectedMaterialType}
                onChange={(e) => {
                  const type = e.target.value;
                  setSelectedMaterialType(type);
                  setSelectedMaterial(MATERIALS_DATABASE[type].categories[0]);
                }}
              >
                {Object.entries(MATERIALS_DATABASE).map(([key, value]) => (
                  <option key={key} value={key}>{value.displayName}</option>
                ))}
              </select>
            </div>
            
            {/* Material Model Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                具體型號
              </label>
              <select
                className="w-full border-gray-300 rounded-md shadow-sm"
                value={selectedMaterial.name}
                onChange={(e) => {
                  const material = MATERIALS_DATABASE[selectedMaterialType].categories
                    .find(m => m.name === e.target.value);
                  setSelectedMaterial(material);
                }}
              >
                {MATERIALS_DATABASE[selectedMaterialType].categories.map(material => (
                  <option key={material.name} value={material.name}>
                    {material.name} - {material.manufacturer}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Material Parameters Display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-500">
                厚度 (mm)
              </label>
              <span className="text-lg font-semibold">
                {selectedMaterial.thickness}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-500">
                介電常數
              </label>
              <span className="text-lg font-semibold">
                {selectedMaterial.dk}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-500">
                損耗因數
              </label>
              <span className="text-lg font-semibold">
                {selectedMaterial.df}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-500">
                價格 (USD/m²)
              </label>
              <span className="text-lg font-semibold">
                {selectedMaterial.price}
              </span>
            </div>
          </div>
        </div>

        {/* Stack Design and Visualization Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stack Design Panel */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">疊構設計</h2>
              <div className="space-x-2">
                <button
                  onClick={addLayer}
                  className="p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <button
                  onClick={removeLayer}
                  className="p-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  <Minus className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {layers.map((layer, index) => (
                <div key={index} className="flex items-center space-x-4 p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium w-8">#{index + 1}</span>
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <select
                      value={layer.type}
                      onChange={(e) => {
                        const newType = e.target.value;
                        updateLayerMaterial(
                          index,
                          newType,
                          MATERIALS_DATABASE[newType].categories[0]
                        );
                      }}
                      className="block w-full rounded-md border-gray-300 text-sm"
                    >
                      {Object.entries(MATERIALS_DATABASE).map(([key, value]) => (
                        <option key={key} value={key}>{value.displayName}</option>
                      ))}
                    </select>
                    <select
                      value={layer.material.name}
                      onChange={(e) => {
                        const material = MATERIALS_DATABASE[layer.type].categories
                          .find(m => m.name === e.target.value);
                        updateLayerMaterial(index, layer.type, material);
                      }}
                      className="block w-full rounded-md border-gray-300 text-sm"
                    >
                      {MATERIALS_DATABASE[layer.type].categories.map(material => (
                        <option key={material.name} value={material.name}>
                          {material.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stack Visualization Panel */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-4">疊構視覺化</h2>
            <div className="space-y-1">
              {layers.map((layer, index) => (
                <div
                  key={index}
                  className="w-full rounded-sm flex items-center justify-between px-4"
                  style={{
                    backgroundColor: layer.material.color,
                    height: `${Math.max(40, layer.material.thickness * 1000)}px`,
                    border: '1px solid #ddd'
                  }}
                >
                  <span className="text-sm font-medium">
                    {layer.material.name}
                  </span>
                  <span className="text-sm">
                    {layer.material.thickness} mm
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-4">性能指標</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">總厚度</div>
              <div className="text-lg font-medium">
                {calculateTotalThickness().toFixed(4)} mm
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">等效介電常數</div>
              <div className="text-lg font-medium">
                {calculateEffectiveDk().toFixed(2)}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">等效損耗因數</div>
              <div className="text-lg font-medium">
                {calculateEffectiveDf().toFixed(4)}
              </div>
            </div>
          </div>
        </div>

        {/* Material Comparison Chart */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-4">材料參數比較</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getComparisonData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={80}
                  interval={0}
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar 
                  yAxisId="left"
                  dataKey="thickness" 
                  name="厚度 (mm)" 
                  fill={CHART_COLORS.thickness} 
                />
                <Bar 
                  yAxisId="left"
                  dataKey="dk" 
                  name="介電常數" 
                  fill={CHART_COLORS.dk} 
                />
                <Bar 
                  yAxisId="left"
                  dataKey="df" 
                  name="損耗因數" 
                  fill={CHART_COLORS.df} 
                />
                <Bar 
                  yAxisId="right"
                  dataKey="price" 
                  name="價格 (USD/m²)" 
                  fill={CHART_COLORS.price} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}