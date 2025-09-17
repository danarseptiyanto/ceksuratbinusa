// resources/js/Layouts/AppLayout.jsx
import { Link, usePage } from "@inertiajs/react";

export default function AppLayout({ header, children }) {
    const { auth, all_tahun_ajaran, active_tahun_ajaran } = usePage().props;

    const handleTahunAjaranChange = (e) => {
        const newTahunAjaranId = e.target.value;
        // This will make a GET request to a route we will create soon
        window.location.href = route("tahun-ajaran.switch", newTahunAjaranId);
    };

    return (
        <>
            <nav className="container-fluid">
                <ul>
                    <li>
                        <Link href={route("dashboard")}>
                            <strong>🏫 Surat App</strong>
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link href={route("dashboard")}>Dashboard</Link>
                    </li>
                    <li>
                        <Link href={route("profile.edit")}>Profile</Link>
                    </li>
                    <li>
                        <Link href={route("logout")} method="post" as="button">
                            Log Out
                        </Link>
                    </li>
                </ul>
            </nav>

            <main className="container">
                <header
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h1>{header}</h1>
                    {all_tahun_ajaran && (
                        <select
                            value={active_tahun_ajaran?.id || ""}
                            onChange={handleTahunAjaranChange}
                            style={{ maxWidth: "200px" }}
                        >
                            {all_tahun_ajaran.map((ta) => (
                                <option key={ta.id} value={ta.id}>
                                    T.A. {ta.tahun}
                                </option>
                            ))}
                        </select>
                    )}
                </header>
                <article>{children}</article>
            </main>
        </>
    );
}
