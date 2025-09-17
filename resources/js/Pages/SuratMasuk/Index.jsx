// resources/js/Pages/SuratMasuk/Index.jsx
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Index({ suratMasuks }) {
    const { delete: destroy } = useForm();

    function handleDelete(e, suratId) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this item?")) {
            destroy(route("surat-masuk.destroy", suratId), {
                preserveScroll: true,
            });
        }
    }

    return (
        <AppLayout header="Arsip Surat Masuk">
            <Head title="Surat Masuk" />

            <Link
                href={route("surat-masuk.create")}
                role="button"
                style={{ marginBottom: "1rem" }}
            >
                + Arsipkan Surat Masuk Baru
            </Link>

            <figure>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nomor Surat</th>
                            <th>Perihal</th>
                            <th>Asal Surat</th>
                            <th>Tanggal Surat</th>
                            <th>File</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suratMasuks.data.map((surat, index) => (
                            <tr key={surat.id}>
                                <td>{index + 1}</td>
                                <td>{surat.nomor_surat}</td>
                                <td>{surat.nama_surat}</td>
                                <td>{surat.asal_surat}</td>
                                <td>
                                    {new Date(
                                        surat.tanggal_surat
                                    ).toLocaleDateString("id-ID")}
                                </td>
                                <td>
                                    {surat.file_path ? (
                                        <a
                                            href={`/storage/${surat.file_path}`}
                                            target="_blank"
                                        >
                                            Lihat
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td>
                                    <Link
                                        href={route(
                                            "surat-masuk.edit",
                                            surat.id
                                        )}
                                    >
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </figure>
        </AppLayout>
    );
}
