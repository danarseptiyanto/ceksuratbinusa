import { useState, useMemo, useEffect, useRef } from "react";
import { format } from "date-fns";
import QRDownload from "./QRdownload";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
    Calendar as CalendarIcon,
    Loader2,
    MoreHorizontal,
    CalendarArrowUp,
    CircleCheck,
    CircleAlert,
    Search,
    CirclePlus,
    FileDigit,
    FileType2,
    UserPen,
    CalendarCheck,
    UploadCloud,
    Eye,
    Send,
    Filter,
} from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Badge } from "@/Components/ui/badge";

export default function Index({ surats }) {
    const { delete: destroy } = useForm();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [open, setOpen] = useState(false);
    const { url } = usePage();
    const hasOpened = useRef(false); // 🧠 guard

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const action = params.get("action");

        if (action === "create") {
            setOpen(true);

            window.history.replaceState({}, "", route("surat.index"));
        }
    }, []);

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
        kepada: "",
        tanggal_surat: today.toISOString().slice(0, 10),
        pdf_file: null,
        tipe: "surat internal",
        showpdf: true,
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
        let filtered = surats;
        if (searchTerm) {
            filtered = filtered.filter(
                (surat) =>
                    surat.nomor_surat
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    surat.nama_surat
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
            );
        }
        if (filterType !== "all") {
            filtered = filtered.filter((surat) => surat.tipe === filterType);
        }
        return filtered;
    }, [surats, searchTerm, filterType]);
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
            <div className="-mx-5 border-b px-5 py-5">
                <h1 className="text-2xl font-semibold leading-normal">
                    Surat Keluar
                </h1>
                <p className="text-muted-foreground">
                    Buat, kelola, atau hapus daftar surat keluar.
                </p>
            </div>
            <div className="mb-4 mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
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
                    <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="relative w-44">
                            <Filter className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                            <div className="pl-6">
                                <SelectValue placeholder="Filter by type" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="surat keluar">
                                Surat Keluar
                            </SelectItem>
                            <SelectItem value="surat internal">
                                Surat Internal
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="default" onClick={() => setOpen(true)}>
                    <CirclePlus /> Tambah
                </Button>
            </div>

            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead className="w-[10px] border-r">
                                No
                            </TableHead>
                            <TableHead className="w-[210px] text-nowrap border-r">
                                Nomor Surat
                            </TableHead>
                            <TableHead className="w-full border-r">
                                Perihal
                            </TableHead>
                            <TableHead className="text-nowrap border-r">
                                Jenis
                            </TableHead>
                            <TableHead className="text-nowrap border-r">
                                Tanggal
                            </TableHead>
                            <TableHead className="text-nowrap border-r px-0 text-center">
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
                                                    <li className="inline-flex items-center gap-2 capitalize">
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-muted">
                                                            <FileType2
                                                                size={14}
                                                            />
                                                        </div>
                                                        {surat.tipe}
                                                    </li>
                                                    <li className="inline-flex items-center gap-2 capitalize">
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-muted">
                                                            <Send size={14} />
                                                        </div>
                                                        {surat.kepada}
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
                                                                PDF Sudah
                                                                Diupload
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                PDF Belum
                                                                Diupload
                                                            </div>
                                                        )}
                                                    </li>
                                                    <li className="inline-flex items-center gap-2">
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-muted">
                                                            <Eye size={14} />
                                                        </div>
                                                        {surat.showpdf ? (
                                                            <div>
                                                                PDF Boleh
                                                                Diakses
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                PDF Tidak Boleh
                                                                Diakses
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
                                    <TableCell className="whitespace-nowrap border-r capitalize">
                                        {surat.tipe}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        <span className="flex items-center gap-2">
                                            <CalendarArrowUp
                                                size={15}
                                                className="text-muted-foreground"
                                            />
                                            {new Date(
                                                surat.tanggal_surat,
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
                                    <TableCell className="px-0 py-0 text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="m-0 h-8 w-8 p-0"
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
                                                            surat.slug,
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
                                                            surat.id,
                                                        )}
                                                    >
                                                        Edit Nomor Surat
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
                                    colSpan="7"
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
                <DialogContent className="sm:max-w-[725px]">
                    <form onSubmit={submit} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Tambah Surat Baru</DialogTitle>
                            <DialogDescription>
                                Isi detail surat kemudian klik Simpan untuk
                                menambahkan.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                            {/* Kepada */}
                            <div className="space-y-2">
                                <Label htmlFor="kepada">Kepada</Label>
                                <Input
                                    id="kepada"
                                    type="text"
                                    value={data.kepada}
                                    onChange={(e) =>
                                        setData("kepada", e.target.value)
                                    }
                                    autoComplete="off"
                                />
                                {errors.kepada && (
                                    <p className="text-sm text-destructive">
                                        {errors.kepada}
                                    </p>
                                )}
                            </div>
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
                                            "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {data.tanggal_surat ? (
                                            format(
                                                new Date(data.tanggal_surat),
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
                                        selected={new Date(data.tanggal_surat)}
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

                        {/* Tipe and Show PDF */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="tipe">Tipe Surat</Label>
                                <Select
                                    value={data.tipe}
                                    onValueChange={(value) =>
                                        setData("tipe", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tipe surat" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="surat keluar">
                                            Surat Keluar
                                        </SelectItem>
                                        <SelectItem value="surat internal">
                                            Surat Internal
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.tipe && (
                                    <p className="text-sm text-destructive">
                                        {errors.tipe}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2 pt-8">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="showpdf"
                                        checked={data.showpdf}
                                        onCheckedChange={(value) =>
                                            setData("showpdf", value)
                                        }
                                    />
                                    <label
                                        htmlFor="showpdf"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Tampilkan PDF
                                    </label>
                                </div>
                                {errors.showpdf && (
                                    <p className="text-sm text-destructive">
                                        {errors.showpdf}
                                    </p>
                                )}
                            </div>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Batal</Button>
                            </DialogClose>
                            <Button type="submit" disabled={processing}>
                                {processing && (
                                    <Loader2 className="h-4 w-4 animate-spin" />
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
