import QRCode from "react-qr-code";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function QRDownload({ slug }) {
    const appUrl = import.meta.env.VITE_APP_URL || "http://localhost:8000";
    const qrValue = `${appUrl}/verify/${slug}`;

    const handleDownload = () => {
        const svg = document.getElementById("qr-code-svg");
        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svg);

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // === Layout Settings ===
        const scale = 2; // higher scale = sharp image
        const qrSize = 100 * scale;
        const padding = 15 * scale;
        const textFontSize = 15 * scale;
        const logoHeight = 35 * scale;
        const gap = 40 * scale;

        // Set balanced size
        const textAreaWidth = 220 * scale;
        const contentHeight = logoHeight + 2 * (textFontSize + 6 * scale);
        const contentHeightTotal = Math.max(contentHeight, qrSize);

        canvas.width = textAreaWidth + qrSize + gap + padding * 2;
        canvas.height = contentHeightTotal + padding * 2;

        const qrImg = new Image();
        const logoImg = new Image();
        logoImg.src = "/img/logosekolah.png";

        qrImg.onload = () => {
            logoImg.onload = () => {
                // === Background ===
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // === Border ===
                ctx.strokeStyle = "#000";
                ctx.lineWidth = 2 * scale;
                ctx.strokeRect(0, 0, canvas.width, canvas.height);

                // === Left Column (Logo + Text) ===
                const leftX = padding;
                const topY = padding;

                // Logo
                const logoWidth = (logoImg.width / logoImg.height) * logoHeight;
                ctx.drawImage(logoImg, leftX, topY, logoWidth, logoHeight);

                // Text
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

                // === QR on Right ===
                const qrX = leftX + textAreaWidth + gap;
                const qrY = padding + (contentHeightTotal - qrSize) / 2; // center vertically

                ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

                // === Download ===
                const link = document.createElement("a");
                link.download = `${slug}-qr.png`;
                link.href = canvas.toDataURL("image/png", 1.0);
                link.click();
            };
        };

        qrImg.src =
            "data:image/svg+xml;base64," +
            btoa(unescape(encodeURIComponent(svgStr)));
    };

    return (
        <div>
            <QRCode
                id="qr-code-svg"
                className="hidden"
                value={qrValue}
                size={100}
            />
            <DropdownMenuItem className="cursor-pointer w-full" asChild>
                <button onClick={handleDownload}>Download QR</button>
            </DropdownMenuItem>
        </div>
    );
}
