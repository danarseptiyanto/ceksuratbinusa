// resources/js/Pages/Surat/QRDownload.jsx
import { useRef } from "react";
import QRCode from "react-qr-code";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function QRDownload({ slug }) {
    const appUrl = import.meta.env.VITE_APP_URL || "http://localhost:8000";
    const qrValue = `${appUrl}/verify/${slug}`;
    const qrRef = useRef(null);

    const drawAndDownload = async (pngDataUrl) => {
        // Create canvas and draw combined layout (logo + text + qr)
        const scale = 2;
        const qrSize = 100 * scale;
        const padding = 15 * scale;
        const textFontSize = 15 * scale;
        const logoHeight = 35 * scale;
        const gap = 40 * scale;
        const textAreaWidth = 220 * scale;
        const contentHeight = logoHeight + 2 * (textFontSize + 6 * scale);
        const contentHeightTotal = Math.max(contentHeight, qrSize);

        const canvas = document.createElement("canvas");
        canvas.width = textAreaWidth + qrSize + gap + padding * 2;
        canvas.height = contentHeightTotal + padding * 2;
        const ctx = canvas.getContext("2d");

        // Background
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Border
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2 * scale;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        const leftX = padding;
        const topY = padding;

        const logoImg = new Image();
        // ensure same-origin path; if you use a CDN check CORS headers
        logoImg.src = "/img/logosekolah.png";

        const qrImg = new Image();
        qrImg.src = pngDataUrl;

        await new Promise((res, rej) => {
            let loaded = 0;
            const tryDone = () => {
                loaded += 1;
                if (loaded === 2) res();
            };
            logoImg.onload = tryDone;
            logoImg.onerror = (e) => {
                console.warn(
                    "Logo failed to load, continuing without logo.",
                    e,
                );
                // continue even if logo fails
                tryDone();
            };
            qrImg.onload = tryDone;
            qrImg.onerror = (e) => {
                console.error("QR image failed to load from png data url", e);
                rej(e);
            };
        });

        // Draw logo if available
        if (logoImg.width && logoImg.height) {
            const logoWidth = (logoImg.width / logoImg.height) * logoHeight;
            ctx.drawImage(logoImg, leftX, topY, logoWidth, logoHeight);
        }

        // text
        ctx.fillStyle = "#000";
        ctx.font = `${textFontSize}px sans-serif`;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        const text1 = "Verifikasi keabsahan surat ini";
        const text2 = "dapat dilakukan melalui QR code ini.";

        const textY = topY + logoHeight + 8 * scale;
        const lineHeight = textFontSize + 6 * scale;

        ctx.fillText(text1, leftX, textY);
        ctx.fillText(text2, leftX, textY + lineHeight);

        // qr on right
        const qrX = leftX + textAreaWidth + gap;
        const qrY = padding + (contentHeightTotal - qrSize) / 2;
        ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

        // download
        const link = document.createElement("a");
        link.download = `${slug}-qr.png`;
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
    };

    const handleDownload = async () => {
        console.log("[QRDownload] starting download for slug:", slug);

        // Try to use 'qrcode' library to get a PNG data URL directly
        try {
            const qrcodeModule = await import("qrcode"); // dynamic import
            if (qrcodeModule && typeof qrcodeModule.toDataURL === "function") {
                console.log("[QRDownload] using qrcode.toDataURL()");
                // options: scale controls final size; adjust as needed
                const pngDataUrl = await qrcodeModule.toDataURL(qrValue, {
                    margin: 1,
                    scale: 8,
                });
                await drawAndDownload(pngDataUrl);
                return;
            }
        } catch (e) {
            // module not present or failed — fallback to svg serialization
            console.warn(
                "[QRDownload] qrcode library not available or failed:",
                e,
            );
        }

        // Fallback: serialize the rendered SVG from react-qr-code (uses ref)
        try {
            const svgContainer = qrRef.current;
            if (!svgContainer) {
                console.error(
                    "[QRDownload] qrRef.current is null — SVG not rendered",
                );
                alert("QR code not ready. Try opening the menu and try again.");
                return;
            }

            const svg = svgContainer.querySelector("svg");
            if (!svg) {
                console.error("[QRDownload] no <svg> inside qrRef");
                alert("QR code not found. Try opening the menu and try again.");
                return;
            }

            // Ensure xmlns exists (some react SVGs don't include it)
            if (!svg.getAttribute("xmlns")) {
                svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            }

            const serializer = new XMLSerializer();
            let svgStr = serializer.serializeToString(svg);

            // Fix for potential characters that btoa can't handle
            const encoded = unescape(encodeURIComponent(svgStr));
            const base64 = btoa(encoded);

            const pngDataUrl = "data:image/svg+xml;base64," + base64;

            // The svg->png conversion used earlier relied on creating an Image from svg data.
            // But for better quality we can convert svg to png by creating an image from the svg base64.
            const img = new Image();
            img.src = pngDataUrl;

            await new Promise((res, rej) => {
                img.onload = res;
                img.onerror = (err) => {
                    console.error(
                        "[QRDownload] svg->image conversion failed",
                        err,
                    );
                    rej(err);
                };
            });

            // draw a simple canvas with the QR (no logo/text) then call drawAndDownload using the pngDataUrl
            await drawAndDownload(pngDataUrl);
        } catch (err) {
            console.error("[QRDownload] final fallback failed:", err);
            alert("Gagal mengunduh QR. Cek console untuk detail.");
        }
    };

    return (
        <div>
            {/* Hidden per-row QR (accessible by ref). Keep it outside any portal if possible. */}
            <div ref={qrRef} className="hidden" aria-hidden>
                <QRCode value={qrValue} size={100} />
            </div>

            {/* Dropdown menu item */}
            <DropdownMenuItem
                onClick={(e) => {
                    e.preventDefault();
                    handleDownload();
                }}
                className="w-full cursor-pointer"
            >
                Download QR
            </DropdownMenuItem>
        </div>
    );
}
