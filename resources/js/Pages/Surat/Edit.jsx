// resources/js/Pages/Surat/Edit.jsx
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm, Link, router } from "@inertiajs/react";

export default function Edit({ surat }) {
    // Main form for updating text fields and uploading a new file
    const { data, setData, post, errors, processing } = useForm({
        _method: "PUT", // Important: Tells Laravel to use the UPDATE route method
        nomor_surat: surat.nomor_surat || "",
        nama_surat: surat.nama_surat || "",
        tanggal_surat: surat.tanggal_surat || "",
        pdf_file: null, // Field for a new file upload
    });

    // Handler for the main form submission
    function submit(e) {
        e.preventDefault();
        // We use `post` because HTML forms don't natively support PUT.
        // Inertia sends a POST request with a hidden `_method` field,
        // which Laravel correctly interprets as a PUT/PATCH request.
        post(route("surat.update", surat.id), {
            preserveScroll: true,
        });
    }

    // Handler to delete only the PDF file
    function handleDeleteFile(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete the attached PDF file?")) {
            // We need a dedicated route for this action.
            router.delete(route("surat.deleteFile", surat.id), {
                preserveScroll: true,
            });
        }
    }

    return (
        <AppLayout header={`Edit Surat: ${surat.nomor_surat}`}>
            <Head title="Edit Surat" />

            <form onSubmit={submit}>
                {/* Nomor Surat Field */}
                <label htmlFor="nomor_surat">
                    Nomor Surat
                    <input
                        id="nomor_surat"
                        type="text"
                        value={data.nomor_surat}
                        onChange={(e) => setData("nomor_surat", e.target.value)}
                        aria-invalid={errors.nomor_surat ? "true" : "false"}
                    />
                    {errors.nomor_surat && (
                        <small
                            style={{
                                color: "var(--pico-form-element-invalid-active-border-color)",
                            }}
                        >
                            {errors.nomor_surat}
                        </small>
                    )}
                </label>

                {/* Nama Surat Field */}
                <label htmlFor="nama_surat">
                    Nama/Perihal Surat
                    <input
                        id="nama_surat"
                        type="text"
                        value={data.nama_surat}
                        onChange={(e) => setData("nama_surat", e.target.value)}
                        aria-invalid={errors.nama_surat ? "true" : "false"}
                    />
                    {errors.nama_surat && (
                        <small
                            style={{
                                color: "var(--pico-form-element-invalid-active-border-color)",
                            }}
                        >
                            {errors.nama_surat}
                        </small>
                    )}
                </label>

                {/* Tanggal Surat Field */}
                <label htmlFor="tanggal_surat">
                    Tanggal Surat
                    <input
                        id="tanggal_surat"
                        type="date"
                        value={data.tanggal_surat}
                        onChange={(e) =>
                            setData("tanggal_surat", e.target.value)
                        }
                        aria-invalid={errors.tanggal_surat ? "true" : "false"}
                    />
                    {errors.tanggal_surat && (
                        <small
                            style={{
                                color: "var(--pico-form-element-invalid-active-border-color)",
                            }}
                        >
                            {errors.tanggal_surat}
                        </small>
                    )}
                </label>

                <hr />

                {/* File Management Section */}
                <h6>Manajemen File PDF</h6>
                {surat.file_path ? (
                    <div>
                        <p>File saat ini:</p>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                                marginBottom: "1rem",
                            }}
                        >
                            <a
                                href={`/storage/${surat.file_path}`}
                                target="_blank"
                                role="button"
                                className="outline"
                            >
                                📄 Lihat File Saat Ini
                            </a>
                            <button
                                onClick={handleDeleteFile}
                                className="secondary"
                            >
                                🗑️ Hapus File
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>
                        <em>Tidak ada file PDF yang terlampir.</em>
                    </p>
                )}

                <label htmlFor="pdf_file">
                    Upload File Baru (Akan menggantikan file lama jika ada)
                    <input
                        id="pdf_file"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setData("pdf_file", e.target.files[0])}
                        aria-invalid={errors.pdf_file ? "true" : "false"}
                    />
                    {errors.pdf_file && (
                        <small
                            style={{
                                color: "var(--pico-form-element-invalid-active-border-color)",
                            }}
                        >
                            {errors.pdf_file}
                        </small>
                    )}
                </label>

                {/* Action Buttons */}
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
                        Update Surat
                    </button>
                    <Link
                        href={route("surat.index")}
                        role="button"
                        className="secondary"
                    >
                        Batal
                    </Link>
                </div>
            </form>
        </AppLayout>
    );
}
