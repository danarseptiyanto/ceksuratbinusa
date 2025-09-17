// resources/js/Pages/Surat/Index.jsx
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Index({ surats }) {
    const { delete: destroy } = useForm();

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

            <Link
                href={route("surat.create")}
                role="button"
                style={{ marginBottom: "1rem" }}
            >
                + Tambah Nomor Baru
            </Link>

            <figure>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nomor Surat</th>
                            <th scope="col">Nama Surat</th>
                            <th scope="col">Tanggal</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surats.data.map((surat, index) => (
                            <tr key={surat.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{surat.nomor_surat}</td>
                                <td>{surat.nama_surat}</td>
                                <td>
                                    {new Date(
                                        surat.tanggal_surat
                                    ).toLocaleDateString("id-ID")}
                                </td>
                                <td>
                                    <a
                                        href={route("surat.verify", surat.slug)}
                                        target="_blank"
                                    >
                                        Verify/QR
                                    </a>{" "}
                                    |{" "}
                                    <Link href={route("surat.edit", surat.id)}>
                                        Edit
                                    </Link>{" "}
                                    |{" "}
                                    <a
                                        href="#"
                                        onClick={(e) =>
                                            handleDelete(e, surat.id)
                                        }
                                    >
                                        Delete
                                    </a>
                                    {/* ... etc */}
                                </td>
                                <td>
                                    <Link href={route("surat.edit", surat.id)}>
                                        Edit
                                    </Link>{" "}
                                    |{" "}
                                    <a
                                        href="#"
                                        onClick={(e) =>
                                            handleDelete(e, surat.id)
                                        }
                                    >
                                        Delete
                                    </a>
                                    {/* We will add QR and File links later */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </figure>
        </AppLayout>
    );
}
