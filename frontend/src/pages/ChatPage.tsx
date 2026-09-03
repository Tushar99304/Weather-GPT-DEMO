import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChatWindow } from '../components/chat/ChatWindow';
import { useWeatherStore } from '../store/useWeatherStore';
import { askWeatherGPT } from '../services/chatService';

export const ChatPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const { addMessage, currentLocation, preferences } = useWeatherStore();

  useEffect(() => {
    if (query) {
      addMessage({
        sender: 'user',
        text: query,
      });

      askWeatherGPT(query, currentLocation.name, preferences.language, preferences.demoMode).then((res) => {
        addMessage({
          sender: 'assistant',
          text: res.message,
          queryAnalysis: res.queryAnalysis,
          evidence: res.evidence,
          activeAlert: res.activeAlert,
        });
      });
    }
  }, [query]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-[#17352A]">WeatherGPT Conversational Assistant</h1>
        <p className="text-xs text-[#6B7D74]">
          Ask about weather forecasts, official IMD warnings, climate trends and travel safety conditions in natural language.
        </p>
      </div>

      <ChatWindow />
    </div>
  );
};
