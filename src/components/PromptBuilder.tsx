'use client';

import React, { useState, useEffect } from 'react';
import GenreSelector from './GenreSelector';
import VocalSelector from './VocalSelector';

const EVENTS = [
  { label: '생일', value: 'birthday' },
  { label: '크리스마스', value: 'christmas' },
  { label: '새해', value: 'new_year' },
  { label: '발렌타인', value: 'valentine' },
  { label: '할로윈', value: 'halloween' },
  { label: '결혼식', value: 'wedding' },
  { label: '졸업', value: 'graduation' },
  { label: '파티', value: 'party' },
  { label: '추모', value: 'memorial' }
];

const MOODS = [
  { label: '밝은', value: 'bright' },
  { label: '어두운', value: 'dark' },
  { label: '신나는', value: 'exciting' },
  { label: '몽환적인', value: 'dreamy' },
  { label: '빌보드 핫100 스타일', value: 'in_the_style_of_billboard_hot100' },
  { label: '멜론 탑100 스타일', value: 'in_the_style_of_melon_top100' },
  { label: '케이팝 스타일', value: 'in_the_style_of_kpop' }
];

const INSTRUMENTS = [
  { label: '기타', value: 'guitar' },
  { label: '피아노', value: 'piano' },
  { label: '신스', value: 'synth' },
  { label: '드럼', value: 'drums' },
  { label: '베이스', value: 'bass' },
  { label: '스트링', value: 'strings' },
  { label: '브라스', value: 'brass' },
  { label: '퍼커션', value: 'percussion' },
  { label: '플루트', value: 'flute' },
  { label: '색소폰', value: 'saxophone' },
  { label: '바이올린', value: 'violin' },
  { label: '첼로', value: 'cello' },
  { label: '트럼펫', value: 'trumpet' },
  { label: '하프', value: 'harp' },
  { label: '아코디언', value: 'accordion' },
  { label: '기타(etc)', value: 'other' }
];

const BUTTON_STYLE = {
  event:        'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50',
  mood:         'bg-gray-900 text-white border border-gray-700 hover:bg-gray-800',
  instrument:   'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
};

function CategoryButton({
  children,
  category,
  selected,
  onClick
}: {
  children: React.ReactNode;
  category: keyof typeof BUTTON_STYLE;
  selected?: boolean;
  onClick?: () => void;
}) {
  const selectedBg =
    category === 'event' || category === 'instrument'
      ? 'bg-blue-600 text-white border-blue-600'
      : 'bg-blue-500 text-white border-blue-500';

  return (
    <button
      type="button"
      className={`
        px-2 py-1 text-xs rounded-md font-medium transition
        border
        ${selected ? selectedBg : BUTTON_STYLE[category]}
      `}
      onClick={onClick}
      style={{
        minWidth: '0',
        minHeight: '0',
        lineHeight: '1.1',
        whiteSpace: 'nowrap'
      }}
    >
      {children}
    </button>
  );
}

interface PromptBuilderProps {
  onGeneratePrompt?: (prompt: string) => void;
}

function joinArray(arr: string[]): string {
  if (arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  return arr.slice(0, -1).join(', ') + ' and ' + arr[arr.length - 1];
}

export default function PromptBuilder({ onGeneratePrompt }: PromptBuilderProps) {
  const [event, setEvent] = useState<string>('birthday');
  const [mood, setMood] = useState<string>('bright');
  const [genre, setGenre] = useState<string>(''); // GenreSelector 연동
  const [vocal, setVocal] = useState<string>('male_vocal'); // VocalSelector 연동
  const [instruments, setInstruments] = useState<string[]>(['guitar', 'drums', 'synth']);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  function handleInstrumentChange(value: string) {
    setInstruments(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  }

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 1200);
  };

  const prompt = (() => {
    let promptStr = 'A';
    if (mood) promptStr += ` ${mood}`;
    if (genre) promptStr += ` ${genre}`;
    promptStr += ' song';
    if (event) promptStr += ` for a ${event}`;
    if (vocal && vocal !== 'instrumental') {
      promptStr += `, performed as a ${vocal}`;
    } else if (vocal === 'instrumental') {
      promptStr += ' (instrumental, no vocals)';
    }
    if (instruments.length > 0) {
      promptStr += `, featuring ${joinArray(instruments)}`;
    }
    promptStr += '.';
    return promptStr.replace('A  song', 'A song');
  })();

  useEffect(() => {
    if (onGeneratePrompt) onGeneratePrompt(prompt);
  }, [prompt]);

  return (
    <div className="bg-[#181e2a] p-6 rounded-xl max-w-xl mx-auto mt-4 shadow-lg text-white">
      <div className="bg-white text-black p-3 rounded-md mb-6 text-xs font-medium relative">
        <button
          onClick={copyPrompt}
          className={`absolute top-2 right-2 px-2 py-1 text-xs rounded 
            ${copiedPrompt
              ? 'bg-green-500 text-white animate-pulse'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
        >
          {copiedPrompt ? '✅ 복사됨' : '📋 복사'}
        </button>
        <span className="mr-2">🎵 Prompt:</span>
        {prompt}
      </div>

      <h1 className="text-2xl font-bold mb-4 text-center">
        SUNO Creator <span className="text-xs text-gray-400">[v1.0]</span>
      </h1>

      {/* 이벤트 */}
      <div className="mb-3">
        <div className="text-base font-semibold mb-1 text-yellow-200">이벤트</div>
        <div className="flex flex-wrap gap-1">
          {EVENTS.map(opt => (
            <CategoryButton
              key={opt.value}
              category="event"
              selected={event === opt.value}
              onClick={() => setEvent(opt.value)}
            >
              {opt.label}
            </CategoryButton>
          ))}
        </div>
      </div>
      <hr className="border-gray-700 my-3" />

      {/* 무드 */}
      <div className="mb-3">
        <div className="text-base font-semibold mb-1 text-blue-200">무드</div>
        <div className="flex flex-wrap gap-1">
          {MOODS.map(opt => (
            <CategoryButton
              key={opt.value}
              category="mood"
              selected={mood === opt.value}
              onClick={() => setMood(opt.value)}
            >
              {opt.label}
            </CategoryButton>
          ))}
        </div>
      </div>
      <hr className="border-gray-700 my-3" />

      {/* 장르 */}
      <GenreSelector value={genre} onChange={setGenre} />
      <hr className="border-gray-700 my-3" />

      {/* 보컬 스타일 */}
      <VocalSelector value={vocal} onChange={setVocal} />
      <hr className="border-gray-700 my-3" />

      {/* 악기 */}
      <div className="mb-3">
        <div className="text-base font-semibold mb-1 text-green-200">악기</div>
        <div className="flex flex-wrap gap-1">
          {INSTRUMENTS.map(opt => (
            <CategoryButton
              key={opt.value}
              category="instrument"
              selected={instruments.includes(opt.value)}
              onClick={() => handleInstrumentChange(opt.value)}
            >
              {opt.label}
            </CategoryButton>
          ))}
        </div>
      </div>
    </div>
  );
}
