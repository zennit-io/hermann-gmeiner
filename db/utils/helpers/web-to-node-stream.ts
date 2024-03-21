import { Readable } from "stream";

export const webToNodeStream = (webStream: ReadableStream): Readable => {
  const reader = webStream.getReader();
  return new Readable({
    async read() {
      const result = await reader.read();
      if (result.done) {
        this.push(null);
      } else {
        this.push(new Uint8Array(result.value));
      }
    },
  });
};
