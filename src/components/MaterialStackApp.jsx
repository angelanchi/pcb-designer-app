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
        color: CHART_COLORS.thickness  
    },  
    dk: {  
        label: "介電常數",  
        unit: "",  
        color: CHART_COLORS.dk  
    },  
    df: {  
        label: "損耗因數",  
        unit: "",  
        color: CHART_COLORS.df  
    },  
    youngModulus: {  
        label: "楊氏係數",  
        unit: "GPa",  
        color: CHART_COLORS.youngModulus  
    },  
    peelStrength: {  
        label: "剝離力",  
        unit: "N/mm",  
        color: CHART_COLORS.peelStrength  
    }  
};    

const MaterialStackApp = () => {  
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

    // Calculate total thickness  
    const calculatedTotalThickness = useMemo(() =>  
        layers.reduce((sum, layer) => sum + layer.material.thickness, 0),  
        [layers]  
    );  

    // Calculate effective dielectric constant  
    const calculateEffectiveDk = useCallback(() => {  
        const totalThickness = layers.reduce((sum, layer) => sum + layer.material.thickness, 0);  
        const weightedDk = layers.reduce((sum, layer) => {  
            const weight = layer.material.thickness / totalThickness;  
            return sum + (layer.material.dk * weight);  
        }, 0);  
        return weightedDk;  
    }, [layers]);  

    // Calculate effective loss factor  
    const calculateEffectiveDf = useCallback(() => {  
        const totalThickness = layers.reduce((sum, layer) => sum + layer.material.thickness, 0);  
        const weightedDf = layers.reduce((sum, layer) => {  
            const weight = layer.material.thickness / totalThickness;  
            return sum + (layer.material.df * weight);  
        }, 0);  
        return weightedDf;  
    }, [layers]);  

    // Chart data  
    const chartData = useMemo(() =>  
        layers.map((layer, index) => ({  
            name: `Layer ${index + 1}`,  
            thickness: layer.material.thickness,  
            dk: layer.material.dk,  
            df: layer.material.df,  
            youngModulus: layer.material.youngModulus,  
            peelStrength: layer.material.peelStrength  
        })),  
        [layers]  
    );  

    const handleParamToggle = useCallback((param) => {  
        setSelectedParams(prev => ({  
            ...prev,  
            [param]: !prev[param]  
        }));  
    }, []);  

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

    const handleMaterialTypeChange = useCallback((event, index) => {  
        const newType = event.target.value;  
        const newMaterial = MATERIALS_DATABASE[newType].categories[0];  

        setLayers(prev => prev.map((layer, i) =>  
            i === index ? { type: newType, material: newMaterial } : layer  
        ));  
    }, []);  

    const handleMaterialChange = useCallback((event, index) => {  
        const materialName = event.target.value;  
        const type = layers[index].type;  
        const newMaterial = MATERIALS_DATABASE[type].categories  
            .find(m => m.name === materialName);  

        setLayers(prev => prev.map((layer, i) =>  
            i === index ? { ...layer, material: newMaterial } : layer  
        ));  
    }, [layers]);  

    return (  
        <div className="container mx-auto px-4 py-8">  
            {/* Material Parameters Panel */}  
            <div className="bg-white rounded-lg shadow p-6 mb-8">  
                <h2 className="text-xl font-semibold mb-4">材料參數</h2>  

                <div className="mb-6">  
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">  
                        <div>  
                            <label className="block text-sm font-medium text-gray-700 mb-2">  
                                材料類型  
                            </label>  
                            <select  
                                className="w-full border-gray-300 rounded-md shadow-sm"  
                                value={layers[0].type}  
                                onChange={(e) => handleMaterialTypeChange(e, 0)}  
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
                                className="w-full border-gray-300 rounded-md shadow-sm"  
                                value={layers[0].material.name}  
                                onChange={(e) => handleMaterialChange(e, 0)}  
                            >  
                                {MATERIALS_DATABASE[layers[0].type].categories.map(material => (  
                                    <option key={material.name} value={material.name}>  
                                        {material.name}  
                                    </option>  
                                ))}  
                            </select>  
                        </div>  
                    </div>  
                </div>  

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">  
                    <div className="bg-gray-50 p-4 rounded-lg">  
                        <label className="block text-sm font-medium text-gray-500">厚度</label>  
                        <span className="text-lg font-semibold">{layers[0].material.thickness} mm</span>  
                    </div>  
                    <div className="bg-gray-50 p-4 rounded-lg">  
                        <label className="block text-sm font-medium text-gray-500">介電常數</label>  
                        <span className="text-lg font-semibold">{layers[0].material.dk}</span>  
                    </div>  
                    <div className="bg-gray-50 p-4 rounded-lg">  
                        <label className="block text-sm font-medium text-gray-500">損耗因數</label>  
                        <span className="text-lg font-semibold">{layers[0].material.df}</span>  
                    </div>  
                    <div className="bg-gray-50 p-4 rounded-lg">  
                        <label className="block text-sm font-medium text-gray-500">楊氏係數</label>  
                        <span className="text-lg font-semibold">{layers[0].material.youngModulus} GPa</span>  
                    </div>  
                    <div className="bg-gray-50 p-4 rounded-lg">  
                        <label className="block text-sm font-medium text-gray-500">剝離力</label>  
                        <span className="text-lg font-semibold">  
                            {layers[0].material.peelStrength ? `${layers[0].material.peelStrength} N/mm` : 'N/A'}  
                        </span>  
                    </div>  
                </div>  
            </div>  

            <div className="bg-white rounded-lg shadow p-6 mb-8">  
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">  
                    {/* Stack Design Panel */}  
                    <div className="bg-white rounded-lg shadow p-4 md:p-6">  
                        <div className="flex justify-between items-center mb-4">  
                            <h2 className="text-xl font-semibold">疊構設計</h2>  
                            <div className="space-x-2">  
                                <button  
                                    onClick={handleAddLayer}  
                                    className="p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"  
                                >  
                                    <Plus className="h-5 w-5" />  
                                </button>  
                                <button  
                                    onClick={() => handleRemoveLayer(layers.length - 1)}  
                                    className="p-2 text-white bg-red-600 rounded-md hover:bg-red-700"  
                                    disabled={layers.length <= 1}  
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
                                            onChange={(e) => handleMaterialTypeChange(e, index)}  
                                            className="block w-full rounded-md border-gray-300 text-sm"  
                                        >  
                                            {Object.entries(MATERIALS_DATABASE).map(([key, value]) => (  
                                                <option key={key} value={key}>{value.displayName}</option>  
                                            ))}  
                                        </select>  
                                        <select  
                                            value={layer.material.name}  
                                            onChange={(e) => handleMaterialChange(e, index)}  
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

                {/* Relocated Total Thickness and Effective Parameters */}  
                <div className="mt-4 space-y-2">  
                    <div className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-lg">  
                        <span className="text-sm text-gray-600">總厚度：</span>  
                        <span className="font-semibold">{calculatedTotalThickness.toFixed(4)} mm</span>  
                    </div>  

                    <div className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-lg">  
                        <span className="text-sm text-gray-600">等效介電常數：</span>  
                        <span className="font-semibold">{calculateEffectiveDk().toFixed(2)}</span>  
                    </div>  

                    <div className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-lg">  
                        <span className="text-sm text-gray-600">等效損耗因數：</span>  
                        <span className="font-semibold">{calculateEffectiveDf().toFixed(4)}</span>  
                    </div>  
                </div>  
            </div>   

            {/* Parameter Analysis */}  
            <div className="bg-white rounded-lg shadow p-6">  
                <h2 className="text-xl font-semibold mb-4">參數分析</h2>  
                <div className="mb-4 flex flex-wrap gap-4">  
                    {Object.entries(PARAMS_CONFIG).map(([key, config]) => (  
                        <label key={key} className="inline-flex items-center">  
                            <input  
                                type="checkbox"  
                                className="form-checkbox h-5 w-5 text-blue-600"  
                                checked={selectedParams[key]}  
                                onChange={() => handleParamToggle(key)}  
                            />  
                            <span  
                                className="ml-2 flex items-center gap-2"  
                                style={{ color: config.color }}  
                            >  
                                {config.label}  
                                {config.unit && (  
                                    <span className="text-gray-500 text-sm">({config.unit})</span>  
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
    );  
};  

export default MaterialStackApp;