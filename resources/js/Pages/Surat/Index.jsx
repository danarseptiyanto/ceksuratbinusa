import { useState, useMemo } from "react";
import {
    MoreHorizontal,
    CalendarArrowUp,
    CircleCheck,
    CircleAlert,
} from "lucide-react";
import AppLayout from "@/Layouts/AppLayout";
import { Link, useForm } from "@inertiajs/react";
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

    // Memoize the filtered data to avoid re-calculation on every render
    const filteredSurats = useMemo(() => {
        if (!searchTerm) {
            return surats;
        }

        return surats.filter(
            (surat) =>
                surat.nomor_surat
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                surat.nama_surat
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
    }, [surats, searchTerm]); // Dependency array: only re-run when surats or searchTerm changes

    function handleDelete(e, suratId) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this item?")) {
            destroy(route("surat.destroy", suratId), {
                preserveScroll: true,
            });
        }
    }

    return (
        <AppLayout>
            <div>
                <h1>Surat Masuk</h1>
            </div>
            <div className="flex my-4 justify-between items-center">
                <Input
                    type="text"
                    placeholder="Cari nomor atau perihal surat..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <Link href={route("surat.create")}>
                    <Button>Tambah Surat</Button>
                </Link>
            </div>

            <div className="rounded-lg border overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead className="w-[10px]">No</TableHead>
                            <TableHead className="w-[210px] text-nowrap">
                                Nomor Surat
                            </TableHead>
                            <TableHead className="w-full">Perihal</TableHead>
                            <TableHead className="text-nowrap">
                                Tanggal
                            </TableHead>
                            <TableHead className="text-nowrap">
                                File PDF
                            </TableHead>
                            <TableHead className=" text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSurats.length > 0 ? (
                            filteredSurats.map((surat, index) => (
                                <TableRow key={surat.id}>
                                    <TableCell scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{surat.nomor_surat}</TableCell>
                                    <TableCell>{surat.nama_surat}</TableCell>
                                    <TableCell className="whitespace-nowrap flex items-center gap-2">
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
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        {surat.file_path ? (
                                            <span className="flex items-center gap-2">
                                                <CircleCheck
                                                    size={15}
                                                    className="text-muted-foreground"
                                                />
                                                Sudah Upload
                                            </span>
                                        ) : (
                                            <span className="text-red-600 flex items-center gap-2">
                                                <CircleAlert
                                                    size={15}
                                                    className=""
                                                />
                                                Belum Upload
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right py-0">
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
        </AppLayout>
    );
}
