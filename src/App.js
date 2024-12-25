import React from 'react';  
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  
import MaterialStackApp from './components/MaterialStackApp';  
import MaterialFinderApp from './components/MaterialFinderApp';  
import ClaudeChatbox from './components/ClaudeChatbox';


const App = () => {  
  return (  
    <Router>  
      <div className="min-h-screen bg-gray-100">  
        {/* 导航栏 */}  
        <nav className="bg-white shadow-lg">  
          <div className="max-w-7xl mx-auto px-4">  
            <div className="flex justify-between h-16">  
              <div className="flex">  
                <div className="flex-shrink-0 flex items-center">  
                  <h1 className="text-xl font-bold text-gray-800">AI tool研發賦能平台</h1>  
                </div>  
                <div className="hidden md:ml-6 md:flex md:space-x-8">  
                  <Link  
                    to="/stack"  
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-500"  
                  >  
                    疊構設計器  
                  </Link>

                  <Link  
                    to="/finder"  
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-500"  
                  >  
                    材料搜尋工具  
                  </Link>  
                  <Link  
                    to="/chat"  
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-500"  
                  >  
                    AI 助手  
                  </Link>  
                </div>  
              </div>  
            </div>  
          </div>  
        </nav>  

        {/* 主要内容区域 */}  
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">  
          <div className="px-4 py-6 sm:px-0">  
            <Routes>  
              <Route path="/" element={<HomePage />} />  
              <Route path="/stack" element={<MaterialStackApp />} />
 
              <Route path="/finder" element={<MaterialFinderApp />} />  
              <Route path="/chat" element={<ClaudeChatbox />} />  
            </Routes>  
          </div>  
        </div>  
      </div>  
    </Router>  
  );  
};  

// 首页组件  
const HomePage = () => {  
  return (  
    <div className="max-w-3xl mx-auto text-center">  
      <h2 className="text-3xl font-bold text-gray-900 mb-8">  
        欢迎使用材料科学工具箱  
      </h2>  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">  
        <Link  
          to="/stack"  
          className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"  
        >  
          <h3 className="text-xl font-semibold mb-2">叠构设计器</h3>  
          <p className="text-gray-600">  
            设计和管理材料层结构  
          </p>  
        </Link>
        <Link
          to="/stackup"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">叠构数据库</h3>
          <p className="text-gray-600">
            查看和下载叠构数据
          </p>
        </Link>  
        <Link  
          to="/finder"  
          className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"  
        >  
          <h3 className="text-xl font-semibold mb-2">材料查找器</h3>  
          <p className="text-gray-600">  
            搜索和筛选各类材料信息  
          </p>  
        </Link>  
        <Link  
          to="/chat"  
          className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"  
        >  
          <h3 className="text-xl font-semibold mb-2">AI 助手</h3>  
          <p className="text-gray-600">  
            智能问答和材料咨询  
          </p>  
        </Link>  
      </div>  
    </div>  
  );  
};  

export default App;