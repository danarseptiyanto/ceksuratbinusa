import { useState, useMemo } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

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
        <AppLayout header="Daftar Nomor Surat">
            <Head title="Daftar Surat" />

            <div className="flex justify-between items-center mb-4">
                <Input
                    type="text"
                    placeholder="Cari nomor atau perihal surat..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <Link
                    href={route("surat.create")}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                    + Tambah Nomor Baru
                </Link>
            </div>

            <div className="rounded-lg border overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead className="w-[10px]">No</TableHead>
                            <TableHead className="w-[210px]">
                                Nomor Surat
                            </TableHead>
                            <TableHead>Perihal</TableHead>
                            <TableHead className="text-right">
                                Tanggal
                            </TableHead>
                            <TableHead className="text-center">Aksi</TableHead>
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
                                    <TableCell className="text-right">
                                        {new Date(
                                            surat.tanggal_surat
                                        ).toLocaleDateString("id-ID")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <a
                                            href={route(
                                                "surat.verify",
                                                surat.slug
                                            )}
                                            target="_blank"
                                            className="font-medium text-blue-600 hover:underline"
                                        >
                                            Verify/QR
                                        </a>
                                        <span className="mx-2">|</span>
                                        <Link
                                            href={route("surat.edit", surat.id)}
                                            className="font-medium text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <span className="mx-2">|</span>
                                        <a
                                            href="#"
                                            onClick={(e) =>
                                                handleDelete(e, surat.id)
                                            }
                                            className="font-medium text-red-600 hover:underline"
                                        >
                                            Delete
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan="5"
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
