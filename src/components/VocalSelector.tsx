'use client';

import { useState } from 'react';
import vocalsData from '@/data/vocals.json';

interface VocalSelectorProps {
  value: string;
  onChange: (styleValue: string) => void;
}

const VocalSelector = ({ value, onChange }: VocalSelectorProps) => {
  const [selectedGroup, setSelectedGroup] = useState(vocalsData[0].value);
  const groupObj = vocalsData.find(g => g.value === selectedGroup);
  const detailStyles = groupObj?.styles ?? [];

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">보컬 스타일</label>
      {/* 대표 그룹 버튼 */}
      <div className="flex flex-wrap gap-2 mb-2">
        {vocalsData.map(g => (
          <button
            key={g.value}
            className={`px-3 py-1 rounded border text-xs font-medium
              ${selectedGroup === g.value
                ? 'bg-purple-700 text-white border-purple-700'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-purple-100'}
            `}
            onClick={() => setSelectedGroup(g.value)}
            type="button"
          >
            {g.group}
          </button>
        ))}
      </div>
      {/* 세부 스타일 */}
      {detailStyles.length > 0 && (
        <div className="rounded-xl p-4 bg-purple-50 border border-purple-200">
          <div className="mb-2 text-xs text-purple-500 font-semibold">세부 보컬 스타일을 선택하세요</div>
          <div className="flex flex-wrap gap-2">
            {detailStyles.map(style => (
              <button
                key={style.value}
                className={`px-4 py-2 rounded-full border-2 text-sm font-extrabold shadow transition
                  ${value === style.value
                    ? 'bg-fuchsia-400 text-white border-fuchsia-600 scale-105'
                    : 'bg-white text-gray-900 border-fuchsia-200 hover:bg-fuchsia-100'}
                `}
                style={{
                  minWidth: 120,
                  letterSpacing: '0.01em',
                  borderWidth: 2,
                  transition: 'all 0.15s'
                }}
                onClick={() => onChange(style.value)}
                type="button"
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VocalSelector;
