// Use to parse response of api unit test
async function readableStreamToString(readableStream: ReadableStream | null) {
  const reader = readableStream!.getReader();
  let result = '';
  let done = false;

  while (!done) {
    const { value, done: readDone } = await reader.read();
    if (readDone) {
      done = true;
    } else {
      result += new TextDecoder().decode(value);
    }
  }

  return JSON.parse(result);
}

export default readableStreamToString;
