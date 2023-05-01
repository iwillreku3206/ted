export default function uniqueIdentifier(name: string) {
  return `${name}-${crypto.randomUUID()}`;
}
