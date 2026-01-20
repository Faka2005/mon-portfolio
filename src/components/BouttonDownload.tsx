type DownloadButtonProps = {
  filePath: string;
  fileName?: string; // facultatif
};
export default function DownloadButton ({fileName ,filePath}:DownloadButtonProps)  {
  const handleDownload = () => {
    // Crée un lien temporaire
    const link = document.createElement("a");
    link.href = filePath;

    // Définit le nom du fichier téléchargé si fourni
    if (fileName) {
      link.download = fileName;
    } else {
      // Sinon prend le nom du fichier depuis le chemin
      const segments = filePath.split("/");
      link.download = segments[segments.length - 1];
    }

    // Clique programmatique pour lancer le téléchargement
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Télécharger
    </button>
  );
};

