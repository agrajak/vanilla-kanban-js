export function parseNoteText(value) {
  const text = value.split('\n');
  const title = text[0];
  text.shift(0);
  const content = text.join('\n');
  return {
    title, content,
  };
}
