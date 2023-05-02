import { get } from "svelte/store";
import { currentDocumentStore } from "../stores/documentStore";
import { currentFrameStore } from "../stores/currentFrameStore";

export function undo() {
  currentDocumentStore.update(document => {
    const { x, y } = get(currentFrameStore)
    const frame = document.frames.frames[y][x]
    const prev = frame.undoStates.remove()

    if (prev) {
      frame.redoStates.add(frame.data)
      frame.data = prev
    }

      return document
  })
}
