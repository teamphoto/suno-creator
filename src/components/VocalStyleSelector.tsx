'use client';

export default function VocalStyleSelector() {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">보컬 스타일</label>
      <select className="border p-2 rounded w-full">
        <option value="">보컬 스타일을 선택하세요</option>
        <option value="male">남성 보컬</option>
        <option value="female">여성 보컬</option>
        <option value="duet">듀엣</option>
        <option value="choir">합창</option>
        <option value="instrumental">보컬 없음</option>
      </select>
    </div>
  );
}
