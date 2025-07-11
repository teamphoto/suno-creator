'use client';

export default function InstrumentsSelector() {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">악기</label>
      <select className="border p-2 rounded w-full" multiple>
        <option value="guitar">기타</option>
        <option value="piano">피아노</option>
        <option value="drums">드럼</option>
        <option value="synth">신스</option>
        <option value="bass">베이스</option>
      </select>
      <p className="text-xs text-gray-400 mt-1">여러 악기를 선택하려면 Ctrl(또는 ⌘) 키를 누르세요.</p>
    </div>
  );
}
