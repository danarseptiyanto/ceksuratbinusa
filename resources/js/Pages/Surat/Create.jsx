// resources/js/Pages/Surat/Create.jsx
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create({ suggestedNumber }) {
    const { data, setData, post, errors, processing } = useForm({
        nomor_surat: suggestedNumber,
        nama_surat: "",
        tanggal_surat: new Date().toISOString().slice(0, 10), // Today's date
        pdf_file: null,
    });

    function submit(e) {
        e.preventDefault();
        post(route("surat.store"));
    }

    return (
        <AppLayout header="Tambah Nomor Surat Baru">
            <Head title="Tambah Surat" />

            <form onSubmit={submit}>
                <label htmlFor="nomor_surat">
                    Nomor Surat
                    <input
                        id="nomor_surat"
                        type="text"
                        value={data.nomor_surat}
                        onChange={(e) => setData("nomor_surat", e.target.value)}
                    />
                    {errors.nomor_surat && <div>{errors.nomor_surat}</div>}
                </label>

                <label htmlFor="nama_surat">
                    Nama/Perihal Surat
                    <input
                        id="nama_surat"
                        type="text"
                        value={data.nama_surat}
                        onChange={(e) => setData("nama_surat", e.target.value)}
                    />
                    {errors.nama_surat && <div>{errors.nama_surat}</div>}
                </label>

                <label htmlFor="tanggal_surat">
                    Tanggal Surat
                    <input
                        id="tanggal_surat"
                        type="date"
                        value={data.tanggal_surat}
                        onChange={(e) =>
                            setData("tanggal_surat", e.target.value)
                        }
                    />
                    {errors.tanggal_surat && <div>{errors.tanggal_surat}</div>}
                </label>

                <label htmlFor="pdf_file">
                    Upload PDF (Optional)
                    <input
                        id="pdf_file"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setData("pdf_file", e.target.files[0])}
                    />
                    {errors.pdf_file && <div>{errors.pdf_file}</div>}
                </label>

                <div style={{ display: "flex", gap: "1rem" }}>
                    <button type="submit" disabled={processing}>
                        Save
                    </button>
                    <Link
                        href={route("surat.index")}
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
