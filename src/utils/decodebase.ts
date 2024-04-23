function decodeBase64(encoded:any) {
    const decoded = atob(encoded);  // Decode base64
    const bytes = new Uint8Array(decoded.length);
    for (let i = 0; i < decoded.length; i++) {
        bytes[i] = decoded.charCodeAt(i);
    }
    const text = new TextDecoder('utf-8').decode(bytes);
    return text;
}

export default decodeBase64