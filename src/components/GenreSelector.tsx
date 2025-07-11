'use client';

import { useState } from 'react';
import genresData from '@/data/genres.json';

interface GenreSelectorProps {
  value: string;
  onChange: (genreValue: string) => void;
}

export default function GenreSelector({ value, onChange }: GenreSelectorProps) {
  const [selectedGroup, setSelectedGroup] = useState(genresData[0].value);
  const groupObj = genresData.find(g => g.value === selectedGroup);
  const detailGenres = groupObj?.genres ?? [];

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">장르</label>
      {/* 그룹 버튼 */}
      <div className="flex flex-wrap gap-2 mb-2">
        {genresData.map(g => (
          <button
            key={g.value}
            className={`px-3 py-1 rounded border text-xs font-medium
              ${selectedGroup === g.value
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}
            `}
            onClick={() => setSelectedGroup(g.value)}
            type="button"
          >
            {g.group}
          </button>
        ))}
      </div>

      {/* 추천 장르 안내 및 세부 버튼 (배경 강조!) */}
      {detailGenres.length > 0 && (
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
          <div className="mb-2 text-sm text-blue-600 font-bold">추천 장르를 선택하세요</div>
          <div className="flex flex-wrap gap-2">
            {detailGenres.map(genre => (
              <button
                key={genre.value}
                className={`px-4 py-2 rounded-full border-2 text-sm font-extrabold shadow transition
                  ${value === genre.value
                    ? 'bg-lime-300 text-black border-lime-400 scale-105 ring-2 ring-lime-400'
                    : 'bg-lime-100 text-black border-lime-200 hover:bg-lime-200'}
                `}
                style={{
                  minWidth: 100,
                  letterSpacing: '0.02em',
                  transition: 'all 0.18s'
                }}
                onClick={() => onChange(genre.value)}
                type="button"
              >
                {genre.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
