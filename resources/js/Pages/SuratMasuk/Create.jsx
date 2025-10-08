// resources/js/Pages/SuratMasuk/Create.jsx
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        nomor_surat: "",
        nama_surat: "",
        asal_surat: "",
        tanggal_surat: new Date().toISOString().slice(0, 10),
        pdf_file: null,
    });

    function submit(e) {
        e.preventDefault();
        post(route("surat-masuk.store"));
    }

    return (
        <AppLayout header="Arsipkan Surat Masuk Baru">
            <Head title="Arsipkan Surat Masuk" />

            <form onSubmit={submit}>
                <div className="grid">
                    <label>
                        Nomor Surat
                        <input
                            type="text"
                            value={data.nomor_surat}
                            onChange={(e) =>
                                setData("nomor_surat", e.target.value)
                            }
                        />
                        {errors.nomor_surat && (
                            <small style={{ color: "var(--pico-invalid)" }}>
                                {errors.nomor_surat}
                            </small>
                        )}
                    </label>
                    <label>
                        Asal Surat (Pengirim)
                        <input
                            type="text"
                            value={data.asal_surat}
                            onChange={(e) =>
                                setData("asal_surat", e.target.value)
                            }
                        />
                        {errors.asal_surat && (
                            <small style={{ color: "var(--pico-invalid)" }}>
                                {errors.asal_surat}
                            </small>
                        )}
                    </label>
                </div>
                <label>
                    Nama / Perihal Surat
                    <input
                        type="text"
                        value={data.nama_surat}
                        onChange={(e) => setData("nama_surat", e.target.value)}
                    />
                    {errors.nama_surat && (
                        <small style={{ color: "var(--pico-invalid)" }}>
                            {errors.nama_surat}
                        </small>
                    )}
                </label>
                <label>
                    Tanggal Surat
                    <input
                        type="date"
                        value={data.tanggal_surat}
                        onChange={(e) =>
                            setData("tanggal_surat", e.target.value)
                        }
                    />
                    {errors.tanggal_surat && (
                        <small style={{ color: "var(--pico-invalid)" }}>
                            {errors.tanggal_surat}
                        </small>
                    )}
                </label>
                <label>
                    Upload File PDF (Opsional)
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setData("pdf_file", e.target.files[0])}
                    />
                    {errors.pdf_file && (
                        <small style={{ color: "var(--pico-invalid)" }}>
                            {errors.pdf_file}
                        </small>
                    )}
                </label>

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
                        Save
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
