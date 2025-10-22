// resources/js/Pages/SuratMasuk/Index.jsx
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    MoreHorizontal,
    CircleCheck,
    CircleAlert,
    CirclePlus,
    Search,
    CalendarIcon,
    Loader2, // Added for loading spinner
    FileDigit,
    FileType2,
    Send,
    UserPen,
    CalendarCheck,
    UploadCloud,
} from "lucide-react";
import { format } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
    DialogTrigger, // Added for idiomatic dialog opening
} from "@/components/ui/dialog";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/Components/ui/badge";

export default function Index({ suratMasuks }) {
    const { delete: destroy } = useForm();
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false); // State to control the dialog

    const { data, setData, post, errors, processing, reset } = useForm({
        // Added 'reset'
        nomor_surat: "",
        nama_surat: "",
        asal_surat: "",
        tanggal_surat: new Date().toISOString().slice(0, 10),
        pdf_file: null,
    });

    // Updated submit function
    function submit(e) {
        e.preventDefault();
        post(route("surat-masuk.store"), {
            onSuccess: () => {
                reset(); // Reset form fields
                setOpen(false); // Close dialog on success
            },
            // On error, the dialog remains open automatically
        });
    }

    function handleDelete(e, suratId) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this item?")) {
            destroy(route("surat-masuk.destroy", suratId), {
                preserveScroll: true,
            });
        }
    }

    const filteredSuratMasuks = suratMasuks.filter(
        (surat) =>
            surat.nomor_surat
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            surat.nama_surat.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <AppLayout bc1="Surat Masuk" bc2="Daftar Surat Masuk">
            <Head title="Surat Masuk" />
            <div className="-mx-5 border-b px-5 py-5">
                <h1 className="text-2xl font-semibold leading-normal">
                    Surat Masuk
                </h1>
                <p className="text-muted-foreground">
                    Buat, kelola, atau hapus daftar surat masuk.
                </p>
            </div>
            <div className="mb-4 mt-5 flex items-center justify-between">
                <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Cari nomor dan perihal surat..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* --- MODIFICATION START --- */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default">
                            <CirclePlus className="h-4 w-4" /> Tambah
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[725px]">
                        <form onSubmit={submit} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle>Formulir Surat Masuk</DialogTitle>
                                <DialogDescription>
                                    Isi semua detail surat yang diperlukan. Klik
                                    Simpan jika sudah selesai.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Nomor Surat */}
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
                                                e.target.value,
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

                                {/* Asal Surat (Pengirim) */}
                                <div className="space-y-2">
                                    <Label htmlFor="asal_surat">
                                        Asal Surat (Pengirim)
                                    </Label>
                                    <Input
                                        id="asal_surat"
                                        type="text"
                                        value={data.asal_surat}
                                        onChange={(e) =>
                                            setData(
                                                "asal_surat",
                                                e.target.value,
                                            )
                                        }
                                        autoComplete="off"
                                    />
                                    {errors.asal_surat && (
                                        <p className="text-sm text-destructive">
                                            {errors.asal_surat}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Nama / Perihal Surat */}
                            <div className="space-y-2">
                                <Label htmlFor="nama_surat">
                                    Nama / Perihal Surat
                                </Label>
                                <Input
                                    id="nama_surat"
                                    type="text"
                                    value={data.nama_surat}
                                    onChange={(e) =>
                                        setData("nama_surat", e.target.value)
                                    }
                                    autoComplete="off"
                                />
                                {errors.nama_surat && (
                                    <p className="text-sm text-destructive">
                                        {errors.nama_surat}
                                    </p>
                                )}
                            </div>

                            {/* Tanggal Surat */}
                            <div className="space-y-2">
                                <Label htmlFor="tanggal_surat">
                                    Tanggal Surat
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !data.tanggal_surat &&
                                                    "text-muted-foreground",
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {data.tanggal_surat ? (
                                                format(
                                                    new Date(
                                                        data.tanggal_surat,
                                                    ),
                                                    "PPP",
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
                                                data.tanggal_surat
                                                    ? new Date(
                                                          data.tanggal_surat,
                                                      )
                                                    : null
                                            }
                                            onSelect={(date) =>
                                                setData(
                                                    "tanggal_surat",
                                                    format(date, "yyyy-MM-dd"),
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

                            {/* Upload PDF */}
                            <div className="space-y-2">
                                <Label htmlFor="pdf_file">
                                    Upload File PDF (Opsional)
                                </Label>
                                <Input
                                    id="pdf_file"
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) =>
                                        setData("pdf_file", e.target.files[0])
                                    }
                                />
                                {errors.pdf_file && (
                                    <p className="text-sm text-destructive">
                                        {errors.pdf_file}
                                    </p>
                                )}
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={processing}>
                                    {processing && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Save
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
                {/* --- MODIFICATION END --- */}
            </div>

            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-[50px] border-r text-center">
                                No
                            </TableHead>
                            <TableHead className="whitespace-nowrap border-r">
                                Nomor Surat
                            </TableHead>
                            <TableHead className="w-full border-r">
                                Perihal
                            </TableHead>
                            <TableHead className="whitespace-nowrap border-r">
                                Pengirim
                            </TableHead>
                            <TableHead className="w-[150px] text-nowrap border-r">
                                Tanggal Surat
                            </TableHead>
                            <TableHead className="border-r px-2 text-center">
                                File
                            </TableHead>
                            <TableHead className="px-2 text-center">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSuratMasuks.length > 0 ? (
                            filteredSuratMasuks.map((surat, index) => (
                                <TableRow
                                    key={surat.id}
                                    className="hover:bg-muted/50"
                                >
                                    <TableCell className="border-r text-center font-medium">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="border-r">
                                        <HoverCard>
                                            <HoverCardTrigger>
                                                <Badge className="h-6 cursor-pointer font-medium">
                                                    {surat.nomor_surat}
                                                </Badge>
                                            </HoverCardTrigger>
                                            <HoverCardContent>
                                                <ul className="flex flex-col gap-3">
                                                    <li className="inline-flex items-center gap-2">
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-muted">
                                                            <FileDigit
                                                                size={14}
                                                            />
                                                        </div>
                                                        {surat.nomor_surat}
                                                    </li>
                                                    <li className="inline-flex items-center gap-2">
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-muted">
                                                            <FileType2
                                                                size={14}
                                                            />
                                                        </div>
                                                        {surat.nama_surat}
                                                    </li>
                                                    <li className="inline-flex items-center gap-2">
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-muted">
                                                            <Send size={14} />
                                                        </div>
                                                        {surat.asal_surat}
                                                    </li>
                                                    <li className="inline-flex items-center gap-2">
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-muted">
                                                            <UserPen
                                                                size={14}
                                                            />
                                                        </div>
                                                        {surat.user.name}
                                                    </li>
                                                    <li className="inline-flex items-center gap-2">
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-muted">
                                                            <CalendarCheck
                                                                size={14}
                                                            />
                                                        </div>
                                                        {new Date(
                                                            surat.tanggal_surat,
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                            {
                                                                day: "numeric",
                                                                month: "long",
                                                                year: "numeric",
                                                            },
                                                        )}
                                                    </li>
                                                    <li className="inline-flex items-center gap-2">
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-muted">
                                                            <UploadCloud
                                                                size={14}
                                                            />
                                                        </div>
                                                        {surat.file_path ? (
                                                            <div>
                                                                File Sudah
                                                                Diupload
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                File Belum
                                                                Diupload
                                                            </div>
                                                        )}
                                                    </li>
                                                </ul>
                                            </HoverCardContent>
                                        </HoverCard>
                                    </TableCell>
                                    <TableCell className="border-r">
                                        {surat.nama_surat}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap border-r">
                                        {surat.asal_surat}
                                    </TableCell>
                                    <TableCell className="text-nowrap border-r">
                                        {new Date(
                                            surat.tanggal_surat,
                                        ).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell className="border-r text-center">
                                        {surat.file_path ? (
                                            <CircleCheck
                                                size={18}
                                                className="mx-auto text-green-500"
                                            />
                                        ) : (
                                            <CircleAlert
                                                size={18}
                                                className="mx-auto text-red-500"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell className="px-0 py-0 text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="m-0 h-8 w-8 p-0"
                                                >
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="w-36"
                                            >
                                                {surat.file_path && (
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        asChild
                                                    >
                                                        <a
                                                            href={`/storage/${surat.file_path}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Lihat File
                                                        </a>
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem
                                                    className="cursor-pointer"
                                                    asChild
                                                >
                                                    <Link
                                                        href={route(
                                                            "surat-masuk.edit",
                                                            surat.id,
                                                        )}
                                                    >
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="cursor-pointer text-red-600 focus:text-red-600"
                                                    onClick={(e) =>
                                                        handleDelete(
                                                            e,
                                                            surat.id,
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan="8"
                                    className="h-24 text-center"
                                >
                                    Tidak ada data ditemukan.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
