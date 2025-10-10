import React from "react";
import AppLayout from "@/Layouts/AppLayout";

export default function Index({ tahunAjarans }) {
    return (
        <AppLayout bc1="Tahun Ajaran" bc2="Daftar Tahun Ajaran">
            <div className="-mx-5 border-b px-5 py-5">
                <h1 className="text-2xl font-semibold leading-normal">
                    Tahun Ajaran
                </h1>
                <p className="text-muted-foreground">
                    Buat, kelola, atau hapus daftar Tahun Ajaran.
                </p>
            </div>
            <div className="mt-5">
                <div className="mt-2 flex gap-5">
                    {tahunAjarans.map((ta) => (
                        <div
                            className="w-full rounded-md border p-8"
                            key={ta.id}
                        >
                            <p className="mb-1 text-xs">Tahun Ajaran</p>
                            <p className="text-xl font-semibold">{ta.tahun}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
