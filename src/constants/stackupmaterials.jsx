// 只導入材料數據庫
import { MATERIALS_DATABASE } from './materials'

// 獲取材料信息的輔助函數
const getMaterial = (type, materialName) => {  
  const materialType = MATERIALS_DATABASE[type]  
  if (!materialType) return null  
  
  return materialType.categories.find(m => m.name === materialName)  
}  
// 獲取層的完整屬性
export const getLayerWithProperties = (layer) => {  
  const material = getMaterial(layer.type, layer.materialName)  
  if (!material) return null  
  
  return {  
    ...layer,  
    material  
  }  
}  
// 獲取完整堆疊信息
export const getStackupWithMaterials = (stackupId) => {  
  const stackup = STACKUP_DATABASE.stackups.find(s => s.id === stackupId)  
  if (!stackup) return null  

  return {  
    ...stackup,  
    layers: stackup.layers.map(layer => getLayerWithProperties(layer))  
  }  
}
export const MATERIAL_COLORS = {  
  ADHESIVE: "#F0E68C",    // 淺黃色 - 膠層  
  CVL: "#98FB98",         // 淺綠色 - 覆蓋層  
  Cu: "#B87333",          // 銅色 - 銅箔  
  EMI: "#A9A9A9",         // 深灰色 - EMI屏蔽層  
  FR4: "#D2B48C",         // 棕褐色 - FR4基材  
  FCCL: "#DDA0DD",        // 梅紅色 - 軟性覆銅箔層板  
  PI_REINFORCEMENT: "#FFE4B5", // 莫吉托色 - 聚醯亞胺增強層  
  PREPREG: "#F5DEB3",     // 小麥色 - 預浸料  
  PTFE: "#87CEEB",        // 天藍色 - 特氟龍材料  
  SHIELD: "#808080",      // 灰色 - 屏蔽層  
  STIFFENER: "#DEB887"    // 實木色 - 補強板 
};  

export const STACKUP_DATABASE = {
  version: "1.1",
  last_updated: "2024-12-24",
  stackups: [
    {  
      id: "TYPE-A",  
      name: "高頻微帶線FPC疊構",  
      description: "適合高速單端信號傳輸，具有良好的阻抗控制和EMI屏蔽效果",  
      category: "高速單端",  
      layers: [  
        {  
          type: "EMI",  
          materialName: "SF-PC5",  
          description: "EMI屏蔽層"  
        },  
        {  
          type: "PTFE",  
          materialName: "Rogers RO3003",  
          description: "介質層"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "信號層"  
        },  
        {  
          type: "PI_REINFORCEMENT",  
          materialName: "UPILEX-S",  
          description: "PI層"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "接地層"  
        },  
        {  
          type: "FCCL",  
          materialName: "TU767",  
          description: "覆蓋層"  
        }  
      ],  
      electrical_params: {  
        insertion_loss: { value: 0.35, unit: "dB/inch", frequency: "20GHz" },  
        impedance: { value: 50, tolerance: 3, unit: "ohm" },  
        trace_width: { value: 75, unit: "µm" },  
        trace_spacing: { value: 75, unit: "µm" },  
        gnd_spacing: { value: 150, unit: "µm" }  
      }  
    },  
    {  
      id: "TYPE-B",  
      name: "高速差分對FPC疊構",  
      description: "適用於高速差分信號傳輸，提供優異的信號完整性",  
      category: "高速差分",  
      layers: [  
        {  
          type: "FCCL",  
          materialName: "TU767",  
          description: "頂層覆蓋層"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "頂層銅箔"  
        },  
        {  
          type: "PTFE",  
          materialName: "Rogers RO3003",  
          description: "高頻介質層"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "內層銅箔"  
        },  
        {  
          type: "PI_REINFORCEMENT",  
          materialName: "UPILEX-S",  
          description: "PI介質層"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "底層銅箔"  
        },  
        {  
          type: "FCCL",  
          materialName: "TU767",  
          description: "底層覆蓋層"  
        }  
      ],  
      electrical_params: {  
        insertion_loss: { value: 0.3, unit: "dB/inch", frequency: "25GHz" },  
        diff_impedance: { value: 100, tolerance: 5, unit: "ohm" },  
        trace_width: { value: 100, unit: "µm" },  
        trace_spacing: { value: 100, unit: "µm" },  
        diff_pair_spacing: { value: 200, unit: "µm" }  
      }  
    },  
    {  
      id: "TYPE-C",  
      name: "多層混合信號FPC疊構",  
      description: "支持數字和模擬信號混合傳輸，具有良好的層間隔離",  
      category: "混合信號",  
      layers: [  
        {  
          type: "FCCL",  
          materialName: "TU767",  
          description: "頂層覆蓋層"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "頂層銅箔"  
        },  
        {  
          type: "FR4",  
          materialName: "TU-872",  
          description: "FR4介質層1"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "內層銅箔1"  
        },  
        {  
          type: "FR4",  
          materialName: "TU-872",  
          description: "FR4介質層2"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "內層銅箔2"  
        },  
        {  
          type: "FR4",  
          materialName: "TU-872",  
          description: "FR4介質層3"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "底層銅箔"  
        },  
        {  
          type: "FCCL",  
          materialName: "TU767",  
          description: "底層覆蓋層"  
        }  
      ],  
      electrical_params: {  
        insertion_loss: { value: 0.45, unit: "dB/inch", frequency: "10GHz" },  
        impedance: { value: 50, tolerance: 5, unit: "ohm" },  
        trace_width: { value: 125, unit: "µm" },  
        trace_spacing: { value: 125, unit: "µm" },  
        power_plane_thickness: { value: 35, unit: "µm" }  
      }  
    },  
    {  
      id: "TYPE-D",  
      name: "射頻RF FPC疊構",  
      description: "專為RF信號傳輸優化，提供極低的損耗和出色的阻抗匹配",  
      category: "射頻",  
      layers: [  
        {  
          type: "EMI",  
          materialName: "SF-PC5",  
          description: "頂層屏蔽"  
        },  
        {  
          type: "PTFE",  
          materialName: "Rogers RO3003",  
          description: "射頻介質層1"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "信號層"  
        },  
        {  
          type: "PTFE",  
          materialName: "Rogers RO3003",  
          description: "射頻介質層2"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "接地層"  
        },  
        {  
          type: "FCCL",  
          materialName: "TU767",  
          description: "覆蓋層"  
        }  
      ],  
      electrical_params: {  
        insertion_loss: { value: 0.25, unit: "dB/inch", frequency: "30GHz" },  
        impedance: { value: 50, tolerance: 2, unit: "ohm" },  
        trace_width: { value: 150, unit: "µm" },  
        trace_spacing: { value: 150, unit: "µm" },  
        return_loss: { value: -20, unit: "dB" }  
      }  
    },  
    {  
      id: "highfreq_4layer",  
      name: "四層高頻 FPC",  
      description: "四層高頻設計，適用於複雜的高頻電路布局",  
      category: "高頻",  
      layers: [  
        {  
          type: "FCCL",  
          materialName: "TU767",  
          description: "頂層覆蓋層"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "頂層銅箔"  
        },  
        {  
          type: "ADHESIVE",  
          materialName: "9150",  
          description: "膠層1"  
        },  
        {  
          type: "PI_REINFORCEMENT",  
          materialName: "UPILEX-S",  
          description: "PI層1"  
        },  
        {  
          type: "ADHESIVE",  
          materialName: "9150",  
          description: "膠層2"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "內層銅箔1"  
        },  
        {  
          type: "ADHESIVE",  
          materialName: "9150",  
          description: "膠層3"  
        },  
        {  
          type: "PI_REINFORCEMENT",  
          materialName: "UPILEX-S",  
          description: "PI層2"  
        },  
        {  
          type: "ADHESIVE",  
          materialName: "9150",  
          description: "膠層4"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "內層銅箔2"  
        },  
        {  
          type: "ADHESIVE",  
          materialName: "9150",  
          description: "膠層5"  
        },  
        {  
          type: "PI_REINFORCEMENT",  
          materialName: "UPILEX-S",  
          description: "PI層3"  
        },  
        {  
          type: "ADHESIVE",  
          materialName: "9150",  
          description: "膠層6"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "底層銅箔"  
        },  
        {  
          type: "FCCL",  
          materialName: "TU767",  
          description: "底層覆蓋層"  
        }  
      ],  
      electrical_params: {  
        insertion_loss: { value: 0.35, unit: "dB/inch", frequency: "30GHz" },  
        impedance: { value: 50, tolerance: 3, unit: "ohm" },  
        trace_width: { value: 100, unit: "µm" },  
        trace_spacing: { value: 100, unit: "µm" },  
        return_loss: { value: -18, unit: "dB" }  
      }  
    },  
    {  
      id: "rf_groundedcoplanar",  
      name: "接地共面波導 FPC",  
      description: "共面波導結構，適用於高頻信號傳輸和阻抗匹配",  
      category: "射頻",  
      layers: [  
        {  
          type: "FCCL",  
          materialName: "TU767",  
          description: "頂層覆蓋層"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "頂層銅箔"  
        },  
        {  
          type: "ADHESIVE",  
          materialName: "9150",  
          description: "膠層1"  
        },  
        {  
          type: "PTFE",  
          materialName: "Rogers RO3003",  
          description: "PTFE介質層"  
        },  
        {  
          type: "ADHESIVE",  
          materialName: "9150",  
          description: "膠層2"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "底層銅箔"  
        }  
      ],  
      electrical_params: {  
        insertion_loss: { value: 0.22, unit: "dB/inch", frequency: "30GHz" },  
        impedance: { value: 50, tolerance: 1.5, unit: "ohm" },  
        trace_width: { value: 200, unit: "µm" },  
        trace_spacing: { value: 150, unit: "µm" },  
        return_loss: { value: -22, unit: "dB" }  
      }  
    },  
    {  
      id: "highfreq_impedance",  
      name: "阻抗控制高頻 FPC",  
      description: "特殊設計的阻抗控制結構，適用於精確阻抗要求的高頻應用",  
      category: "高頻",  
      layers: [  
        {  
          type: "FCCL",  
          materialName: "TU767",  
          description: "頂層覆蓋層"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "頂層銅箔"  
        },  
        {  
          type: "ADHESIVE",  
          materialName: "9150",  
          description: "膠層1"  
        },  
        {  
          type: "PI_REINFORCEMENT",  
          materialName: "UPILEX-S",  
          description: "PI層"  
        },  
        {  
          type: "ADHESIVE",  
          materialName: "9150",  
          description: "膠層2"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "底層銅箔"  
        }  
      ],  
      electrical_params: {  
        insertion_loss: { value: 0.28, unit: "dB/inch", frequency: "30GHz" },  
        impedance: { value: 50, tolerance: 1, unit: "ohm" },  
        trace_width: { value: 175, unit: "µm" },  
        trace_spacing: { value: 175, unit: "µm" },  
        return_loss: { value: -25, unit: "dB" }  
      }  
    },  
    {  
      id: "rf_dualshield",  
      name: "雙遮罩射頻 FPC",  
      description: "雙層遮罩設計，提供優異的射頻屏蔽效果",  
      category: "射頻",  
      layers: [  
        {  
          type: "EMI",  
          materialName: "SF-PC5",  
          description: "頂層屏蔽"  
        },  
        {  
          type: "ADHESIVE",  
          materialName: "9150",  
          description: "膠層1"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "頂層銅箔"  
        },  
        {  
          type: "ADHESIVE",  
          materialName: "9150",  
          description: "膠層2"  
        },  
        {  
          type: "PI_REINFORCEMENT",  
          materialName: "UPILEX-S",  
          description: "PI層"  
        },  
        {  
          type: "ADHESIVE",  
          materialName: "9150",  
          description: "膠層3"  
        },  
        {  
          type: "Cu",  
          materialName: "MITSUI LD",  
          description: "底層"
        },
        {  
          type: "CVL",  
          materialName: "TLX-8",  
          description: "CVL層"  
        }
      ],
        electrical_params: {  
          insertion_loss: {value: 0.32, unit: "dB/inch", frequency: "30GHz"},  
          impedance: {value: 50, tolerance: 2.5, unit: "ohm"},  
          trace_width: {value: 150, unit: "µm"},  
          trace_spacing: {value: 150, unit: "µm"},  
          return_loss: {value: -20, unit: "dB"}  
        }  
      },  
  ] 
}  

// 材料關聯處理函數  
export const linkMaterialProperties = (stackup) => {  
  return {  
    ...stackup,  
    layers: stackup.layers.map(layer => {  
      const material = getMaterial(layer.type, layer.materialName)  
      return {  
        ...layer,  
        materialProperties: material ? {  
          absorptionRate: material.absorptionRate,  
          thermalConductivity: material.thermalConductivity,  
          thermalExpansion: material.thermalExpansion,  
          // 添加其他需要的材料屬性  
        } : null  
      }  
    })  
  }  
}  

// 增強的堆疊獲取函數  
export const getStackupById = (id) => {  
  const stackup = STACKUP_DATABASE.stackups.find(s => s.id === id)  
  return stackup ? linkMaterialProperties(stackup) : null  
}
export const calculateLayerProperties = (stackup) => {  
  if (!stackup || !stackup.layers) return null  

  const layerProperties = stackup.layers.map(layer => {  
    const material = layer.materialProperties  
    if (!material) return null  

    return {  
      layerName: layer.description,  
      materialName: layer.materialName,  
      type: layer.type,  
      properties: {  
        absorptionRate: material.absorptionRate,  
        thermalConductivity: material.thermalConductivity,  
        thermalExpansion: material.thermalExpansion  
      }  
    }  
  })  

  // 計算整體特性  
  const totalProperties = layerProperties.reduce((acc, layer) => {  
    if (!layer || !layer.properties) return acc  
    
    return {  
      averageAbsorptionRate: acc.averageAbsorptionRate + layer.properties.absorptionRate,  
      averageThermalConductivity: acc.averageThermalConductivity + layer.properties.thermalConductivity,  
      averageThermalExpansion: acc.averageThermalExpansion + layer.properties.thermalExpansion  
    }  
  }, {  
    averageAbsorptionRate: 0,  
    averageThermalConductivity: 0,  
    averageThermalExpansion: 0  
  })  

  const layerCount = layerProperties.filter(l => l !== null).length  
  
  return {  
    layers: layerProperties,  
    averageProperties: {  
      absorptionRate: totalProperties.averageAbsorptionRate / layerCount,  
      thermalConductivity: totalProperties.averageThermalConductivity / layerCount,  
      thermalExpansion: totalProperties.averageThermalExpansion / layerCount  
    }  
  }  
}
export const validateStackupMaterials = (stackup) => {  
  const validation = {  
    isValid: true,  
    errors: [],  
    warnings: []  
  }  

  if (!stackup || !stackup.layers) {  
    validation.isValid = false  
    validation.errors.push("Invalid stackup structure")  
    return validation  
  }  

  stackup.layers.forEach((layer, index) => {  
    // 檢查材料是否存在  
    if (!layer.materialProperties) {  
      validation.isValid = false  
      validation.errors.push(`Layer ${index + 1}: Material "${layer.materialName}" not found in database`)  
    }  

    // 檢查材料類型是否匹配  
    const material = getMaterial(layer.type, layer.materialName)  
    if (!material) {  
      validation.isValid = false  
      validation.errors.push(`Layer ${index + 1}: Invalid material type "${layer.type}"`)  
    }  

    // 檢查必要的材料特性是否存在  
    if (material) {  
      const requiredProperties = ['absorptionRate', 'thermalConductivity', 'thermalExpansion']  
      requiredProperties.forEach(prop => {  
        if (material[prop] === undefined) {  
          validation.warnings.push(`Layer ${index + 1}: Missing property "${prop}"`)  
        }  
      })  
    }  
  })  

  return validation  
}
// 獲取堆疊並計算特性  
const stackup = getStackupById('TYPE-A')  
if (stackup) {  
  // 驗證材料  
  const validation = validateStackupMaterials(stackup)  
  if (validation.isValid) {  
    // 計算特性  
    const properties = calculateLayerProperties(stackup)  
    console.log('Stackup properties:', properties)  
  } else {  
    console.error('Validation errors:', validation.errors)  
  }  
} 