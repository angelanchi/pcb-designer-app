import React from 'react';  
import MaterialStackApp from './components/MaterialStackApp';  
import ClaudeChatbox from './components/ClaudeChatbox';  

function App() {  
    return (  
        <div className="min-h-screen bg-gray-100">  
            {/* Navigation Bar */}  
            <nav className="bg-white shadow-sm border-b border-gray-200">  
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
                    <div className="flex justify-between h-16">  
                        <div className="flex">  
                            <div className="flex-shrink-0 flex items-center">  
                                <h1 className="text-xl font-bold text-gray-900">材料堆疊設計助手</h1>  
                            </div>  
                        </div>  
                    </div>  
                </div>  
            </nav>  

            {/* Main Content */}  
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">  
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">  
                    {/* Left Content Area */}  
                    <div className="lg:col-span-3">  
                        <MaterialStackApp />  
                    </div>  

                    {/* Right Chat Assistant */}  
                    <div className="lg:col-span-1">  
                        <div className="sticky top-4">  
                            <ClaudeChatbox />  
                        </div>  
                    </div>  
                </div>  
            </div>  
        </div>  
    );  
}  

export default App;