import { browser } from "$app/environment";

export default function downloadFile(content: string | Uint8Array, filename: string, contentType: string) {
  if (browser) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);

  }
}
