'use client';

export default function MoodSelector() {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">무드</label>
      <select className="border p-2 rounded w-full">
        <option value="">무드를 선택하세요</option>
        <option value="bright">밝은</option>
        <option value="dreamy">몽환적인</option>
        <option value="dark">어두운</option>
        <option value="exciting">신나는</option>
      </select>
    </div>
  );
}
