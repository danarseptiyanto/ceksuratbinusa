import { useState, useMemo, useEffect, useRef } from "react";
import { format } from "date-fns";
import QRDownload from "./QRdownload";
import {
    Calendar as CalendarIcon,
    Loader2,
    MoreHorizontal,
    CalendarArrowUp,
    CircleCheck,
    CircleAlert,
    Search,
    CirclePlus,
    Paperclip,
} from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import AppLayout from "@/Layouts/AppLayout";
import { Link, useForm, usePage, router } from "@inertiajs/react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Index({ surats }) {
    const { delete: destroy } = useForm();
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const { url } = usePage();
    const hasOpened = useRef(false); // 🧠 guard

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const action = params.get("action");

        if (action === "create") {
            setOpen(true);

            // ✅ Use browser history API instead of Inertia router
            // This avoids triggering Inertia re-renders
            window.history.replaceState({}, "", route("surat.index"));
        }
    }, []); // only run once when mounted

    const today = new Date();
    const year = today.getFullYear();
    const romanMonths = [
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI",
        "XII",
    ];
    const month = romanMonths[today.getMonth()];
    const generatedNomorSurat = `/ST/SMK.BN/${month}/${year}`;

    const { data, setData, post, reset, errors, processing } = useForm({
        nomor_surat: generatedNomorSurat,
        nama_surat: "",
        tanggal_surat: today.toISOString().slice(0, 10),
        pdf_file: null,
    });

    function submit(e) {
        e.preventDefault();
        post(route("surat.store"), {
            onSuccess: () => {
                reset();
                setOpen(false); // ✅ close only when successful
            },
        });
    }

    const filteredSurats = useMemo(() => {
        if (!searchTerm) return surats;
        return surats.filter(
            (surat) =>
                surat.nomor_surat
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                surat.nama_surat
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
    }, [surats, searchTerm]);

    function handleDelete(e, suratId) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this item?")) {
            destroy(route("surat.destroy", suratId), {
                preserveScroll: true,
            });
        }
    }

    return (
        <AppLayout bc1="Surat Keluar" bc2="Daftar Surat Keluar">
            <div className="py-5 border-b -mx-5 px-5">
                <h1 className="text-2xl font-semibold leading-normal">
                    Surat Keluar
                </h1>
                <p className="text-muted-foreground">
                    Buat, kelola, atau hapus daftar surat keluar.
                </p>
            </div>

            <div className="flex mb-4 mt-5 justify-between items-center">
                <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Cari nomor dan perihal surat..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Button variant="default" onClick={() => setOpen(true)}>
                    <CirclePlus /> Tambah
                </Button>
            </div>

            <div className="rounded-lg border overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead className="border-r w-[10px]">
                                No
                            </TableHead>
                            <TableHead className="border-r w-[210px] text-nowrap">
                                Nomor Surat
                            </TableHead>
                            <TableHead className="border-r w-full">
                                Perihal
                            </TableHead>
                            <TableHead className="border-r text-nowrap">
                                Tanggal
                            </TableHead>
                            <TableHead className="border-r px-0 text-nowrap text-center">
                                PDF
                            </TableHead>
                            <TableHead className="px-2">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSurats.length > 0 ? (
                            filteredSurats.map((surat, index) => (
                                <TableRow key={surat.id}>
                                    <TableCell
                                        className="border-r text-center"
                                        scope="row"
                                    >
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="border-r">
                                        {surat.nomor_surat}
                                    </TableCell>
                                    <TableCell className="border-r">
                                        {surat.nama_surat}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        <span className="flex items-center gap-2">
                                            <CalendarArrowUp
                                                size={15}
                                                className="text-muted-foreground"
                                            />
                                            {new Date(
                                                surat.tanggal_surat
                                            ).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap border-x">
                                        {surat.file_path ? (
                                            <CircleCheck
                                                size={15}
                                                className="text-green-500"
                                            />
                                        ) : (
                                            <CircleAlert
                                                size={15}
                                                className="text-red-500"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center py-0 px-0">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 m-0"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                className="w-36"
                                                align="end"
                                            >
                                                {surat.file_path && (
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        asChild
                                                    >
                                                        <a
                                                            // Assuming files are served from the /storage directory
                                                            href={`/storage/${surat.file_path}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Buka file PDF
                                                        </a>
                                                    </DropdownMenuItem>
                                                )}
                                                <QRDownload slug={surat.slug} />
                                                <DropdownMenuItem
                                                    className="cursor-pointer"
                                                    asChild
                                                >
                                                    <a
                                                        href={route(
                                                            "surat.verify",
                                                            surat.slug
                                                        )}
                                                        target="_blank"
                                                    >
                                                        Link Verifikasi
                                                    </a>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="cursor-pointer"
                                                    asChild
                                                >
                                                    <Link
                                                        href={route(
                                                            "surat.edit",
                                                            surat.id
                                                        )}
                                                    >
                                                        Edit Nomor Surat
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-red-600 cursor-pointer focus:text-red-600"
                                                    onClick={(e) =>
                                                        handleDelete(
                                                            e,
                                                            surat.id
                                                        )
                                                    }
                                                >
                                                    Hapus
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                {/* Updated colSpan to account for the new column */}
                                <TableCell
                                    colSpan="6"
                                    className="h-24 text-center"
                                >
                                    Tidak ada data ditemukan.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Dialog Form */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[525px]">
                    <form onSubmit={submit} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Tambah Surat Baru</DialogTitle>
                            <DialogDescription>
                                Isi detail surat kemudian klik Simpan untuk
                                menambahkan.
                            </DialogDescription>
                        </DialogHeader>

                        {/* Nomor Surat */}
                        <div className="space-y-2">
                            <Label htmlFor="nomor_surat">Nomor Surat</Label>
                            <Input
                                id="nomor_surat"
                                type="text"
                                value={data.nomor_surat}
                                onChange={(e) =>
                                    setData("nomor_surat", e.target.value)
                                }
                                autoComplete="off"
                            />
                            {errors.nomor_surat && (
                                <p className="text-sm text-destructive">
                                    {errors.nomor_surat}
                                </p>
                            )}
                        </div>

                        {/* Nama Surat */}
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
                            <Label htmlFor="tanggal_surat">Tanggal Surat</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !data.tanggal_surat &&
                                                "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {data.tanggal_surat ? (
                                            format(
                                                new Date(data.tanggal_surat),
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
                                        selected={new Date(data.tanggal_surat)}
                                        onSelect={(date) =>
                                            setData(
                                                "tanggal_surat",
                                                format(date, "yyyy-MM-dd")
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
                                Upload PDF (Optional)
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
                                <Button variant="outline">Batal</Button>
                            </DialogClose>
                            <Button type="submit" disabled={processing}>
                                {processing && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Simpan
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
