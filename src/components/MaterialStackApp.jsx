import { useState, useMemo } from 'react';
import { Plus, Minus, MoveUp, MoveDown, Download } from 'lucide-react';
import { STACKUP_DATABASE, MATERIAL_COLORS, getLayerWithProperties, getStackupWithMaterials } from '../constants/stackupmaterials';
import { MATERIALS_DATABASE } from '../constants/materials';

const StackupSelector = ({ onSelect }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      選擇預定義疊構
    </label>
    <select
      onChange={(e) => onSelect(e.target.value)}
      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">自定義疊構</option>
      {STACKUP_DATABASE.stackups.map((stackup) => (
        <option key={stackup.id} value={stackup.id}>
          {stackup.name} - {stackup.category}
        </option>
      ))}
    </select>
  </div>
);

const formatValue = (value, decimals = 2) => {
  if (typeof value !== 'number' || isNaN(value)) return '-';
  return value.toFixed(decimals);
};

const isLightColor = (hexColor) => {
  if (!hexColor) return true;
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
};

const MaterialStackApp = () => {
  const [layers, setLayers] = useState([]);
  const [stackupInfo, setStackupInfo] = useState({
    name: "自定義疊構",
    description: "",
    category: "",
    electrical_params: {}
  });

  const calculations = useMemo(() => {
    const layersWithProperties = layers.map(layer => getLayerWithProperties(layer));
    const totalThickness = layersWithProperties.reduce((sum, layer) =>
      sum + (layer?.material?.thickness || 0), 0);
    const effectiveDk = layersWithProperties.reduce((sum, layer) => {
      if (layer?.material?.dk) {
        const weight = layer.material.thickness / totalThickness;
        return sum + (layer.material.dk * weight);
      }
      return sum;
    }, 0);
    const effectiveDf = layersWithProperties.reduce((sum, layer) => {
      if (layer?.material?.df) {
        const weight = layer.material.thickness / totalThickness;
        return sum + (layer.material.df * weight);
      }
      return sum;
    }, 0);
    return {
      totalThickness,
      effectiveDk,
      effectiveDf,
    };
  }, [layers]);

  const handleAddLayer = () => {
    setLayers(prev => [
      ...prev,
      {
        type: Object.keys(MATERIALS_DATABASE)[0],
        materialName: MATERIALS_DATABASE[Object.keys(MATERIALS_DATABASE)[0]].categories[0].name,
        description: `層 ${prev.length + 1}`
      }
    ]);
  };

  const handleRemoveLayer = (index) => {
    if (layers.length > 1) {
      setLayers(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleLayerUpdate = (index, field, value) => {
    setLayers(prev => prev.map((layer, i) => {
      if (i !== index) return layer;
      if (field === 'type') {
        return {
          type: value,
          materialName: MATERIALS_DATABASE[value].categories[0].name,
          description: layer.description
        };
      }
      return { ...layer, [field]: value };
    }));
  };

  const handleLayerMove = (index, direction) => {
    setLayers(prev => {
      const newLayers = [...prev];
      if (direction === 'up' && index > 0) {
        [newLayers[index], newLayers[index - 1]] = [newLayers[index - 1], newLayers[index]];
      } else if (direction === 'down' && index < newLayers.length - 1) {
        [newLayers[index], newLayers[index + 1]] = [newLayers[index + 1], newLayers[index]];
      }
      return newLayers;
    });
  };

  const handleExport = () => {
    const prepareCSVContent = () => {
      const rows = [];
      rows.push(['疊構信息']);
      rows.push(['名稱', stackupInfo.name]);
      rows.push(['描述', stackupInfo.description]);
      rows.push(['類別', stackupInfo.category]);
      rows.push([]);
      rows.push(['層級信息']);
      rows.push(['層號', '類型', '材料名稱', '描述']);
      layers.forEach((layer, index) => {
        rows.push([
          index + 1,
          layer.type,
          layer.materialName,
          layer.description
        ]);
      });
      rows.push([]);
      rows.push(['電氣參數']);
      rows.push(['參數名稱', '數值', '單位', '公差']);
      Object.entries(stackupInfo.electrical_params).forEach(([key, value]) => {
        if (typeof value === 'object') {
          rows.push([
            key,
            value.value,
            value.unit || '',
            value.tolerance || ''
          ]);
        } else {
          rows.push([key, value, '', '']);
        }
      });
      rows.push([]);
      rows.push(['計算結果']);
      rows.push([
        '總厚度', `${formatValue(calculations.totalThickness)} µm`,
        '有效介電常數 (Dk)', formatValue(calculations.effectiveDk),
        '有效損耗因數 (Df)', formatValue(calculations.effectiveDf, 4)
      ]);
      return rows.map(row =>
        row.map(cell =>
          typeof cell === 'string' && (cell.includes(',') || cell.includes('\n') || cell.includes('"'))
            ? `"${cell.replace(/"/g, '""')}"`
            : cell
        ).join(',')
      ).join('\n');
    };

    const BOM = '\uFEFF';
    const csvContent = BOM + prepareCSVContent();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${stackupInfo.name || 'stackup'}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleStackupSelect = (stackupId) => {
    if (!stackupId) {
      setLayers([{
        type: "Cu",
        materialName: "MITSUI LD",
        description: "頂層"
      }]);
      setStackupInfo({
        name: "自定義疊構",
        description: "",
        category: "",
        electrical_params: {}
      });
      return;
    }
    const stackupWithMaterials = getStackupWithMaterials(stackupId);
    if (stackupWithMaterials) {
      setLayers(stackupWithMaterials.layers);
      setStackupInfo({
        name: stackupWithMaterials.name,
        description: stackupWithMaterials.description,
        category: stackupWithMaterials.category,
        electrical_params: stackupWithMaterials.electrical_params
      });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{stackupInfo.name}</h2>
          {stackupInfo.description && (
            <p className="text-gray-600 mt-1">{stackupInfo.description}</p>
          )}
          {stackupInfo.category && (
            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {stackupInfo.category}
            </span>
          )}
        </div>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <Download size={16} className="mr-2" />
          導出數據
        </button>
      </div>
      <StackupSelector onSelect={handleStackupSelect} />

      {Object.keys(stackupInfo.electrical_params).length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">電氣參數</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(stackupInfo.electrical_params).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                <span className="text-sm font-medium text-gray-700">{key}:</span>
                <span className="text-sm text-gray-600">
                  {typeof value === 'object'
                    ? `${value.value} ${value.unit}${value.tolerance ? ` ±${value.tolerance}` : ''}`
                    : value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">計算結果</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <span className="text-sm font-medium text-gray-700">總厚度:</span>
            <span className="text-sm text-gray-600">
              {formatValue(calculations.totalThickness)} µm
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <span className="text-sm font-medium text-gray-700">有效介電常數 (Dk):</span>
            <span className="text-sm text-gray-600">
              {formatValue(calculations.effectiveDk)}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <span className="text-sm font-medium text-gray-700">有效損耗因數 (Df):</span>
            <span className="text-sm text-gray-600">
              {formatValue(calculations.effectiveDf, 4)}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">疊構編輯</h3>
            <button
              onClick={handleAddLayer}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="p-4 space-y-2">
            {layers.map((layer, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center space-y-1 w-8">
                  <span className="text-sm font-medium">#{index + 1}</span>
                  {layers.length > 1 && (
                    <div className="flex flex-col space-y-1">
                      {index > 0 && (
                        <button
                          onClick={() => handleLayerMove(index, 'up')}
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded-md"
                        >
                          <MoveUp size={12} />
                        </button>
                      )}
                      {index < layers.length - 1 && (
                        <button
                          onClick={() => handleLayerMove(index, 'down')}
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded-md"
                        >
                          <MoveDown size={12} />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex-1 grid grid-cols-3 gap-4">
                  <select
                    value={layer.type}
                    onChange={(e) => handleLayerUpdate(index, 'type', e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.keys(MATERIALS_DATABASE).map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  <select
                    value={layer.materialName}
                    onChange={(e) => handleLayerUpdate(index, 'materialName', e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {MATERIALS_DATABASE[layer.type].categories.map(material => (
                      <option key={material.name} value={material.name}>
                        {material.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={layer.description || ''}
                    onChange={(e) => handleLayerUpdate(index, 'description', e.target.value)}
                    placeholder="描述"
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {index > 0 && (
                  <button
                    className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                    onClick={() => handleRemoveLayer(index)}
                  >
                    <Minus size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">疊構視覺化</h3>
          </div>
          <div className="px-4 pb-4 pt-2">
            <div className="space-y-[0.5px] mb-6">
              {layers.map((layer, index) => (
                <div
                  key={index}
                  className="w-full rounded-sm flex items-center justify-between px-4 transition-all duration-200 hover:scale-x-[1.02]"
                  style={{
                    backgroundColor: MATERIAL_COLORS[layer.type] || '#e5e7eb',
                    height: '40px',
                    border: '1px solid #ddd',
                    color: isLightColor(MATERIAL_COLORS[layer.type]) ? '#000' : '#fff',
                  }}
                >
                  <span className="text-sm font-medium">{layer.materialName}</span>
                  <span className="text-sm">{layer.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialStackApp;
