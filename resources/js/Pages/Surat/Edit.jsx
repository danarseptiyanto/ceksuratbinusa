import AppLayout from "../../Layouts/AppLayout";
import { Head, useForm, Link, router } from "@inertiajs/react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, Trash2 } from "lucide-react";
import { Button } from "../../Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "../../Components/ui/card";
import { Input } from "../../Components/ui/input";
import { Label } from "../../Components/ui/label";
import { Calendar } from "../../Components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../Components/ui/popover";
import { cn } from "../../lib/utils";
export default function Edit({ surat }) {
    const { data, setData, post, errors, processing } = useForm({
        _method: "PUT",
        nomor_surat: surat.nomor_surat || "",
        nama_surat: surat.nama_surat || "",
        tanggal_surat: surat.tanggal_surat || "",
        pdf_file: null,
    });
    function submit(e) {
        e.preventDefault();
        post(route("surat.update", surat.id), {
            forceFormData: true,
            preserveScroll: true,
        });
    }
    function handleDeleteFile(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete the attached PDF file?")) {
            router.delete(route("surat.deleteFile", surat.id), {
                preserveScroll: true,
            });
        }
    }
    return (
        <AppLayout bc1="Surat Keluar" bc2="Edit Surat Keluar">
            <Head title="Edit Surat" />

            <div className="py-5 border-b -mx-5 px-5">
                <h1 className="text-2xl font-semibold leading-normal">
                    Edit Surat Keluar
                </h1>
                <p className="text-muted-foreground">
                    Perbarui detail surat keluar dan kelola file lampiran.
                </p>
            </div>

            <div className="py-4">
                <div className="mx-auto">
                    <form onSubmit={submit}>
                        <Card>
                            <CardHeader className="border-b">
                                <h1 className="font-semibold text-lg leading-tight">
                                    Formulir Edit Surat
                                </h1>
                            </CardHeader>
                            <CardContent className="space-y-5 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nomor_surat">
                                        Nomor Surat
                                    </Label>
                                    <Input
                                        id="nomor_surat"
                                        type="text"
                                        value={data.nomor_surat}
                                        onChange={(e) =>
                                            setData(
                                                "nomor_surat",
                                                e.target.value
                                            )
                                        }
                                        autoComplete="off"
                                    />
                                    {errors.nomor_surat && (
                                        <p className="text-sm text-destructive">
                                            {errors.nomor_surat}
                                        </p>
                                    )}
                                </div>

                                {/* Nama/Perihal Surat */}
                                <div className="space-y-2">
                                    <Label htmlFor="nama_surat">
                                        Nama / Perihal Surat
                                    </Label>
                                    <Input
                                        id="nama_surat"
                                        type="text"
                                        value={data.nama_surat}
                                        onChange={(e) =>
                                            setData(
                                                "nama_surat",
                                                e.target.value
                                            )
                                        }
                                        autoComplete="off"
                                    />
                                    {errors.nama_surat && (
                                        <p className="text-sm text-destructive">
                                            {errors.nama_surat}
                                        </p>
                                    )}
                                </div>

                                {/* Tanggal Surat - Date Picker */}
                                <div className="space-y-2">
                                    <Label htmlFor="tanggal_surat">
                                        Tanggal Surat
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !data.tanggal_surat &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {data.tanggal_surat ? (
                                                    format(
                                                        new Date(
                                                            data.tanggal_surat
                                                        ),
                                                        "PPP"
                                                    )
                                                ) : (
                                                    <span>Pilih tanggal</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={
                                                    new Date(data.tanggal_surat)
                                                }
                                                onSelect={(date) =>
                                                    setData(
                                                        "tanggal_surat",
                                                        format(
                                                            date,
                                                            "yyyy-MM-dd"
                                                        )
                                                    )
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {errors.tanggal_surat && (
                                        <p className="text-sm text-destructive">
                                            {errors.tanggal_surat}
                                        </p>
                                    )}
                                </div>

                                {/* PDF File Management */}
                                <div className="space-y-2">
                                    <Label>Manajemen File PDF</Label>
                                    {surat.file_path ? (
                                        <div className="flex items-center gap-3 px-6 p-3 bg-muted rounded-md">
                                            <a
                                                href={`/storage/${surat.file_path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-grow text-sm font-medium text-primary hover:underline"
                                            >
                                                Lihat File Saat Ini
                                            </a>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={handleDeleteFile}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground italic">
                                            Tidak ada file PDF yang terlampir.
                                        </p>
                                    )}
                                </div>

                                {/* PDF File Upload */}
                                <div className="space-y-2">
                                    <Label htmlFor="pdf_file">
                                        Upload File Baru (Akan menggantikan file
                                        lama)
                                    </Label>
                                    <Input
                                        id="pdf_file"
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) =>
                                            setData(
                                                "pdf_file",
                                                e.target.files[0]
                                            )
                                        }
                                    />
                                    {errors.pdf_file && (
                                        <p className="text-sm text-destructive">
                                            {errors.pdf_file}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="border-t pt-5 bg-muted rounded-b-lg flex justify-end gap-2">
                                <Button asChild variant="outline">
                                    <Link href={route("surat.index")}>
                                        Cancel
                                    </Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Update
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
