// resources/js/Pages/SuratMasuk/Edit.jsx
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm, Link, router } from "@inertiajs/react";

export default function Edit({ suratMasuk }) {
    const { data, setData, post, errors, processing } = useForm({
        _method: "PUT",
        nomor_surat: suratMasuk.nomor_surat || "",
        nama_surat: suratMasuk.nama_surat || "",
        asal_surat: suratMasuk.asal_surat || "",
        tanggal_surat: suratMasuk.tanggal_surat || "",
        pdf_file: null,
    });

    function submit(e) {
        e.preventDefault();
        post(route("surat-masuk.update", suratMasuk.id), {
            preserveScroll: true,
        });
    }

    function handleDeleteFile(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete the attached PDF file?")) {
            router.delete(route("surat-masuk.deleteFile", suratMasuk.id), {
                preserveScroll: true,
            });
        }
    }

    return (
        <AppLayout header={`Edit Arsip: ${suratMasuk.nomor_surat}`}>
            <Head title="Edit Arsip Surat Masuk" />

            {/* The form structure is identical to Create.jsx, just pre-filled */}
            <form onSubmit={submit}>
                {/* Form fields are the same as Create.jsx, but with values from `data` object */}
                {/* ... (copy form structure from Create.jsx) ... */}

                <hr />
                <h6>Manajemen File PDF</h6>
                {suratMasuk.file_path ? (
                    <div>
                        <a
                            href={`/storage/${suratMasuk.file_path}`}
                            target="_blank"
                            role="button"
                            className="outline"
                        >
                            📄 Lihat File
                        </a>
                        <button
                            onClick={handleDeleteFile}
                            className="secondary"
                            style={{ marginLeft: "1rem" }}
                        >
                            🗑️ Hapus File
                        </button>
                    </div>
                ) : (
                    <p>
                        <em>Tidak ada file terlampir.</em>
                    </p>
                )}
                <label htmlFor="pdf_file" style={{ marginTop: "1rem" }}>
                    Upload File Baru (Akan menggantikan file lama jika ada)
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setData("pdf_file", e.target.files[0])}
                    />
                </label>
                {errors.pdf_file && (
                    <small style={{ color: "var(--pico-invalid)" }}>
                        {errors.pdf_file}
                    </small>
                )}

                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                        marginTop: "1.5rem",
                    }}
                >
                    <button
                        type="submit"
                        disabled={processing}
                        aria-busy={processing}
                    >
                        Update
                    </button>
                    <Link
                        href={route("surat-masuk.index")}
                        role="button"
                        className="secondary"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </AppLayout>
    );
}
