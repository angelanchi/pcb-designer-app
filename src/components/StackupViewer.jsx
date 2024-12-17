import { useState } from 'react'  
import { ChevronDown, ChevronUp, Layers, Search, Info } from 'lucide-react'  

export default function EnhancedFPCStackupViewer() {  
  const [selectedStackup, setSelectedStackup] = useState(null)  
  const [searchTerm, setSearchTerm] = useState("")  
  const [showLegend, setShowLegend] = useState(false)  
  const [imageSearch, setImageSearch] = useState(null)

  const stackups = {  
    "version": "1.1",  
    "last_updated": "2024-12-16",  
    "stackups": [  
      {  
        "id": "TYPE-A",  
        "name": "高頻微帶線FPC疊構",  
        "description": "適合高速單端信號傳輸，具有良好的阻抗控制和EMI屏蔽效果",  
        "category": "高速單端",  
        "layers": [  
          {"material": "EMI", "thickness": 12, "unit": "um"},  
          {"material": "PTFE", "thickness": 75, "unit": "um"},  
          {"material": "Copper", "thickness": 12, "unit": "um"},  
          {"material": "PI", "thickness": 50, "unit": "um"},  
          {"material": "Copper", "thickness": 18, "unit": "um"},  
          {"material": "CoverLay", "thickness": 25, "unit": "um"}  
        ],  
        "electrical_params": {  
          "insertion_loss": {"value": 0.35, "unit": "dB/inch", "frequency": "20GHz"},  
          "impedance": {"value": 50, "tolerance": 3, "unit": "ohm"},  
          "trace_width": {"value": 75, "unit": "um"},  
          "trace_spacing": {"value": 75, "unit": "um"},  
          "gnd_spacing": {"value": 150, "unit": "um"}  
        }  
      },  
      {  
        "id": "TYPE-B",  
        "name": "高速差分對FPC疊構",  
        "description": "適用於高速差分信號傳輸，提供優異的信號完整性",  
        "category": "高速差分",  
        "layers": [  
          {"material": "CoverLay", "thickness": 25, "unit": "um"},  
          {"material": "Copper", "thickness": 18, "unit": "um"},  
          {"material": "PTFE", "thickness": 100, "unit": "um"},  
          {"material": "Copper", "thickness": 18, "unit": "um"},  
          {"material": "PI", "thickness": 50, "unit": "um"},  
          {"material": "Copper", "thickness": 18, "unit": "um"},  
          {"material": "CoverLay", "thickness": 25, "unit": "um"}  
        ],  
        "electrical_params": {  
          "insertion_loss": {"value": 0.3, "unit": "dB/inch", "frequency": "25GHz"},  
          "diff_impedance": {"value": 100, "tolerance": 5, "unit": "ohm"},  
          "trace_width": {"value": 100, "unit": "um"},  
          "trace_spacing": {"value": 100, "unit": "um"},  
          "diff_pair_spacing": {"value": 200, "unit": "um"}  
        }  
      },  
      {  
        "id": "TYPE-C",  
        "name": "多層混合信號FPC疊構",  
        "description": "支持數字和模擬信號混合傳輸，具有良好的層間隔離",  
        "category": "混合信號",  
        "layers": [  
          {"material": "CoverLay", "thickness": 25, "unit": "um"},  
          {"material": "Copper", "thickness": 18, "unit": "um"},  
          {"material": "FR4", "thickness": 100, "unit": "um"},  
          {"material": "Copper", "thickness": 35, "unit": "um"},  
          {"material": "FR4", "thickness": 200, "unit": "um"},  
          {"material": "Copper", "thickness": 35, "unit": "um"},  
          {"material": "FR4", "thickness": 100, "unit": "um"},  
          {"material": "Copper", "thickness": 18, "unit": "um"},  
          {"material": "CoverLay", "thickness": 25, "unit": "um"}  
        ],  
        "electrical_params": {  
          "insertion_loss": {"value": 0.45, "unit": "dB/inch", "frequency": "10GHz"},  
          "impedance": {"value": 50, "tolerance": 5, "unit": "ohm"},  
          "trace_width": {"value": 125, "unit": "um"},  
          "trace_spacing": {"value": 125, "unit": "um"},  
          "power_plane_thickness": {"value": 35, "unit": "um"}  
        }  
      },  
      {  
        "id": "TYPE-D",  
        "name": "射頻RF FPC疊構",  
        "description": "專為RF信號傳輸優化，提供極低的損耗和出色的阻抗匹配",  
        "category": "射頻",  
        "layers": [  
          {"material": "Shield", "thickness": 18, "unit": "um"},  
          {"material": "PTFE", "thickness": 125, "unit": "um"},  
          {"material": "Copper", "thickness": 18, "unit": "um"},  
          {"material": "PTFE", "thickness": 200, "unit": "um"},  
          {"material": "Copper", "thickness": 18, "unit": "um"},  
          {"material": "CoverLay", "thickness": 25, "unit": "um"}  
        ],  
        "electrical_params": {  
          "insertion_loss": {"value": 0.25, "unit": "dB/inch", "frequency": "30GHz"},  
          "impedance": {"value": 50, "tolerance": 2, "unit": "ohm"},  
          "trace_width": {"value": 150, "unit": "um"},  
          "trace_spacing": {"value": 150, "unit": "um"},  
          "return_loss": {"value": -20, "unit": "dB"}  
        }  
      },  
      {  
        "id": "highfreq_4layer",  
        "name": "四層高頻 FPC",  
        "layers": [  
          { "material": "CoverLay", "thickness": 25, "unit": "um" },  
          { "material": "Copper", "thickness": 18, "unit": "um" },  
          { "material": "Adhesive", "thickness": 25, "unit": "um" },  
          { "material": "PI", "thickness": 25, "unit": "um" },  
          { "material": "Adhesive", "thickness": 25, "unit": "um" },  
          { "material": "Copper", "thickness": 18, "unit": "um" },  
          { "material": "Adhesive", "thickness": 25, "unit": "um" },  
          { "material": "PI", "thickness": 25, "unit": "um" },  
          { "material": "Adhesive", "thickness": 25, "unit": "um" },  
          { "material": "Copper", "thickness": 18, "unit": "um" },  
          { "material": "Adhesive", "thickness": 25, "unit": "um" },  
          { "material": "PI", "thickness": 25, "unit": "um" },  
          { "material": "Adhesive", "thickness": 25, "unit": "um" },  
          { "material": "Copper", "thickness": 18, "unit": "um" },  
          { "material": "CoverLay", "thickness": 25, "unit": "um" } 
        ],  
        "total_thickness": 347,  
        "description": "四層高頻設計，適用於複雜的高頻電路布局",  
        "electrical_params": {  
          "insertion_loss": {"value": 0.35, "unit": "dB/inch", "frequency": "30GHz"},  
          "impedance": {"value": 50, "tolerance": 3, "unit": "ohm"},  
          "trace_width": {"value": 100, "unit": "um"},  
          "trace_spacing": {"value": 100, "unit": "um"},  
          "return_loss": {"value": -18, "unit": "dB"}  
        }  
      },  
      {  
        "id": "rf_groundedcoplanar",  
        "name": "接地共面波導 FPC",  
        "layers": [  
          { "material": "CoverLay", "thickness": 25, "unit": "um" },  
          { "material": "Copper", "thickness": 18, "unit": "um" },  
          { "material": "Adhesive", "thickness": 25, "unit": "um" },  
          { "material": "PTFE", "thickness": 50, "unit": "um" },  
          { "material": "Adhesive", "thickness": 25, "unit": "um" },  
          { "material": "Copper", "thickness": 35, "unit": "um" }
        ],  
        "total_thickness": 178,  
        "description": "共面波導結構，適用於高頻信號傳輸和阻抗匹配",  
        "electrical_params": {  
          "insertion_loss": {"value": 0.22, "unit": "dB/inch", "frequency": "30GHz"},  
          "impedance": {"value": 50, "tolerance": 1.5, "unit": "ohm"},  
          "trace_width": {"value": 200, "unit": "um"},  
          "trace_spacing": {"value": 150, "unit": "um"},  
          "return_loss": {"value": -22, "unit": "dB"}  
        }  
      },  
      {  
        "id": "highfreq_impedance",  
        "name": "阻抗控制高頻 FPC",  
        "layers": [  
          { "material": "CoverLay", "thickness": 25, "unit": "um" },  
          { "material": "Copper", "thickness": 18, "unit": "um" },  
          { "material": "Adhesive", "thickness": 25, "unit": "um" },  
          { "material": "PI", "thickness": 75, "unit": "um" },  
          { "material": "Adhesive", "thickness": 25, "unit": "um" },  
          { "material": "Copper", "thickness": 35, "unit": "um" } 
        ],  
        "total_thickness": 203,  
        "description": "特殊設計的阻抗控制結構，適用於精確阻抗要求的高頻應用",  
        "electrical_params": {  
          "insertion_loss": {"value": 0.28, "unit": "dB/inch", "frequency": "30GHz"},  
          "impedance": {"value": 50, "tolerance": 1, "unit": "ohm"},  
          "trace_width": {"value": 175, "unit": "um"},  
          "trace_spacing": {"value": 175, "unit": "um"},  
          "return_loss": {"value": -25, "unit": "dB"}  
        }  
      },  
      {  
        "id": "rf_dualshield",  
        "name": "雙遮罩射頻 FPC",  
        "layers": [  
          { "material": "Shield", "thickness": 12, "unit": "um" },  
          { "material": "Adhesive", "thickness": 25, "unit": "um" },  
          { "material": "Copper", "thickness": 18, "unit": "um" },  
          { "material": "Adhesive", "thickness": 25, "unit": "um" },  
          { "material": "PI", "thickness": 50, "unit": "um" },  
          { "material": "Adhesive", "thickness": 25, "unit": "um" },  
          { "material": "Copper", "thickness": 18, "unit": "um" },  
          { "material": "Adhesive", "thickness": 25, "unit": "um" },  
          { "material": "Shield", "thickness": 12, "unit": "um" }
        ],  
        "total_thickness": 210,  
        "description": "雙層遮罩設計，提供優異的射頻屏蔽效果",  
        "electrical_params": {  
          "insertion_loss": {"value": 0.30, "unit": "dB/inch", "frequency": "30GHz"},  
          "impedance": {"value": 50, "tolerance": 2, "unit": "ohm"},  
          "trace_width": {"value": 125, "unit": "um"},  
          "trace_spacing": {"value": 125, "unit": "um"},  
          "return_loss": {"value": -23, "unit": "dB"}  
        }  
      },  
      {  
        "id": "highfreq_multilayer",  
        "name": "多層高頻混合 FPC",  
        "layers": [  
          { "material": "CoverLay", "thickness": 25, "unit": "um" },  
          { "material": "Copper", "thickness": 18, "unit": "um" },  
          { "material": "Adhesive", "thickness": 25, "unit": "um" },  
          { "material": "PI", "thickness": 25, "unit": "um" },  
          { "material": "Adhesive", "thickness": 25, "unit": "um" },  
          { "material": "Copper", "thickness": 35, "unit": "um" },  
          { "material": "Adhesive", "thickness": 25, "unit": "um" },  
          { "material": "PI", "thickness": 50, "unit": "um" },  
          { "material": "Adhesive", "thickness": 25, "unit": "um" },  
          { "material": "Copper", "thickness": 18, "unit": "um" },  
          { "material": "CoverLay", "thickness": 25, "unit": "um" }  
        ],  
        "total_thickness": 296,  
        "description": "多層混合結構，適用於高頻和一般信號混合應用",  
        "electrical_params": {  
          "insertion_loss": {"value": 0.32, "unit": "dB/inch", "frequency": "30GHz"},  
          "impedance": {"value": 50, "tolerance": 2.5, "unit": "ohm"},  
          "trace_width": {"value": 150, "unit": "um"},  
          "trace_spacing": {"value": 150, "unit": "um"},  
          "return_loss": {"value": -20, "unit": "dB"}  
        }  
      }  
    ]  
  }  

  const MaterialColor = {  
  "Adhesive": "#F0E68C",
  "CoverLay": "#98FB98",
  "Copper": "#B87333",
  "EMI": "#A9A9A9",
  "FR4": "#D2B48C",
  "LCP": "#DDA0DD",
  "PI": "#FFE4B5",
  "Prepreg": "#F5DEB3", 
  "PTFE": "#87CEEB",
  "Shield": "#808080",
  "Stiffener": "#DEB887"
  }  

  const MaterialNames = {
    "Adhesive": "膠層",
    "CoverLay": "覆蓋膜", 
    "Copper": "銅箔",
    "EMI": "EMI 層",
    "FR4": "FR4",
    "LCP": "LCP",
    "PI": "PI",
    "Prepreg": "預浸材料",
    "PTFE": "PTFE", 
    "Shield": "遮罩層",
    "Stiffener": "補強板"
  }  

  const MaterialGroups = {  
    "導體層": ["Copper","EMI"],  
    "介質層": ["PTFE", "PI", "FR4"],  
    "功能層": ["CoverLay", "Adhesive"]  
  }  

  const CategoryBadge = ({ category }) => {  
    const categoryColors = {  
      "高速單端": "bg-blue-100 text-blue-800",  
      "高速差分": "bg-green-100 text-green-800",  
      "混合信號": "bg-purple-100 text-purple-800",  
      "射頻": "bg-red-100 text-red-800"  
    }  

    return (  
      <span className={`px-2 py-1 rounded-full text-xs ${categoryColors[category] || 'bg-gray-100 text-gray-800'}`}>  
        {category}  
      </span>  
    )  
  }  

  const MaterialLegend = () => (  
    <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">  
      <div className="flex items-center justify-between mb-4">  
        <h3 className="font-medium text-lg">材料圖</h3>  
        <button  
          onClick={() => setShowLegend(false)}  
          className="text-gray-400 hover:text-gray-600"  
        >  
          <ChevronUp className="w-5 h-5" />  
        </button>  
      </div>  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">  
        {Object.entries(MaterialGroups).map(([groupName, materials]) => (  
          <div key={groupName}>  
            <h4 className="font-medium mb-2 text-gray-700">{groupName}</h4>  
            <div className="space-y-2">  
              {materials.map(material => (  
                <div key={material} className="flex items-center gap-2">  
                  <div  
                    className="w-6 h-6 rounded"  
                    style={{ backgroundColor: MaterialColor[material] }}  
                  />  
                  <span className="text-sm">{MaterialNames[material]}</span>  
                </div>  
              ))}  
            </div>  
          </div>  
        ))}  
      </div>  
    </div>  
  )  

  const StackupCard = ({ stackup }) => {  
    const isSelected = selectedStackup?.id === stackup.id  

    const getTotalThickness = (layers) => {  
      return layers.reduce((sum, layer) => sum + layer.thickness, 0)  
    }  

    return (  
      <div   
        className={`p-4 rounded-lg shadow-md cursor-pointer transition-all ${  
          isSelected ? 'bg-blue-50 ring-2 ring-blue-500' : 'bg-white hover:bg-gray-50'  
        }`}  
        onClick={() => setSelectedStackup(isSelected ? null : stackup)}  
      >  
        <div className="flex items-center justify-between mb-2">  
          <div className="space-y-1">  
            <h3 className="font-semibold text-lg">{stackup.name}</h3>  
            <CategoryBadge category={stackup.category} />  
          </div>  
          <Layers className="w-5 h-5 text-gray-500" />  
        </div>  
        
        <div className="flex flex-col gap-1 mb-4">  
          {stackup.layers.map((layer, index) => (  
            <div  
              key={index}  
              style={{   
                backgroundColor: MaterialColor[layer.material],  
                height: `${Math.max(8, layer.thickness / 10)}px`  
              }}  
              className="w-full rounded"  
              title={`${MaterialNames[layer.material]} (${layer.thickness}${layer.unit})`}  
            />  
          ))}  
        </div>  

        <div className="text-sm text-gray-500">  
          總厚度: {getTotalThickness(stackup.layers)}um  
        </div>  

        {isSelected && (  
          <div className="mt-4 space-y-2 text-sm">  
            <h4 className="font-medium">電氣特性：</h4>  
            <div className="grid grid-cols-2 gap-2">  
              <div>  
                <p className="text-gray-600">插入損耗：</p>  
                <p>{stackup.electrical_params.insertion_loss.value} {stackup.electrical_params.insertion_loss.unit}</p>  
                <p className="text-xs text-gray-500">@{stackup.electrical_params.insertion_loss.frequency}</p>  
              </div>  
              <div>  
                <p className="text-gray-600">阻抗：</p>  
                <p>  
                  {stackup.electrical_params.impedance?.value || stackup.electrical_params.diff_impedance?.value}  
                  ±{stackup.electrical_params.impedance?.tolerance || stackup.electrical_params.diff_impedance?.tolerance}Ω  
                  {stackup.electrical_params.diff_impedance ? ' (差分)' : ''}  
                </p>  
              </div>  
              <div>  
                <p className="text-gray-600">線寬：</p>  
                <p>{stackup.electrical_params.trace_width.value}{stackup.electrical_params.trace_width.unit}</p>  
              </div>  
              <div>  
                <p className="text-gray-600">線距：</p>  
                <p>{stackup.electrical_params.trace_spacing.value}{stackup.electrical_params.trace_spacing.unit}</p>  
              </div>  
              {stackup.electrical_params.diff_pair_spacing && (  
                <div>  
                  <p className="text-gray-600">差分對間距：</p>  
                  <p>{stackup.electrical_params.diff_pair_spacing.value}{stackup.electrical_params.diff_pair_spacing.unit}</p>  
                </div>  
              )}  
              {stackup.electrical_params.return_loss && (  
                <div>  
                  <p className="text-gray-600">回波損耗：</p>  
                  <p>{stackup.electrical_params.return_loss.value}{stackup.electrical_params.return_loss.unit}</p>  
                </div>  
              )}  
            </div>  
            <p className="text-gray-600 mt-2">{stackup.description}</p>  
          </div>  
        )}  

        <div className="mt-2 flex justify-center">  
          {isSelected ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}  
        </div>  
      </div>  
    )  
  }  

  const filteredStackups = stackups.stackups.filter(stackup =>   
    stackup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||  
    stackup.category.toLowerCase().includes(searchTerm.toLowerCase()) ||  
    stackup.description.toLowerCase().includes(searchTerm.toLowerCase())  
  )  

  const handleImageSearch = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageSearch(file)
    }
  }

  return (  
    <div className="p-6 max-w-7xl mx-auto">  
      <div className="flex justify-between items-center mb-6">  
        <div className="flex items-center gap-4">  
          <h2 className="text-2xl font-bold">FPC 疊構資料庫</h2>  
          {!showLegend && (  
            <button  
              onClick={() => setShowLegend(true)}  
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700"  
            >  
              <Info className="w-4 h-4" />  
              <span className="text-sm">顯示材料圖例</span>  
            </button>  
          )}  
        </div>  
        <div className="relative flex gap-2">
          <div className="relative">
            <input  
              type="text"  
              placeholder="搜尋疊構..."  
              value={searchTerm}  
              onChange={(e) => setSearchTerm(e.target.value)}  
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
            />  
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />  
          </div>
          
          <label className="cursor-pointer flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSearch}
              className="hidden"
            />
            <span>圖片搜尋</span>
          </label>
        </div>
      </div>  

      {showLegend && <MaterialLegend />}  

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">  
        {filteredStackups.map((stackup) => (  
          <StackupCard key={stackup.id} stackup={stackup} />  
        ))}  
      </div>  
    </div>  
  )  
} 