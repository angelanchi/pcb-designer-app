import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
// 材料數據庫
import { MATERIALS_DATABASE } from '../constants/materials';



// 圖表顏色配置
const CHART_COLORS = {
  thickness: "#B6B4C2",     // 柔和紫灰  
  dk: "#E8B4B8",           // 柔和玫瑰粉  
  df: "#93A9A6",           // 柔和青灰  
  youngModulus: "#D4B88C",  // 柔和驼色  
  peelStrength: "#8B9B8B"   // 柔和灰绿 
};

// 從材料數據庫生成材料類型列表  
// 用於材料選擇區域的顯示  
const materialTypes = Object.entries(MATERIALS_DATABASE).map(([key, value]) => ({  
    id: key,  
    key: key,  
    name: value.displayName  
  }));  
  
  // 定義參數配置  
  // 包含所有可選擇的參數及其顯示名稱  
  const parameters = [  
    { id: 1, name: "材料類型", key: "materialType" },   
    { id: 2, name: "型號", key: "name" },
    { id: 3, name: "厚度", key: "thickness" },  
    { id: 4, name: "介電常數", key: "dk" },  
    { id: 5, name: "損耗因數", key: "df" },  
    { id: 6, name: "楊氏模數", key: "youngModulus" }, 
    { id: 7, name: "剝離強度", key: "peelStrength" }, 
    { id: 7, name: "製造日期", key: "manufacturingDate" },  
    { id: 8, name: "測試日期", key: "testingDate" },  
  ];  
  
  // 選擇區域組件  
  // 用於顯示材料類型和參數的選擇界面  
  const SelectionArea = ({ title, items, selectedItems, onItemChange }) => (  
    <div className="mb-6 p-4 bg-white rounded-lg shadow">  
      <h2 className="text-lg font-bold mb-4">{title}</h2>  
      <div className="grid grid-cols-4 gap-4">  
        {items.map((item) => (  
          <label key={item.id} className="flex items-center space-x-2">  
            <input  
              type="checkbox"  
              checked={selectedItems.includes(item.id)}  
              onChange={() => onItemChange(item.id)}  
              className="form-checkbox"  
            />  
            <span>{item.name}</span>  
          </label>  
        ))}  
      </div>  
    </div>  
  );  
  
  // 數據表格組件  
  // 顯示所選材料的參數數據  
  const DataTable = ({   
    columnOrder,   
    filteredData,   
    selectedParams,   
    sortConfig,   
    onSort,   
    onDragStart,   
    onDragOver,   
    onDrop   
  }) => (  
    <div className="mb-6 p-4 bg-white rounded-lg shadow overflow-x-auto">  
      <h2 className="text-lg font-bold mb-4">材料參數表</h2>  
      <table className="min-w-full border-collapse">  
        <thead>  
          <tr>  
            {columnOrder.map(colKey => {  
              const param = parameters.find(p => p.key === colKey);  
              let header = param?.name;  
              
              return header && (  
                colKey === 'materialType' ||   
                colKey === 'name' ||     
                selectedParams.includes(param?.id)  
              ) ? (  
                <th  
                  key={colKey}  
                  className="border px-4 py-2 bg-gray-50 cursor-pointer select-none"  
                  onClick={() => onSort(colKey)}  
                  draggable  
                  onDragStart={(e) => onDragStart(e, colKey)}  
                  onDragOver={onDragOver}  
                  onDrop={(e) => onDrop(e, colKey)}  
                >  
                  {header}  
                  {sortConfig.key === colKey && (  
                    <span className="ml-2">  
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}  
                    </span>  
                  )}  
                </th>  
              ) : null;  
            })}  
          </tr>  
        </thead>  
        <tbody>  
          {filteredData.map((row, index) => (  
            <tr key={index}>  
              {columnOrder.map(colKey => {  
                const param = parameters.find(p => p.key === colKey);  
                return (  
                  colKey === 'materialType' ||   
                  colKey === 'name' ||   
                  selectedParams.includes(param?.id)  
                ) && (  
                  <td key={colKey} className="border px-4 py-2">  
                    {row[colKey]}  
                  </td>  
                );  
              })}  
            </tr>  
          ))}  
        </tbody>  
      </table>  
    </div>  
  );  
  
  // 圖表組件  
  // 用於可視化顯示選定的參數數據  
  const DataChart = ({ filteredData, selectedParams }) => (  
    <div className="p-4 bg-white rounded-lg shadow">  
      <h2 className="text-lg font-bold mb-4">參數分析圖表</h2>  
      <div className="w-full overflow-x-auto">  
        <BarChart   
          width={800}   
          height={400}   
          data={filteredData}  
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}  
        >  
          <CartesianGrid strokeDasharray="3 3" />  
          <XAxis dataKey="name" />  
          <YAxis />  
          <Tooltip />  
          <Legend />  
          {parameters  
            .filter(param => selectedParams.includes(param.id))  
            .map((param) => (  
              <Bar  
                key={param.id}  
                dataKey={param.key}  
                name={param.name}  
                fill={CHART_COLORS[param.key] || `hsl(${param.id * 45}, 70%, 50%)`}  
                barSize={35}  
              />  
            ))}  
        </BarChart>  
      </div>  
    </div>  
  );  
  
  // 主應用組件  
  // 整合所有功能並管理應用狀態  
  // MaterialFinderApp.jsx  
  const MaterialFinderApp = () => {    
    // 狀態定義  
    const [selectedMaterials, setSelectedMaterials] = useState([]); // 選中的材料  
    const [selectedParams, setSelectedParams] = useState([]); // 選中的參數  
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); // 排序配置  
    const [columnOrder, setColumnOrder] = useState([  
      'materialType',  
      'manufacturer',  
      'name',  
      ...parameters.map(p => p.key).filter(key =>   
        !['materialType', 'manufacturer', 'name'].includes(key)  
      )  
    ]); // 列順序  
  
    // 處理材料選擇變更  
    const handleMaterialChange = (materialId) => {  
      setSelectedMaterials(prev => {  
        if (prev.includes(materialId)) {  
          return prev.filter(id => id !== materialId);  
        }  
        return [...prev, materialId];  
      });  
    };  
  
    // 處理參數選擇變更  
    const handleParamChange = (paramId) => {  
      setSelectedParams(prev => {  
        if (prev.includes(paramId)) {  
          return prev.filter(id => id !== paramId);  
        }  
        return [...prev, paramId];  
      });  
    };  
  
    // 過濾並排序數據  
    // 使用 useMemo 優化性能  
    const filteredAndSortedData = useMemo(() => {  
      let filtered = selectedMaterials  
        .map(id => materialTypes.find(t => t.id === id))  
        .filter(Boolean)  
        .flatMap(type => {  
          const materialData = MATERIALS_DATABASE[type.key];  
          return materialData.categories.map(category => ({  
            ...category,  
            materialType: materialData.displayName,  
            manufacturer: materialData.manufacturer  
          }));  
        });  
  
      if (sortConfig.key) {  
        filtered = [...filtered].sort((a, b) => {  
          const aValue = a[sortConfig.key];  
          const bValue = b[sortConfig.key];  
          
          if (aValue < bValue) {  
            return sortConfig.direction === 'asc' ? -1 : 1;  
          }  
          if (aValue > bValue) {  
            return sortConfig.direction === 'asc' ? 1 : -1;  
          }  
          return 0;  
        });  
      }  
  
      return filtered;  
    }, [selectedMaterials, sortConfig]);  
  
    // 處理排序  
    const handleSort = (key) => {  
      setSortConfig(current => ({  
        key,  
        direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',  
      }));  
    };  
  
    // 處理列拖拽開始  
    const handleDragStart = (e, columnId) => {  
      e.dataTransfer.setData('text/plain', columnId);  
    };  
  
    // 處理列拖拽經過  
    const handleDragOver = (e) => {  
      e.preventDefault();  
    };  
  
    // 處理列拖拽放置  
    const handleDrop = (e, targetColumnId) => {  
      e.preventDefault();  
      const sourceColumnId = e.dataTransfer.getData('text/plain');  
      
      const newOrder = [...columnOrder];  
      const sourceIndex = newOrder.indexOf(sourceColumnId);  
      const targetIndex = newOrder.indexOf(targetColumnId);  
      
      newOrder.splice(sourceIndex, 1);  
      newOrder.splice(targetIndex, 0, sourceColumnId);  
      
      setColumnOrder(newOrder);  
    };  
  
 
    return (  
      <div className="p-4 max-w-[1200px] mx-auto">  
        {/* 材料選擇區域 */}  
        <SelectionArea  
          title="材料類型選擇"  
          items={materialTypes}  
          selectedItems={selectedMaterials}  
          onItemChange={handleMaterialChange}  
        />  
  
        {/* 參數選擇區域 */}  
        <SelectionArea  
          title="參數選擇"  
          items={parameters}  
          selectedItems={selectedParams}  
          onItemChange={handleParamChange}  
        />  
  
        {/* 數據表格區域 */}  
        <DataTable  
          columnOrder={columnOrder}  
          filteredData={filteredAndSortedData}  
          selectedParams={selectedParams}  
          sortConfig={sortConfig}  
          onSort={handleSort}  
          onDragStart={handleDragStart}  
          onDragOver={handleDragOver}  
          onDrop={handleDrop}  
        />  
  
        {/* 圖表區域（僅在有選中參數和數據時顯示） */}  
        {selectedParams.length > 0 && filteredAndSortedData.length > 0 && (  
          <DataChart  
            filteredData={filteredAndSortedData}  
            selectedParams={selectedParams}  
          />  
        )}  
      </div>  
    );  
  }  
  export default MaterialFinderApp; 