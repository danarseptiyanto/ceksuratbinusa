// resources/js/Pages/SuratMasuk/Edit.jsx

import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm, Link, router } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils"; // Make sure you have this utility file from shadcn
import { format } from "date-fns";
import { id } from "date-fns/locale"; // Import Indonesian locale for date formatting
import { Loader2, Eye, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

export default function Edit({ suratMasuk }) {
    const { data, setData, post, errors, processing } = useForm({
        _method: "PUT",
        nomor_surat: suratMasuk.nomor_surat || "",
        nama_surat: suratMasuk.nama_surat || "",
        asal_surat: suratMasuk.asal_surat || "",
        // Ensure tanggal_surat is a valid date string or empty string
        tanggal_surat: suratMasuk.tanggal_surat || "",
        pdf_file: null,
    });

    // State to control the popover's open/closed status
    const [isCalendarOpen, setCalendarOpen] = useState(false);

    function submit(e) {
        e.preventDefault();
        post(route("surat-masuk.update", suratMasuk.id), {
            preserveScroll: true,
        });
    }

    function handleDeleteFile(e) {
        e.preventDefault();
        if (confirm("Anda yakin ingin menghapus file PDF yang terlampir?")) {
            router.delete(route("surat-masuk.deleteFile", suratMasuk.id), {
                preserveScroll: true,
            });
        }
    }

    return (
        <AppLayout header={`Edit Arsip: ${suratMasuk.nama_surat}`}>
            <Head title="Edit Arsip Surat Masuk" />

            <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Formulir Edit Arsip
                    </h1>
                    <p className="text-muted-foreground">
                        Perbarui detail data arsip surat masuk.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* ... other form fields (Nomor, Nama, Asal Surat) remain the same ... */}
                    <div className="grid gap-2">
                        <Label htmlFor="nomor_surat">Nomor Surat</Label>
                        <Input
                            id="nomor_surat"
                            type="text"
                            value={data.nomor_surat}
                            onChange={(e) =>
                                setData("nomor_surat", e.target.value)
                            }
                            className={
                                errors.nomor_surat ? "border-red-500" : ""
                            }
                        />
                        {errors.nomor_surat && (
                            <p className="text-sm text-red-600">
                                {errors.nomor_surat}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="nama_surat">Nama/Perihal Surat</Label>
                        <Input
                            id="nama_surat"
                            type="text"
                            value={data.nama_surat}
                            onChange={(e) =>
                                setData("nama_surat", e.target.value)
                            }
                            className={
                                errors.nama_surat ? "border-red-500" : ""
                            }
                        />
                        {errors.nama_surat && (
                            <p className="text-sm text-red-600">
                                {errors.nama_surat}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="asal_surat">Asal Surat</Label>
                        <Input
                            id="asal_surat"
                            type="text"
                            value={data.asal_surat}
                            onChange={(e) =>
                                setData("asal_surat", e.target.value)
                            }
                            className={
                                errors.asal_surat ? "border-red-500" : ""
                            }
                        />
                        {errors.asal_surat && (
                            <p className="text-sm text-red-600">
                                {errors.asal_surat}
                            </p>
                        )}
                    </div>

                    {/* Tanggal Surat with Calendar Component */}
                    <div className="grid gap-2">
                        <Label>Tanggal Surat</Label>
                        <Popover
                            open={isCalendarOpen}
                            onOpenChange={setCalendarOpen}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !data.tanggal_surat &&
                                            "text-muted-foreground",
                                        errors.tanggal_surat &&
                                            "border-red-500",
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {data.tanggal_surat ? (
                                        format(
                                            new Date(data.tanggal_surat),
                                            "PPP",
                                            { locale: id },
                                        )
                                    ) : (
                                        <span>Pilih tanggal</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    // The `selected` prop expects a Date object, so we convert the string
                                    selected={
                                        data.tanggal_surat
                                            ? new Date(data.tanggal_surat)
                                            : undefined
                                    }
                                    onSelect={(date) => {
                                        // Format the selected Date object back to a 'yyyy-MM-dd' string for the form data
                                        setData(
                                            "tanggal_surat",
                                            date
                                                ? format(date, "yyyy-MM-dd")
                                                : "",
                                        );
                                        // Close the popover after selection
                                        setCalendarOpen(false);
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.tanggal_surat && (
                            <p className="text-sm text-red-600">
                                {errors.tanggal_surat}
                            </p>
                        )}
                    </div>
                    {/* ... File Management and Action Buttons remain the same ... */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                            Manajemen File PDF
                        </h3>
                        {suratMasuk.file_path ? (
                            <div className="flex items-center justify-between rounded-md border bg-muted/50 p-3">
                                <p className="text-sm font-medium">
                                    File saat ini terlampir.
                                </p>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={`/storage/${suratMasuk.file_path}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            Lihat File
                                        </Button>
                                    </a>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={handleDeleteFile}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Hapus File
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Tidak ada file yang terlampir.
                            </p>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="pdf_file">
                                Upload File Baru (Opsional)
                            </Label>
                            <Input
                                id="pdf_file"
                                type="file"
                                accept=".pdf"
                                onChange={(e) =>
                                    setData("pdf_file", e.target.files[0])
                                }
                                className={
                                    errors.pdf_file ? "border-red-500" : ""
                                }
                            />
                            <p className="text-xs text-muted-foreground">
                                Mengunggah file baru akan menggantikan file yang
                                lama (jika ada).
                            </p>
                            {errors.pdf_file && (
                                <p className="text-sm text-red-600">
                                    {errors.pdf_file}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-8 flex items-center justify-end gap-4">
                        <Link href={route("surat-masuk.index")}>
                            <Button type="button" variant="outline">
                                Batal
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                "Simpan Perubahan"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
