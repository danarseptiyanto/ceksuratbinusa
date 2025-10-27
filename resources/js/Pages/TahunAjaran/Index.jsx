import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function Index({ tahunAjarans }) {
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    return (
        <AppLayout bc1="Tahun Ajaran" bc2="Daftar Tahun Ajaran">
            <div className="-mx-5 border-b px-5 py-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold leading-normal">
                            Tahun Ajaran
                        </h1>
                        <p className="text-muted-foreground">
                            Buat, kelola, atau hapus daftar Tahun Ajaran.
                        </p>
                    </div>
                    <Link href={route("tahun-ajaran.create")}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah TA
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="mt-5">
                <div className="mt-2 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {tahunAjarans.map((ta) => (
                        <div
                            className="flex items-center justify-between rounded-md border p-6"
                            key={ta.id}
                        >
                            <div>
                                <p className="mb-1 text-xs">Tahun Ajaran</p>
                                <p className="mb-4 text-xl font-semibold">
                                    {ta.tahun}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Link href={route("tahun-ajaran.edit", ta.id)}>
                                    <Button variant="outline" size="icon">
                                        <Pencil className="!h-3 !w-3" />
                                    </Button>
                                </Link>
                                <form
                                    method="POST"
                                    action={route(
                                        "tahun-ajaran.destroy",
                                        ta.id,
                                    )}
                                    onSubmit={(e) => {
                                        if (
                                            !confirm(
                                                "Apakah Anda yakin ingin menghapus tahun ajaran ini?",
                                            )
                                        ) {
                                            e.preventDefault();
                                        }
                                    }}
                                    className="inline"
                                >
                                    <input
                                        type="hidden"
                                        name="_token"
                                        value={csrfToken}
                                    />
                                    <input
                                        type="hidden"
                                        name="_method"
                                        value="DELETE"
                                    />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        type="submit"
                                    >
                                        <Trash2 className="!h-3 !w-3" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
