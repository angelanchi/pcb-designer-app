import { useState, useMemo } from 'react'
import { Plus, Minus } from 'lucide-react'

// 從文件導入材料數據
import { MATERIALS_DATABASE } from '../constants/materials'; 

const formatValue = (value, digits = 2) => {
  return Number(value).toFixed(digits)
}

const LayerEditor = ({ layer, index, onUpdate, onRemove }) => (
  <div className="flex items-center space-x-4 p-2 bg-gray-50 rounded-lg">
    <span className="text-sm font-medium w-8">#{index + 1}</span>
    <div className="flex-1 grid grid-cols-2 gap-2">
      <select
        value={layer.type}
        onChange={(e) => onUpdate(index, 'type', e.target.value)}
        className="block w-full rounded-md border-gray-300 text-sm"
      >
        {Object.entries(MATERIALS_DATABASE).map(([key, value]) => (
          <option key={key} value={key}>{value.displayName}</option>
        ))}
      </select>
      <select
        value={layer.material.name}
        onChange={(e) => onUpdate(index, 'material', e.target.value)}
        className="block w-full rounded-md border-gray-300 text-sm"
      >
        {MATERIALS_DATABASE[layer.type].categories.map(material => (
          <option key={material.name} value={material.name}>
            {material.name} ({material.thickness}µm)
          </option>
        ))}
      </select>
    </div>
    {index > 0 && (
      <button
        onClick={() => onRemove(index)}
        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
      >
        <Minus className="h-4 w-4" />
      </button>
    )}
  </div>
)
// MaterialStackApp.jsx  
const MaterialStackApp = () => { 
  // 初始化第一層使用外部材料數據
  const [layers, setLayers] = useState([
    { 
      type: Object.keys(MATERIALS_DATABASE)[0],
      material: MATERIALS_DATABASE[Object.keys(MATERIALS_DATABASE)[0]].categories[0]
    }
  ])

  // 計算派生值
  const calculations = useMemo(() => {
    const totalThickness = layers.reduce((sum, layer) => sum + layer.material.thickness, 0)
    
    const effectiveDk = layers.reduce((sum, layer) => {
      const weight = layer.material.thickness / totalThickness
      return sum + (layer.material.dk * weight)
    }, 0)

    const effectiveDf = layers.reduce((sum, layer) => {
      const weight = layer.material.thickness / totalThickness
      return sum + (layer.material.df * weight)
    }, 0)

    return {
      totalThickness,
      effectiveDk,
      effectiveDf
    }
  }, [layers])

  const handleAddLayer = () => {
    setLayers(prev => [...prev, {
      type: Object.keys(MATERIALS_DATABASE)[0],
      material: MATERIALS_DATABASE[Object.keys(MATERIALS_DATABASE)[0]].categories[0]
    }])
  }

  const handleRemoveLayer = (index) => {
    if (layers.length > 1) {
      setLayers(prev => prev.filter((_, i) => i !== index))
    }
  }

  const handleLayerUpdate = (index, field, value) => {
    setLayers(prev => prev.map((layer, i) => {
      if (i !== index) return layer
      
      if (field === 'type') {
        return {
          type: value,
          material: MATERIALS_DATABASE[value].categories[0]
        }
      } else if (field === 'material') {
        return {
          ...layer,
          material: MATERIALS_DATABASE[layer.type].categories
            .find(m => m.name === value)
        }
      }
      return layer
    }))
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">疊構設計tool</h2>
      
      {/* 疊構設計區域 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左側：疊構設計 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">疊構編輯</h3>
              <button
                onClick={handleAddLayer}
                className="p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2">
              {layers.map((layer, index) => (
                <LayerEditor
                  key={index}
                  layer={layer}
                  index={index}
                  onUpdate={handleLayerUpdate}
                  onRemove={handleRemoveLayer}
                />
              ))}
            </div>
          </div>

          {/* 右側：疊構視覺化 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">疊構視覺化</h3>
            <div className="space-y-1">
              {layers.map((layer, index) => (
                <div
                  key={index}
                  className="w-full rounded-sm flex items-center justify-between px-4"
                  style={{
                    backgroundColor: layer.material.color,
                    height: `${Math.max(40, layer.material.thickness / 2)}px`,
                    border: '1px solid #ddd'
                  }}
                >
                  <span className="text-sm font-medium">
                    {layer.material.name}
                  </span>
                  <span className="text-sm">
                    {layer.material.thickness} µm
                  </span>
                </div>
              ))}
            </div>

            {/* 計算結果顯示 */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">疊構特性</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>總厚度：</span>
                  <span>{formatValue(calculations.totalThickness)} µm</span>
                </div>
                <div className="flex justify-between">
                  <span>有效介電常數 (Dk)：</span>
                  <span>{formatValue(calculations.effectiveDk)}</span>
                </div>
                <div className="flex justify-between">
                  <span>有效損耗因數 (Df)：</span>
                  <span>{formatValue(calculations.effectiveDf, 4)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MaterialStackApp; 