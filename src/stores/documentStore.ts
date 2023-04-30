import { writable } from 'svelte/store';
import Document from '../document/document';

export const currentDocumentStore = writable(new Document(16, 16, 1, 1));
