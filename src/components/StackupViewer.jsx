import { useState } from 'react'  
import { ChevronDown, ChevronUp, Layers, Search, Info } from 'lucide-react'  

export default function EnhancedFPCStackupViewer() {  
  const [selectedStackup, setSelectedStackup] = useState(null)  
  const [searchTerm, setSearchTerm] = useState("")  
  const [showLegend, setShowLegend] = useState(false)  
  
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
          {"material": "EMI_Shield", "thickness": 12, "unit": "um"},  
          {"material": "PTFE_LowDk", "thickness": 75, "unit": "um"},  
          {"material": "Copper_Signal", "thickness": 12, "unit": "um"},  
          {"material": "PI_Core", "thickness": 50, "unit": "um"},  
          {"material": "Copper_Ground", "thickness": 18, "unit": "um"},  
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
          {"material": "Copper_DiffPair", "thickness": 18, "unit": "um"},  
          {"material": "PTFE_UltraLowLoss", "thickness": 100, "unit": "um"},  
          {"material": "Copper_Ground", "thickness": 18, "unit": "um"},  
          {"material": "PI_Core", "thickness": 50, "unit": "um"},  
          {"material": "Copper_Ground", "thickness": 18, "unit": "um"},  
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
          {"material": "Copper_Signal", "thickness": 18, "unit": "um"},  
          {"material": "FR4_LowLoss", "thickness": 100, "unit": "um"},  
          {"material": "Copper_Power", "thickness": 35, "unit": "um"},  
          {"material": "FR4_Core", "thickness": 200, "unit": "um"},  
          {"material": "Copper_Ground", "thickness": 35, "unit": "um"},  
          {"material": "FR4_LowLoss", "thickness": 100, "unit": "um"},  
          {"material": "Copper_Signal", "thickness": 18, "unit": "um"},  
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
          {"material": "EMI_Shield", "thickness": 18, "unit": "um"},  
          {"material": "PTFE_UltraLowLoss", "thickness": 125, "unit": "um"},  
          {"material": "Copper_Signal", "thickness": 18, "unit": "um"},  
          {"material": "PTFE_Core", "thickness": 200, "unit": "um"},  
          {"material": "Copper_Ground", "thickness": 18, "unit": "um"},  
          {"material": "CoverLay", "thickness": 25, "unit": "um"}  
        ],  
        "electrical_params": {  
          "insertion_loss": {"value": 0.25, "unit": "dB/inch", "frequency": "30GHz"},  
          "impedance": {"value": 50, "tolerance": 2, "unit": "ohm"},  
          "trace_width": {"value": 150, "unit": "um"},  
          "trace_spacing": {"value": 150, "unit": "um"},  
          "return_loss": {"value": -20, "unit": "dB"}  
        }  
      }  
    ]  
  }  

  const MaterialColor = {  
    "EMI_Shield": "#C0C0C0",  
    "PTFE_LowDk": "#E6E6FA",  
    "Copper_Signal": "#CD7F32",  
    "PI_Core": "#FFA07A",  
    "Copper_Ground": "#CD7F32",  
    "CoverLay": "#90EE90",  
    "FR4_LowLoss": "#98FB98",  
    "Copper_DiffPair": "#CD7F32",  
    "PI_Film": "#FFA07A",  
    "Adhesive": "#FFEB3B",  
    "PTFE": "#E6E6FA",  
    "FR4_Core": "#98FB98",  
    "Copper_Power": "#CD7F32",  
    "PTFE_UltraLowLoss": "#E6E6FA",  
    "PTFE_Core": "#E6E6FA"  
  }  

  const MaterialNames = {  
    "EMI_Shield": "EMI屏蔽層",  
    "PTFE_LowDk": "低介電常數PTFE",  
    "Copper_Signal": "信號銅箔層",  
    "PI_Core": "聚醯亞胺芯層",  
    "Copper_Ground": "接地銅箔層",  
    "CoverLay": "保護層",  
    "FR4_LowLoss": "低損耗FR4",  
    "Copper_DiffPair": "差分對銅箔層",  
    "PI_Film": "聚醯亞胺薄膜",  
    "Adhesive": "黏著劑層",  
    "PTFE": "聚四氟乙烯",  
    "FR4_Core": "FR4芯層",  
    "Copper_Power": "電源銅箔層",  
    "PTFE_UltraLowLoss": "超低損耗PTFE",  
    "PTFE_Core": "PTFE芯層"  
  }  

  const MaterialGroups = {  
    "導體層": ["Copper_Signal", "Copper_Ground", "Copper_DiffPair", "Copper_Power", "EMI_Shield"],  
    "介質層": ["PTFE_LowDk", "PI_Core", "FR4_LowLoss", "PTFE", "FR4_Core", "PTFE_UltraLowLoss", "PTFE_Core"],  
    "功能層": ["CoverLay", "PI_Film", "Adhesive"]  
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
        <h3 className="font-medium text-lg">材料圖例</h3>  
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