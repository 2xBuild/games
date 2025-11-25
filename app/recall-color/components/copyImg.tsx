"use client"
import { useRef, useState } from "react";
import html2canvas from "html2canvas";

interface CopyImageProps {
    score: number;
    onClose?: () => void;
}

export default function CopyImage({ score, onClose }: CopyImageProps) {
    const reportRef = useRef<HTMLDivElement>(null);
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
    const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloaded'>('idle');

    const copyImageToClipboard = async () => {
        if (!reportRef.current) return;

        try {
            // Convert the report div to canvas
            const canvas = await html2canvas(reportRef.current, {
                backgroundColor: null,
                scale: 2, // Higher quality
            });

            // Convert canvas to blob using Promise
            const blob = await new Promise<Blob | null>((resolve) => {
                canvas.toBlob(resolve, "image/png");
            });

            if (!blob) {
                alert("Failed to generate image");
                return;
            }

            // Check if clipboard API is available
            if (!navigator.clipboard || !navigator.clipboard.write) {
                alert("Clipboard API not supported in this browser. Please try downloading instead.");
                return;
            }

            try {
                // Copy to clipboard using Clipboard API
                await navigator.clipboard.write([
                    new ClipboardItem({
                        "image/png": blob,
                    }),
                ]);

                // Update button text to "Copied!"
                setCopyStatus('copied');
                setTimeout(() => setCopyStatus('idle'), 2000);
            } catch (err) {
                console.error("Failed to copy image:", err);
                alert(`Failed to copy to clipboard: ${err instanceof Error ? err.message : 'Unknown error'}`);
            }
        } catch (error) {
            console.error("Error generating image:", error);
            alert(`Error generating report image: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };



    const downloadImage = async () => {
        if (!reportRef.current) return;

        try {
            const canvas = await html2canvas(reportRef.current, {
                backgroundColor: null,
                scale: 2,
            });

            // Convert to download link
            const dataUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = `color-game-report-${score}.png`;
            link.href = dataUrl;

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Update button text to "Downloaded!"
            setDownloadStatus('downloaded');
            setTimeout(() => setDownloadStatus('idle'), 2000);
        } catch (error) {
            console.error("Error downloading image:", error);
            alert(`Error downloading report image: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 max-w-md w-full mx-4">
                {/* Report Content - This will be captured */}
                <div
                    ref={reportRef}
                    className="p-8 rounded-lg mb-4"
                    style={{
                        backgroundColor: 'transparent',
                        color: '#ffffff',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        width: '400px',
                        maxWidth: '100%',
                        margin: '0 auto',
                        boxSizing: 'border-box'
                    }}
                >
                    <h1
                        className="text-4xl font-mono font-bold text-center mb-6"
                        style={{ color: '#ffffff', margin: '0 0 24px 0' }}
                    >
                        Game Summary
                    </h1>
                    <div
                        className="rounded-lg p-6"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            margin: '0'
                        }}
                    >
                        <div style={{ textAlign: 'center' }}>
                            <p
                                className="text-sm mb-2 font-mono"
                                style={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    margin: '0 0 12px 0',
                                    fontSize: '14px'
                                }}
                            >
                                Final Score
                            </p>
                            <p
                                className="text-6xl font-bold font-mono"
                                style={{
                                    color: '#ffffff',
                                    margin: '0 0 40px 0',
                                    fontSize: '72px',
                                    lineHeight: '1',
                                    fontWeight: 'bold'
                                }}
                            >
                                {score}
                            </p>
                            <div
                                style={{
                                    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                                    paddingTop: '16px',
                                    marginTop: '0'
                                }}
                            >
                                <p
                                    className="text-sm font-mono"
                                    style={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        margin: '0',
                                        fontSize: '14px',
                                        lineHeight: '1.5'
                                    }}
                                >
                                    {score === 0 && "Better luck next time! "}
                                    {score > 0 && score <= 3 && "Good start! Keep practicing! "}
                                    {score > 3 && score <= 7 && "Great job! You're getting better! "}
                                    {score > 7 && score <= 15 && "Excellent! Amazing memory! "}
                                    {score > 15 && "Legendary! You're a master! "}
                                </p>
                            </div>
                        </div>
                    </div>
                    <p
                        className="text-xs text-center mt-4 font-mono"
                        style={{
                            color: 'rgba(255, 255, 255, 0.5)',
                            margin: '16px 0 0 0',
                            fontSize: '12px',
                            textAlign: 'center'
                        }}
                    >
                        recall-color • {new Date().toLocaleTimeString()}
                        {/* Time is added to make summary potentially unique. */}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                    <button
                        onClick={copyImageToClipboard}
                        disabled={copyStatus === 'copied'}
                        className={`flex-1 px-4 py-3 font-mono rounded-lg border text-white shadow-lg transition-all duration-200 ${copyStatus === 'copied'
                                ? 'bg-green-600 border-green-500 cursor-default'
                                : 'bg-white/5 hover:bg-white/10 hover:border-white/30 border-white/20'
                            }`}
                    >
                        {copyStatus === 'copied' ? 'Copied!' : 'Copy Image'}
                    </button>
                    <button
                        onClick={downloadImage}
                        disabled={downloadStatus === 'downloaded'}
                        className={`flex-1 px-4 py-3 font-mono rounded-lg border text-white shadow-lg transition-all duration-200 ${downloadStatus === 'downloaded'
                                ? 'bg-green-600 border-green-500 cursor-default'
                                : 'bg-white/5 hover:bg-white/10 hover:border-white/30 border-white/20'
                            }`}
                    >
                        {downloadStatus === 'downloaded' ? 'Downloaded!' : 'Download'}
                    </button>
                </div>

                {onClose && (
                    <button
                        onClick={onClose}
                        className="w-full mt-3 px-4 py-2 font-mono rounded-lg border text-white bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition"
                    >
                        Close
                    </button>
                )}
            </div>
        </div>
    );
}
