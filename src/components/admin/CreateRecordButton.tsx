"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateRecordModal } from "./CreateRecordModal";

export function CreateRecordButton({
  type,
  label,
}: {
  type: "cliente" | "compromisso" | "processo";
  label: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 bg-[#0E223D] px-5 py-3 text-sm font-bold text-white hover:bg-[#07172B]"
      >
        <Plus size={16} /> {label}
      </button>
      {open && <CreateRecordModal type={type} onClose={() => setOpen(false)} />}
    </>
  );
}
