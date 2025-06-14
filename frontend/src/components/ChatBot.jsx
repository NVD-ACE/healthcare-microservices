// // src/components/ChatBot.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import BotIconUrl from '../assets/icons/bot.svg';
// import UserIconUrl from '../assets/icons/user.svg';
// import axios from 'axios';

// const LOCAL_API_URL = 'http://localhost:8020/api/chatbot/respond/';

// export default function ChatBot() {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { from: 'bot', text: 'Xin chào! Tôi là chatbot chẩn đoán sức khỏe. Hãy mô tả các triệu chứng của bạn.' }
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [sessionId, setSessionId] = useState(null);
//   const messagesEndRef = useRef(null);

//   const toggleOpen = () => setOpen(prev => !prev);

//   const sendToChatbot = async (prompt) => {
//     setLoading(true);
//     try {
//       const res = await axios.post(LOCAL_API_URL, {
//         message: prompt,
//         // session_id: sessionId || null,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//       });

//       // Save session ID if new
//       if (!sessionId && res.data.session_id) {
//         setSessionId(res.data.session_id);
//       }

//       return res.data.reply;
//     } catch (err) {
//       console.error('Chatbot API error', err);
//       return 'Xin lỗi, tôi gặp sự cố khi xử lý yêu cầu.';
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     const userMsg = { from: 'user', text: input.trim() };
//     setMessages(prev => [...prev, userMsg]);
//     setInput('');

//     const loadingMsg = { from: 'bot', text: '...' };
//     setMessages(prev => [...prev, loadingMsg]);

//     const response = await sendToChatbot(userMsg.text);

//     setMessages(prev => {
//       // remove last loading placeholder
//       const withoutLoading = prev.filter(m => m.text !== '...');
//       return [...withoutLoading, { from: 'bot', text: response }];
//     });
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <div className='z-10 relative'>
//       <button
//         onClick={toggleOpen}
//         aria-label={open ? 'Close chat' : 'Open chat'}
//         className="fixed bottom-6 right-6 bg-gradient-to-tr from-purple-600 to-indigo-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition"
//       >
//         {open ? <span className="text-2xl">×</span> : <img src={BotIconUrl} alt="Chat" className="w-8 h-8" />}
//       </button>

//       {open && (
//         <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-gray-200">
//           <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <img src={BotIconUrl} alt="Bot" className="w-6 h-6" />
//               <span className="font-semibold">Tư vấn sức khỏe</span>
//             </div>
//             <button onClick={toggleOpen} aria-label="Close chat" className="text-xl">×</button>
//           </div>

//           <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50">
//             {messages.map((m, i) => (
//               <div key={i} className={`flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
//                 <div className={`max-w-[70%] flex space-x-2 ${m.from === 'bot' ? 'flex-row' : 'flex-row-reverse'}`}>
//                   <img
//                     src={m.from === 'bot' ? BotIconUrl : UserIconUrl}
//                     alt={m.from}
//                     className="w-5 h-5 mt-1"
//                   />
//                   <div className={`p-2 rounded-xl shadow-sm text-sm leading-relaxed
//                     ${m.from === 'bot'
//                       ? 'bg-white text-gray-800'
//                       : 'bg-gradient-to-tr from-green-100 to-green-200 text-gray-800'}
//                   `}>
//                     {m.text}
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="p-3 border-t border-gray-200 flex items-center space-x-2">
//             <input
//               value={input}
//               onChange={e => setInput(e.target.value)}
//               onKeyDown={e => e.key === 'Enter' && handleSend()}
//               disabled={loading}
//               placeholder="Nhập triệu chứng của bạn..."
//               className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//             <button
//               onClick={handleSend}
//               disabled={loading}
//               className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
//             >
//               {loading ? '...' : 'Gửi'}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  User,
  Send,
  Mic,
  MicOff,
  Settings,
  Zap,
  Brain,
  AlertTriangle,
  Heart,
  Activity,
  X,
  Sparkles,
} from "lucide-react";

// Google Gemini AI Integration
const GEMINI_API_KEY = "AIzaSyDgE7SbU0KPn9efezb7S9uztdIYlx3bwNo";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// OpenAI Integration (alternative)
const OPENAI_API_KEY =
  "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";
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export default function AdvancedAIChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "🏥 Xin chào! Tôi là AI Health Assistant được hỗ trợ bởi Google Gemini.\n\n✨ Tôi có thể:\n• Phân tích triệu chứng chi tiết\n• Tư vấn sức khỏe chuyên sâu\n• Gợi ý điều trị và phòng ngừa\n• Đánh giá mức độ nghiêm trọng\n• Hướng dẫn chăm sóc tại nhà\n\n⚠️ Lưu ý: Tôi chỉ tư vấn, không thay thế bác sĩ!\n\nHãy mô tả chi tiết tình trạng sức khỏe của bạn.",
      type: "welcome",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [aiModel, setAiModel] = useState("gemini"); // 'gemini', 'openai', 'local'
  const [conversationHistory, setConversationHistory] = useState([]);
  // const [userProfile, setUserProfile] = useState({
  //   age: null,
  //   gender: null,
  //   medicalHistory: [],
  //   currentSymptoms: []
  // });
  const messagesEndRef = useRef(null);

  // Enhanced system prompts for different AI models
  const getSystemPrompt = () => {
    return `Bạn là một AI chuyên gia tư vấn sức khỏe tiên tiến với những đặc điểm sau:

KIẾN THỨC CHUYÊN MÔN:
- Hiểu biết sâu về y học, triệu chứng, bệnh lý
- Có thể phân tích mối liên hệ giữa các triệu chứng
- Đưa ra gợi ý điều trị và phòng ngừa phù hợp
- Đánh giá mức độ khẩn cấp của tình trạng

PHONG CÁCH GIAO TIẾP:
- Thân thiện, chuyên nghiệp và đáng tin cậy
- Đặt câu hỏi follow-up để hiểu rõ hơn
- Giải thích y học bằng ngôn ngữ dễ hiểu
- Luôn khuyến khích gặp bác sĩ khi cần thiết

NGUYÊN TẮC AN TOÀN:
- Không chẩn đoán chính thức hay kê đơn thuốc
- Luôn đề cập đến việc tham khảo ý kiến bác sĩ
- Nhấn mạnh tính chất tham khảo của lời khuyên
- Ưu tiên an toàn và thận trọng trong mọi tình huống

ĐỊNH DẠNG PHẢN HỒI:
- Sử dụng emoji phù hợp để làm rõ ý nghĩa
- Chia thông tin thành các phần dễ đọc
- Đưa ra các câu hỏi follow-up khi cần
- Cung cấp lời khuyên thực tiễn và hữu ích

Hãy phản hồi bằng tiếng Việt và luôn đặt sự an toàn của người dùng lên hàng đầu.`;
  };

  // Google Gemini API call
  const callGeminiAPI = async (message, history) => {
    try {
      const prompt = `${getSystemPrompt()}\n\nLịch sử hội thoại:\n${history
        .map((h) => `${h.role}: ${h.content}`)
        .join("\n")}\n\nNgười dùng: ${message}\n\nAI Assistant:`;

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_MEDICAL",
              threshold: "BLOCK_NONE",
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  };

  // OpenAI API call
  const callOpenAIAPI = async (message, history) => {
    try {
      const messages = [
        { role: "system", content: getSystemPrompt() },
        ...history,
        { role: "user", content: message },
      ];

      const response = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("OpenAI API Error:", error);
      throw error;
    }
  };

  // Local/Fallback AI simulation with medical knowledge
  const callLocalAI = async (message) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const medicalKeywords = {
      "đau đầu":
        "Đau đầu có thể do nhiều nguyên nhân như căng thẳng, thiếu ngủ, hoặc các vấn đề sức khỏe nghiêm trọng hơn. Bạn có thể mô tả thêm về vị trí đau, mức độ và thời gian kéo dài không?",
      sốt: "Sốt là dấu hiệu cơ thể đang chống lại nhiễm trùng. Nhiệt độ của bạn là bao nhiêu? Có kèm theo triệu chứng nào khác như ho, đau họng không?",
      ho: "Ho có thể là triệu chứng của nhiều tình trạng từ cảm lạnh thông thường đến các vấn đề hô hấp nghiêm trọng hơn. Bạn ho có đờm không? Ho bao lâu rồi?",
      "đau bụng":
        "Đau bụng có thể liên quan đến tiêu hóa, căng thẳng hoặc các vấn đề nội khoa khác. Bạn có thể mô tả vị trí đau cụ thể và mức độ nghiêm trọng không?",
      "mệt mỏi":
        "Mệt mỏi kéo dài có thể do thiếu ngủ, căng thẳng, hoặc các vấn đề sức khỏe tiềm ẩn. Tình trạng này kéo dài bao lâu rồi? Có ảnh hưởng đến sinh hoạt hàng ngày không?",
    };

    const matchedKeyword = Object.keys(medicalKeywords).find((keyword) =>
      message.toLowerCase().includes(keyword)
    );

    if (matchedKeyword) {
      return `🔍 **Phân tích triệu chứng:**\n\n${medicalKeywords[matchedKeyword]}\n\n💡 **Gợi ý ban đầu:**\n• Theo dõi và ghi lại các triệu chứng\n• Đảm bảo nghỉ ngơi đầy đủ\n• Uống nhiều nước\n• Tránh căng thẳng\n\n⚠️ **Lưu ý quan trọng:** Nếu triệu chứng trở nên nghiêm trọng hoặc kéo dài, hãy tham khảo ý kiến bác sĩ ngay lập tức.\n\n🤔 Bạn có muốn chia sẻ thêm thông tin để tôi có thể tư vấn chính xác hơn không?`;
    }

    return `🤖 **Phân tích AI:**\n\nCảm ơn bạn đã chia sẻ. Tôi đã ghi nhận thông tin và sẽ cần thêm chi tiết để đưa ra tư vấn chính xác hơn.\n\n📋 **Thông tin bổ sung cần thiết:**\n• Triệu chứng xuất hiện khi nào?\n• Mức độ nghiêm trọng (1-10)?\n• Có yếu tố nào làm tăng/giảm triệu chứng?\n• Tiền sử bệnh lý có liên quan?\n\n💊 **Lời khuyên chung:**\n• Theo dõi kỹ các biểu hiện\n• Duy trì lối sống lành mạnh\n• Tham khảo ý kiến chuyên gia nếu cần\n\n🏥 **Khi nào cần gặp bác sĩ ngay:**\n• Triệu chứng trở nên nghiêm trọng\n• Xuất hiện các dấu hiệu báo động\n• Không cải thiện sau vài ngày`;
  };

  // Main AI calling function
  const sendToAI = async (message) => {
    setLoading(true);
    try {
      let response;
      const history = conversationHistory.slice(-10); // Keep last 10 exchanges

      switch (aiModel) {
        case "gemini":
          response = await callGeminiAPI(message, history);
          break;
        case "openai":
          response = await callOpenAIAPI(message, history);
          break;
        default:
          response = await callLocalAI(message, history);
      }

      // Update conversation history
      setConversationHistory((prev) => [
        ...prev,
        { role: "user", content: message },
        { role: "assistant", content: response },
      ]);

      return response;
    } catch (error) {
      console.error("AI API Error:", error);
      return `⚠️ **Lỗi kết nối AI:**\n\nXin lỗi, tôi gặp vấn đề khi kết nối với hệ thống AI. Đang chuyển sang chế độ offline...\n\n🔄 **Vui lòng thử lại sau hoặc:**\n• Kiểm tra kết nối internet\n• Liên hệ hỗ trợ kỹ thuật\n• Sử dụng chế độ tư vấn cơ bản\n\n📞 **Trong trường hợp khẩn cấp:** Hãy liên hệ ngay với cơ sở y tế gần nhất!`;
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (messageText = null) => {
    const message = messageText || input.trim();
    if (!message || loading) return;

    const userMsg = {
      from: "user",
      text: message,
      timestamp: new Date(),
      type: "user",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Add advanced typing indicator
    const typingMsg = {
      from: "bot",
      text: "Đang phân tích với AI...",
      type: "typing",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, typingMsg]);

    const response = await sendToAI(message);

    setMessages((prev) => {
      const withoutTyping = prev.filter((m) => m.type !== "typing");
      return [
        ...withoutTyping,
        {
          from: "bot",
          text: response,
          timestamp: new Date(),
          type: "ai_response",
          model: aiModel,
        },
      ];
    });
  };

  const startVoiceRecognition = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "vi-VN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => {
        setIsListening(false);
        alert("Lỗi nhận dạng giọng nói. Vui lòng thử lại.");
      };

      recognition.start();
    } else {
      alert("Trình duyệt không hỗ trợ nhận dạng giọng nói");
    }
  };

  const getAIModelIcon = () => {
    switch (aiModel) {
      case "gemini":
        return <Sparkles className="w-4 h-4 text-blue-500" />;
      case "openai":
        return <Zap className="w-4 h-4 text-green-500" />;
      default:
        return <Brain className="w-4 h-4 text-purple-500" />;
    }
  };

  const getAIModelName = () => {
    switch (aiModel) {
      case "gemini":
        return "Google Gemini Pro";
      case "openai":
        return "OpenAI GPT-4";
      default:
        return "Local AI";
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="z-50 relative">
      {/* Advanced floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white w-18 h-18 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 hover:shadow-blue-500/30 ring-4 ring-white/30"
      >
        {open ? (
          <X className="w-7 h-7" />
        ) : (
          <div className="relative">
            <Brain className="w-8 h-8" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-[420px] h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-gray-200/50 backdrop-blur-sm">
          {/* Advanced header with AI model info */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Brain className="w-8 h-8" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                    {getAIModelIcon()}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Health Assistant</h3>
                  <p className="text-blue-100 text-xs flex items-center space-x-1">
                    <span>Powered by {getAIModelName()}</span>
                    <Activity className="w-3 h-3" />
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={aiModel}
                  onChange={(e) => setAiModel(e.target.value)}
                  className="text-xs bg-white/20 border border-white/30 rounded-lg px-2 py-1 text-white"
                >
                  <option value="gemini" className="text-black">
                    Gemini Pro
                  </option>
                  <option value="openai" className="text-black">
                    GPT-4
                  </option>
                  <option value="local" className="text-black">
                    Local AI
                  </option>
                </select>
                <button
                  onClick={() => setOpen(false)}
                  className="text-xl hover:bg-white/20 rounded-full p-1 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages with enhanced styling */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.from === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[90%] flex items-start space-x-3 ${
                    m.from === "bot"
                      ? "flex-row"
                      : "flex-row-reverse space-x-reverse"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      m.from === "bot"
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                        : "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                    }`}
                  >
                    {m.from === "bot" ? (
                      <Brain className="w-5 h-5" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>
                  <div
                    className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed relative max-w-full ${
                      m.from === "bot"
                        ? "bg-white text-gray-800 border border-gray-100"
                        : "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                    }`}
                  >
                    {m.type === "typing" ? (
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-gray-600">
                          AI đang suy nghĩ...
                        </span>
                      </div>
                    ) : (
                      <div className="whitespace-pre-line break-words">
                        {m.text}
                      </div>
                    )}

                    {m.timestamp && m.type !== "typing" && (
                      <div
                        className={`text-xs mt-3 pt-2 border-t flex items-center justify-between ${
                          m.from === "bot"
                            ? "text-gray-400 border-gray-100"
                            : "text-green-100 border-green-400/30"
                        }`}
                      >
                        <span>
                          {m.timestamp.toLocaleTimeString("vi", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {m.from === "bot" && m.model && (
                          <span className="flex items-center space-x-1">
                            {getAIModelIcon()}
                            <span className="text-xs">{getAIModelName()}</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Advanced input area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  disabled={loading}
                  placeholder="Mô tả chi tiết triệu chứng, cảm giác, thời gian, mức độ..."
                  rows={2}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 resize-none"
                />
                <button
                  onClick={startVoiceRecognition}
                  disabled={loading}
                  className="absolute right-3 bottom-3 text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5 text-red-500 animate-pulse" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>
              </div>
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/30 flex items-center space-x-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Enhanced footer */}
            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Heart className="w-3 h-3 text-red-400" />
                  <span>AI Tư vấn Thông minh</span>
                </span>
                <span className="flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3 text-yellow-500" />
                  <span>Chỉ tham khảo</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>AI Online</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
