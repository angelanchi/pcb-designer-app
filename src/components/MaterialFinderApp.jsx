import React, { useState, useMemo } from 'react';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Scatter,
} from 'recharts';
// 材料數據庫
import { MATERIALS_DATABASE } from '../constants/materials';
  

// 圖表顏色配置
const CHART_COLORS = {
  thickness: "#A76D9A",     // 柔和紫灰  
  dk: "#D68A8A",           // 柔和玫瑰粉  
  df: "#A9C6C6",           // 柔和青灰  
  youngModulus: "#C2A76D",  // 柔和驼色  
  peelStrength: "#B6C2A6"   // 柔和灰绿 
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
  { id: 2, name: "廠商", key: "manufacturer" },
  { id: 3, name: "型號", key: "name" },
  { id: 4, name: "厚度", key: "thickness", unit: "μm" },
  { id: 5, name: "介電常數", key: "dk" },
  { id: 6, name: "損耗因數", key: "df" },
  { id: 7, name: "楊氏模數", key: "youngModulus", unit: "MPa" },
  { id: 8, name: "剝離強度", key: "peelStrength", unit: "kN/m" },
  { id: 9, name: "製造日期", key: "manufacturingDate" },
  { id: 10, name: "測試日期", key: "testingDate" },
  { id: 11, name: "評估數據", key: "assessmentdata" },
  { id: 12, name: "評估報告", key: "assessmentreport" },
  { id: 13, name: "廠商規格書", key: "supplierspecification" },
  { id: 14, name: "TDS", key: "tds" },
];

// 定義數值型參數列表
const numericParameters = [
  { id: 4, name: "厚度", key: "thickness" },
  { id: 5, name: "介電常數", key: "dk" },
  { id: 6, name: "損耗因數", key: "df" },
  { id: 7, name: "楊氏模數", key: "youngModulus" },
  { id: 8, name: "剝離強度", key: "peelStrength" },
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
  onDrop,
  selectedRows,
  onRowSelect
}) => {  
// 處理 CSV 導出  
const handleCSVExport = () => {  
  // 獲取選中的行數據  
  const selectedData = selectedRows.map(index => filteredData[index]);  
  
  // 獲取要導出的列  
  const exportColumns = columnOrder.filter(colKey => {  
    const param = parameters.find(p => p.key === colKey);  
    return param && (  
      ['materialType', 'manufacturer', 'name'].includes(colKey) ||  
      selectedParams.includes(param.id)  
    );  
  });  

  // 獲取列標題（參數名稱）  
  const headers = exportColumns.map(colKey => {  
    const param = parameters.find(p => p.key === colKey);  
    return param.name;  
  });  

  // 創建 CSV 內容  
  let csvContent = '\uFEFF'; // 添加 BOM 以支持中文  
  
  // 添加標題行  
  csvContent += headers.join(',') + '\n';  

  // 添加數據行  
  selectedData.forEach(row => {  
    const rowData = exportColumns.map(colKey => {  
      const value = row[colKey];  
      // 處理包含逗號的值，用引號包裹  
      return value?.toString().includes(',')   
        ? `"${value}"`   
        : value;  
    });  
    csvContent += rowData.join(',') + '\n';  
  });  

  // 創建並下載文件  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });  
  const url = window.URL.createObjectURL(blob);  
  const link = document.createElement('a');  
  const date = new Date().toLocaleDateString().replace(/\//g, '-');  
  link.href = url;  
  link.download = `材料參數數據_${date}.csv`;  
  document.body.appendChild(link);  
  link.click();  
  document.body.removeChild(link);  
  window.URL.revokeObjectURL(url);  
};  

  return (  
    <div className="mb-6 p-4 bg-white rounded-lg shadow overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">材料參數表</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-gray-50">
              <input
                type="checkbox"
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const allIds = filteredData.map((_, index) => index);
                  onRowSelect(isChecked ? allIds : []);
                }}
                checked={selectedRows.length === filteredData.length}
                className="form-checkbox"
              />
            </th>
            {columnOrder.map(colKey => {
              const param = parameters.find(p => p.key === colKey);
              let header = param?.name;

              return header && (['materialType', 'manufacturer', 'name'].includes(colKey) ||
                selectedParams.includes(param?.id)) ? (
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
              <td className="border px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={() => {
                    onRowSelect(
                      selectedRows.includes(index)
                        ? selectedRows.filter(id => id !== index)
                        : [...selectedRows, index]
                    );
                  }}
                  className="form-checkbox"
                />
              </td>
              {columnOrder.map(colKey => {
                const param = parameters.find(p => p.key === colKey);
                return (['materialType', 'manufacturer', 'name'].includes(colKey) ||
                  selectedParams.includes(param?.id)) && (
                  <td key={colKey} className="border px-4 py-2">
                    {row[colKey]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {/* 添加導出按鈕 */}  
      <div className="flex justify-end mt-4">  
        <button  
          onClick={handleCSVExport}  
          disabled={selectedRows.length === 0}  
          className={`  
            px-4 py-2 rounded-lg  
            ${selectedRows.length === 0   
              ? 'bg-gray-300 cursor-not-allowed'  
              : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'  
            }  
            transition-colors duration-200  
            flex items-center space-x-2  
          `}  
        >  
          <svg  
            className="w-5 h-5"  
            fill="none"  
            stroke="currentColor"  
            viewBox="0 0 24 24"  
            xmlns="http://www.w3.org/2000/svg"  
          >  
            <path  
              strokeLinecap="round"  
              strokeLinejoin="round"  
              strokeWidth={2}  
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"  
            />  
          </svg>  
          <span>匯出 CSV</span>  
        </button>  

      </div>
    </div>
  );  
};

// 圖表組件  
// 用於可視化顯示選定的參數數據  
const DataChart = ({ filteredData, selectedParams }) => {
  // 選擇數值型參數
  const selectedNumericParams = parameters
    .filter(param =>
      selectedParams.includes(param.id) &&
      numericParameters.some(np => np.id === param.id)
    );

  // 如果沒有選擇的數值型參數，則返回 null
  if (selectedNumericParams.length === 0) {
    return null;
  }

  // 將參數分配到左右軸
  const assignAxes = (params) => {
    if (params.length <= 3) return { leftAxis: params, rightAxis: [] };

    const ranges = params.map(param => ({
      ...param,
      range: Math.max(...filteredData.map(item => item[param.key])) - Math.min(...filteredData.map(item => item[param.key]))
    }));

    // 按數值範圍排序 (從大到小)
    ranges.sort((a, b) => b.range - a.range);

    // 初始化左側軸和右側軸
    const leftAxis = [ranges[0]]; // 首項分配到左側軸
    const rightAxis = [];

    // 將剩餘項目依照條件進行分配
    for (let i = 1; i < ranges.length; i++) {
      const currentRange = ranges[i].range;
      const maxLeftRange = Math.max(...leftAxis.map(item => item.range));

      if (Math.abs(currentRange - maxLeftRange) > 2) {
        rightAxis.push(ranges[i]); // 超過差距範圍，分到右側軸
      } else {
        leftAxis.push(ranges[i]); // 差距允許，繼續分配到左側軸
      }
    }

    return {
      leftAxis,
      rightAxis,
    };
  };

  const { leftAxis, rightAxis } = assignAxes(selectedNumericParams);

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">參數分析圖表</h2>
      <div className="w-full">
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart
            data={filteredData}
            margin={{ top: 20, right: 50, left: 50, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-30}
              textAnchor="end"
              height={60}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              label={{
                value: leftAxis.map(p => `${p.name} (${p.unit})`).join(', '),
                angle: -90,
                position: 'insideLeft',
                offset: -15,
                style: {
                  textAnchor: 'middle',
                  fill: '#666',
                  fontSize: 14
                }
              }}
            />
            {rightAxis.length > 0 && (
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: rightAxis.map(p => `${p.name} (${p.unit})`).join(', '),
                  angle: 90,
                  position: 'insideRight',
                  offset: -15,
                  style: {
                    textAnchor: 'middle',
                    fill: '#666',
                    fontSize: 14
                  }
                }}
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                paddingTop: "40px",
                paddingBottom: "20px",
                bottom: -20
              }}
              iconType="circle"
              verticalAlign="bottom"
              align="center"
            />

            {/* 左軸參數使用柱狀圖 */}
            {leftAxis.map((param) => (
              <Bar
                key={param.id}
                yAxisId="left"
                dataKey={param.key}
                name={`${param.name} (${param.unit})`}
                fill={CHART_COLORS[param.key] || `hsl(${param.id * 45}, 70%, 50%)`}
                barSize={35}
              />
            ))}

            {/* 右軸參數使用散佈圖 */}
            {rightAxis.map((param) => (
              <Scatter
                key={param.id}
                yAxisId="right"
                dataKey={param.key}
                name={`${param.name} (${param.unit})`}
                fill={CHART_COLORS[param.key] || `hsl(${param.id * 45}, 70%, 50%)`}
                line={false}
                shape={(props) => {
                  const { cx, cy } = props;
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={6}
                      fill={props.fill}
                    />
                  );
                }}
                legendType="circle"
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// 自定義提示框組件
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-md">
        <p className="font-bold">{label}</p>
        {payload.map((entry, index) => {
          const paramInfo = parameters.find(p => p.key === entry.dataKey);
          return (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} ${paramInfo?.unit || ''}`}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

// 主應用組件  
// 整合所有功能並管理應用狀態  
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
  const [selectedRows, setSelectedRows] = useState([]);

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
          manufacturer: category.manufacturer  // 從 category 中獲取廠商資料  
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

  // 根據選中的行過濾數據用於圖表顯示
  const selectedData = useMemo(() => {
    return selectedRows.map(index => filteredAndSortedData[index]);
  }, [filteredAndSortedData, selectedRows]);

  // 處理排序  
  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // 處理拖拽開始  
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
        selectedRows={selectedRows}  
        onRowSelect={setSelectedRows} 
        onDrop={handleDrop}  
      />  

      {/* 圖表區域（僅在有選中參數和數據時顯示） */}  
      {selectedParams.length > 0 && filteredAndSortedData.length > 0 && (  
        <DataChart  
          filteredData={selectedData}  
          selectedParams={selectedParams}  
        />  
      )}  
    </div>  
  );  
}

export default MaterialFinderApp; 