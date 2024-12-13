import React, { useState, useMemo, useCallback } from 'react';
import { Plus, Minus } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { MATERIALS_DATABASE } from '../constants/materials';

// 圖表顏色配置
const CHART_COLORS = {
    thickness: "rgba(74, 144, 226, 0.8)",
    dk: "rgba(80, 200, 120, 0.8)",
    df: "rgba(255, 107, 107, 0.8)",
    youngModulus: "rgba(155, 89, 182, 0.8)",
    peelStrength: "rgba(243, 156, 18, 0.8)"
};

const PARAMS_CONFIG = {
    thickness: {
        label: "厚度",
        unit: "mm",
        color: CHART_COLORS.thickness,
        decimals: 4
    },
    dk: {
        label: "介電常數",
        unit: "",
        color: CHART_COLORS.dk,
        decimals: 2
    },
    df: {
        label: "損耗因數",
        unit: "",
        color: CHART_COLORS.df,
        decimals: 4
    },
    youngModulus: {
        label: "楊氏係數",
        unit: "GPa",
        color: CHART_COLORS.youngModulus,
        decimals: 1
    },
    peelStrength: {
        label: "剝離力",
        unit: "N/mm",
        color: CHART_COLORS.peelStrength,
        decimals: 2
    }
};
const ALL_PARAMETERS = {  
    "型號": "name",  
    "厚度": "thickness",  
    "介電常數": "dk",  
    "損耗因數": "df",  
    "楊氏係數": "youngModulus",  
    "剝離力": "peelStrength",  
    "製造商": "manufacturer",  
    "評估需求": "evaluation",  
    "評估日期": "evaluationDate",  
    "生產日期": "productionDate",  
    "有效日期": "expiryDate",  
    "滾縮": "rolling"  
}; 

// 輔助函數
const formatValue = (value, decimals) => {
    return Number(value).toFixed(decimals);
};

// 子組件
const MaterialParameter = ({ label, value, unit, decimals = 2 }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
        <label className="block text-sm font-medium text-gray-500">{label}</label>
        <span className="text-lg font-semibold">
            {value ? `${formatValue(value, decimals)}${unit ? ` ${unit}` : ''}` : 'N/A'}
        </span>
    </div>
);

const LayerEditor = ({ layer, index, onUpdate, onRemove }) => (
    <div className="flex items-center space-x-4 p-2 bg-gray-50 rounded-lg">
        <span className="text-sm font-medium w-8">#{index + 1}</span>
        <div className="flex-1 grid grid-cols-2 gap-2">
            <select
                value={layer.type}
                onChange={(e) => onUpdate(index, 'type', e.target.value)}
                className="block w-full rounded-md border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
                {Object.entries(MATERIALS_DATABASE).map(([key, value]) => (
                    <option key={key} value={key}>{value.displayName}</option>
                ))}
            </select>
            <select
                value={layer.material.name}
                onChange={(e) => onUpdate(index, 'material', e.target.value)}
                className="block w-full rounded-md border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
                {MATERIALS_DATABASE[layer.type].categories.map(material => (
                    <option key={material.name} value={material.name}>
                        {material.name}
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
);

const MaterialStackApp = () => {
    // 狀態管理
    const [layers, setLayers] = useState([{
        type: "FCCL",
        material: MATERIALS_DATABASE["FCCL"].categories[0]
    }]);

    const [selectedParams, setSelectedParams] = useState({
        thickness: true,
        dk: true,
        df: true,
        youngModulus: true,
        peelStrength: true
    });
    // 新增的狀態  
    const [selectedMaterials, setSelectedMaterials] = useState(Object.keys(MATERIALS_DATABASE));  
    const [selectedParameters, setSelectedParameters] = useState(Object.keys(ALL_PARAMETERS));  
    const [activeTab, setActiveTab] = useState('stack'); // 'stack' 或 'table'  

    // 計算派生值
    const calculations = useMemo(() => {
        const totalThickness = layers.reduce((sum, layer) => sum + layer.material.thickness, 0);
        
        const effectiveDk = layers.reduce((sum, layer) => {
            const weight = layer.material.thickness / totalThickness;
            return sum + (layer.material.dk * weight);
        }, 0);

        const effectiveDf = layers.reduce((sum, layer) => {
            const weight = layer.material.thickness / totalThickness;
            return sum + (layer.material.df * weight);
        }, 0);

        return {
            totalThickness,
            effectiveDk,
            effectiveDf
        };
    }, [layers]);

    // 圖表數據
    const chartData = useMemo(() =>
        layers.map((layer, index) => ({
            name: `Layer ${index + 1}`,
            ...Object.keys(PARAMS_CONFIG).reduce((acc, key) => ({
                ...acc,
                [key]: layer.material[key]
            }), {})
        })),
        [layers]
    );

    // 事件處理
    const handleAddLayer = useCallback(() => {
        setLayers(prev => [...prev, {
            type: "FCCL",
            material: MATERIALS_DATABASE["FCCL"].categories[0]
        }]);
    }, []);

    const handleRemoveLayer = useCallback((index) => {
        if (layers.length > 1) {
            setLayers(prev => prev.filter((_, i) => i !== index));
        }
    }, [layers.length]);

    const handleLayerUpdate = useCallback((index, field, value) => {
        setLayers(prev => prev.map((layer, i) => {
            if (i !== index) return layer;
            
            if (field === 'type') {
                return {
                    type: value,
                    material: MATERIALS_DATABASE[value].categories[0]
                };
            } else if (field === 'material') {
                return {
                    ...layer,
                    material: MATERIALS_DATABASE[layer.type].categories
                        .find(m => m.name === value)
                };
            }
            return layer;
        }));
    }, []);

    const handleParamToggle = useCallback((param) => {
        setSelectedParams(prev => ({
            ...prev,
            [param]: !prev[param]
        }));
    }, []);
    // 新增的功能函數  
    const handleMaterialChange = (material) => {  
        setSelectedMaterials(prev =>  
            prev.includes(material)  
                ? prev.filter(m => m !== material)  
                : [...prev, material]  
        );  
    };  

    const handleParameterChange = (parameter) => {  
        setSelectedParameters(prev =>  
            prev.includes(parameter)  
                ? prev.filter(p => p !== parameter)  
                : [...prev, parameter]  
        );  
    };  

    const getCurrentDate = () => {  
        const date = new Date();  
        return date.toISOString().split('T')[0];  
    };  

    const getExpiryDate = () => {  
        const date = new Date();  
        date.setFullYear(date.getFullYear() + 1);  
        return date.toISOString().split('T')[0];  
    };  

    const getDisplayColumns = () => {  
        const baseColumns = ["材料種類"];  
        return [...baseColumns, ...selectedParameters];  
    };  

        return (  
            <div className="container mx-auto px-4 py-8 space-y-8">  
                {/* 頁籤切換 */}  
                <div className="flex space-x-4 border-b">  
                    <button  
                        className={`px-4 py-2 font-medium ${  
                            activeTab === 'stack'   
                                ? 'border-b-2 border-blue-500 text-blue-600'   
                                : 'text-gray-600 hover:text-gray-800'  
                        }`}  
                        onClick={() => setActiveTab('stack')}  
                    >  
                        疊構設計  
                    </button>  
                    <button  
                        className={`px-4 py-2 font-medium ${  
                            activeTab === 'table'   
                                ? 'border-b-2 border-blue-500 text-blue-600'   
                                : 'text-gray-600 hover:text-gray-800'  
                        }`}  
                        onClick={() => setActiveTab('table')}  
                    >  
                        材料總表  
                    </button>  
                </div>  
    
                {activeTab === 'stack' ? (  
                    // 疊構設計頁面  
                    <div className="space-y-8">  
                        {/* 材料參數面板 */}  
                        <div className="bg-white rounded-lg shadow-lg p-6">  
                            <h2 className="text-xl font-semibold mb-4">材料參數</h2>  
                            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">  
                                <div>  
                                    <label className="block text-sm font-medium text-gray-700 mb-2">  
                                        材料類型  
                                    </label>  
                                    <select  
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"  
                                        value={layers[0].type}  
                                        onChange={(e) => handleLayerUpdate(0, 'type', e.target.value)}  
                                    >  
                                        {Object.entries(MATERIALS_DATABASE).map(([key, value]) => (  
                                            <option key={key} value={key}>  
                                                {value.displayName}  
                                            </option>  
                                        ))}  
                                    </select>  
                                </div>  
                                <div>  
                                    <label className="block text-sm font-medium text-gray-700 mb-2">  
                                        具體型號  
                                    </label>  
                                    <select  
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"  
                                        value={layers[0].material.name}  
                                        onChange={(e) => handleLayerUpdate(0, 'material', e.target.value)}  
                                    >  
                                        {MATERIALS_DATABASE[layers[0].type].categories.map((material) => (  
                                            <option key={material.name} value={material.name}>  
                                                {material.name}  
                                            </option>  
                                        ))}  
                                    </select>  
                                </div>  
                            </div>  
    
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">  
                                {Object.entries(PARAMS_CONFIG).map(([key, config]) => (  
                                    <MaterialParameter  
                                        key={key}  
                                        label={config.label}  
                                        value={layers[0].material[key]}  
                                        unit={config.unit}  
                                        decimals={config.decimals}  
                                    />  
                                ))}  
                            </div>  
                        </div>  
    
                        {/* 疊構設計區域 */}  
                        <div className="bg-white rounded-lg shadow-lg p-6">  
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">  
                                {/* 左側：疊構設計 */}  
                                <div className="space-y-4">  
                                    <div className="flex justify-between items-center">  
                                        <h2 className="text-xl font-semibold">疊構設計</h2>  
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
                                                    {formatValue(layer.material.thickness, 4)} mm  
                                                </span>  
                                            </div>  
                                        ))}  
                                    </div>  
                                </div>  
                            </div>  
    
                            {/* 計算結果 */}  
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">  
                                <div className="bg-gray-50 p-4 rounded-lg">  
                                    <span className="text-sm text-gray-600">總厚度：</span>  
                                    <span className="font-semibold">  
                                        {formatValue(calculations.totalThickness, 4)} mm  
                                    </span>  
                                </div>  
                                <div className="bg-gray-50 p-4 rounded-lg">  
                                    <span className="text-sm text-gray-600">等效介電常數：</span>  
                                    <span className="font-semibold">  
                                        {formatValue(calculations.effectiveDk, 2)}  
                                    </span>  
                                </div>  
                                <div className="bg-gray-50 p-4 rounded-lg">  
                                    <span className="text-sm text-gray-600">等效損耗因數：</span>  
                                    <span className="font-semibold">  
                                        {formatValue(calculations.effectiveDf, 4)}  
                                    </span>  
                                </div>  
                            </div>  
                        </div>  
    
                        {/* 參數分析 */}  
                        <div className="bg-white rounded-lg shadow-lg p-6">  
                            <h2 className="text-xl font-semibold mb-4">參數分析</h2>  
                            <div className="mb-4 flex flex-wrap gap-4">  
                                {Object.entries(PARAMS_CONFIG).map(([key, config]) => (  
                                    <label key={key} className="inline-flex items-center">  
                                        <input  
                                            type="checkbox"  
                                            className="form-checkbox h-5 w-5 text-blue-600 rounded"  
                                            checked={selectedParams[key]}  
                                            onChange={() => handleParamToggle(key)}  
                                        />  
                                        <span  
                                            className="ml-2 flex items-center gap-2"  
                                            style={{ color: config.color }}  
                                        >  
                                            {config.label}  
                                            {config.unit && (  
                                                <span className="text-gray-500 text-sm">  
                                                    ({config.unit})  
                                                </span>  
                                            )}  
                                        </span>  
                                    </label>  
                                ))}  
                            </div>  
    
                            <div className="h-96">  
                                <ResponsiveContainer width="100%" height="100%">  
                                    <BarChart data={chartData}>  
                                        <CartesianGrid strokeDasharray="3 3" />  
                                        <XAxis dataKey="name" />  
                                        <YAxis />  
                                        <Tooltip />  
                                        <Legend />  
                                        {Object.entries(PARAMS_CONFIG)  
                                            .filter(([key]) => selectedParams[key])  
                                            .map(([key, config]) => (  
                                                <Bar  
                                                    key={key}  
                                                    dataKey={key}  
                                                    name={`${config.label}${config.unit ? ` (${config.unit})` : ''}`}  
                                                    fill={config.color}  
                                                />  
                                            ))}  
                                    </BarChart>  
                                </ResponsiveContainer>  
                            </div>  
                        </div>  
                    </div>  
                ) : (  
                    // 材料總表頁面  
                    <div className="space-y-6">  
                        {/* 篩選器區域 */}  
                        <div className="space-y-4">  
                            {/* 材料選擇器 */}  
                            <div className="bg-white p-4 rounded-lg shadow">  
                                <h3 className="font-semibold mb-2 text-lg">選擇材料種類</h3>  
                                <div className="flex flex-wrap gap-3">  
                                    {Object.entries(MATERIALS_DATABASE).map(([key, value]) => (  
                                        <label key={key} className="inline-flex items-center bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 cursor-pointer">  
                                            <input  
                                                type="checkbox"  
                                                checked={selectedMaterials.includes(key)}  
                                                onChange={() => handleMaterialChange(key)}  
                                                className="form-checkbox h-5 w-5 text-blue-600 rounded"  
                                            />  
                                            <span className="ml-2 text-gray-700">{value.displayName || key}</span>  
                                        </label>  
                                    ))}  
                                </div>  
                            </div>  
    
                            {/* 參數選擇器 */}  
                            <div className="bg-white p-4 rounded-lg shadow">  
                                <h3 className="font-semibold mb-2 text-lg">選擇顯示參數</h3>  
                                <div className="flex flex-wrap gap-3">  
                                    {Object.keys(ALL_PARAMETERS).map(parameter => (  
                                        <label key={parameter} className="inline-flex items-center bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 cursor-pointer">  
                                            <input  
                                                type="checkbox"  
                                                checked={selectedParameters.includes(parameter)}  
                                                onChange={() => handleParameterChange(parameter)}  
                                                className="form-checkbox h-5 w-5 text-blue-600 rounded"  
                                            />  
                                            <span className="ml-2 text-gray-700">{parameter}</span>  
                                        </label>  
                                    ))}  
                                </div>  
                            </div>  
                        </div>  
    
                        {/* 材料資料表 */}  
                        <div className="bg-white p-4 rounded-lg shadow">  
                            <h3 className="font-semibold mb-4 text-lg">參數表格</h3>  
                            <div className="overflow-x-auto">  
                                <table className="min-w-full border-collapse">  
                                    <thead className="bg-gray-50">  
                                        <tr>  
                                            {getDisplayColumns().map((column, index) => (  
                                                <th key={index} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">  
                                                    {column}  
                                                </th>  
                                            ))}  
                                        </tr>  
                                    </thead>  
                                    <tbody>  
                                        {Object.entries(MATERIALS_DATABASE)  
                                            .filter(([key]) => selectedMaterials.includes(key))  
                                            .map(([category, data], categoryIndex) => (  
                                                data.categories.map((material, modelIndex) => (  
                                                    <tr   
                                                        key={`${categoryIndex}-${modelIndex}`}  
                                                        className={`${(categoryIndex + modelIndex) % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}  
                                                    >  
                                                        <td className="px-4 py-3 border-b text-sm font-medium text-gray-900">  
                                                            {modelIndex === 0 ? data.displayName || category : ''}  
                                                        </td>  
                                                        {selectedParameters.map((param, index) => {  
                                                            const value = material[ALL_PARAMETERS[param]];  
                                                            return (  
                                                                <td key={index} className="px-4 py-3 border-b text-sm text-gray-500">  
                                                                    {param === "評估需求" ? "待評估" :  
                                                                        param === "評估日期" ? getCurrentDate() :  
                                                                            param === "生產日期" ? getCurrentDate() :  
                                                                                param === "有效日期" ? getExpiryDate() :  
                                                                                    param === "滾縮" ? "✓" :  
                                                                                        param === "剝離力" ? formatValue(value, 2) :  
                                                                                            param === "厚度" ? formatValue(value, 4) :  
                                                                                                param === "介電常數" ? formatValue(value, 2) :  
                                                                                                    param === "損耗因數" ? formatValue(value, 4) :  
                                                                                                        param === "楊氏係數" ? formatValue(value, 1) :  
                                                                                                            value}  
                                                                </td>  
                                                            );  
                                                        })}  
                                                    </tr>  
                                                ))  
                                            ))}  
                                    </tbody>  
                                </table>  
                            </div>  
                        </div>  
                    </div>  
                )}  
            </div>  
        );  
    };  
    
    export default MaterialStackApp;  