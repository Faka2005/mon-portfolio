type DownloadButtonProps = {
  filePath: string;
  fileName: string;
  color : "red" | "blue" | "green";
};



export default function DownloadButton({
  fileName,
  filePath,
  color = "blue",
}: DownloadButtonProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName ?? filePath.split("/").pop()!;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      style={{ backgroundColor: color }}
      className="px-4 py-2 text-white rounded"
    >
      Télécharger
    </button>
  );
}
