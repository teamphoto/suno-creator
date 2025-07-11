'use client';

export default function KeywordInput() {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">추가 키워드</label>
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="추가 키워드를 입력하세요 (예: 여름밤, 몽환적, 청량감)"
      />
    </div>
  );
}
