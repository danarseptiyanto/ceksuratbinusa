import { useRef } from "react";
import QRCode from "react-qr-code";

export default function QRDownload({ slug }) {
    const appUrl = import.meta.env.VITE_APP_URL || "http://localhost:8000";
    const qrValue = `${appUrl}/${slug}`;

    const handleDownload = () => {
        const svg = document.getElementById("qr-code-svg");
        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        // Layout sizing
        const qrSize = 100; // smaller QR for a neat layout
        const padding = 20;
        const textFontSize = 15;

        // Make the image rectangular (wider than tall)
        const textAreaWidth = 300;
        canvas.width = textAreaWidth + qrSize + padding * 3;
        canvas.height = qrSize + padding * 2;

        img.onload = () => {
            // Background
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Border
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 1;
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            // Text area (left)
            ctx.fillStyle = "#000";
            ctx.font = `${textFontSize}px sans-serif`;
            ctx.textAlign = "left";
            ctx.textBaseline = "top";

            const text1 = "Dokumen Asli Sekolah, verifikasi keabsahan:";
            const text2 = qrValue;

            // Text wrapping area
            const textX = padding;
            const textY = padding + 5;
            const lineHeight = textFontSize + 6;

            ctx.fillText(text1, textX, textY);
            ctx.fillText(text2, textX, textY + lineHeight);

            // QR code on the right
            const qrX = textAreaWidth + padding * 2;
            const qrY = padding;
            ctx.drawImage(img, qrX, qrY, qrSize, qrSize);

            // Download
            const link = document.createElement("a");
            link.download = `${slug}-qr.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        };

        // Convert SVG to base64 for drawing
        img.src =
            "data:image/svg+xml;base64," +
            btoa(unescape(encodeURIComponent(svgStr)));
    };

    return (
        <div className="flex flex-col items-center space-y-3">
            <QRCode id="qr-code-svg" value={qrValue} size={100} />
            <button
                onClick={handleDownload}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Download QR Code Image
            </button>
        </div>
    );
}
