// AI Chatbox Component
import React, { useState, useRef, useEffect } from 'react';  
import { Send, Bot, User } from 'lucide-react'; 
const ClaudeChatbox = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // 自動滾動到最新消息
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    // 發送消息到 Claude API
    const sendMessage = async () => {
        if (!inputMessage.trim()) return;

        const newMessage = {
            content: inputMessage,
            role: 'user',
            timestamp: new Date().toISOString(),
        };

        setMessages(prev => [...prev, newMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // 這裡需要替換為您的 Claude API 端點和認證信息 
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'YOUR_API_KEY',
                },
                body: JSON.stringify({
                    messages: [...messages, newMessage].map(msg => ({
                        role: msg.role,
                        content: msg.content,
                    })),
                }),
            });

            const data = await response.json();
            
            setMessages(prev => [...prev, {
                content: data.content,
                role: 'assistant',
                timestamp: new Date().toISOString(),
            }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                content: '抱歉，發生錯誤。請稍後再試。',
                role: 'assistant',
                timestamp: new Date().toISOString(),
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-[600px] bg-white rounded-lg shadow">
            {/* 聊天標題 */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 rounded-t-lg">
                <h2 className="text-lg font-semibold text-gray-700">AI 助手</h2>
            </div>
            {/* 消息列表 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex items-start space-x-2 ${
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        {message.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <Bot size={20} className="text-blue-600" />
                            </div>
                        )}
                        <div
                            className={`max-w-[70%] px-4 py-2 rounded-lg ${
                                message.role === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                            <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                        {message.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                                <User size={20} className="text-white" />
                            </div>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Bot size={20} className="text-blue-600" />
                        </div>
                        <div className="bg-gray-100 px-4 py-2 rounded-lg">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            {/* 輸入區域 */}
            <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-4">
                    <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="輸入訊息..."
                        className="flex-1 resize-none rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[44px] max-h-32 p-2"
                        rows="1"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !inputMessage.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ClaudeChatbox;