import { browser } from "$app/environment";
import { BSON } from "bson";
import type { DocumentFile } from "../document/document";
import { currentDocumentStore } from "../stores/documentStore";
import Document from "../document/document";

export default function readLocalFile() {
  if (browser) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.ted';
    input.onchange = (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (!files) return

      const file = files[0];

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        const data = BSON.deserialize(new Uint8Array(result as ArrayBuffer)) as DocumentFile


        if (!(data.uuid && data.width && data.height && data.frames && data.frames.length && data.frames[0].length)) {
          console.error('Invalid file')
          return
        }

        const newDoc = new Document(data.width, data.height, data.frames[0].length, data.frames.length)
        newDoc.frames.frames.forEach((row, y) => {
          row.forEach((frame, x) => {
            frame.data = new Uint8Array(data.frames[y][x].buffer)
          })
        })
        newDoc.uuid = data.uuid

        currentDocumentStore.set(newDoc)
      };
      reader.readAsArrayBuffer(file);

    };
    input.click();
  }
}
