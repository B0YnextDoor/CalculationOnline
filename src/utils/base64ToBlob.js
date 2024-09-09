export function base64toBlob(base64) {
  const base64WithoutHeader = base64.split(",")[1]; // remove the MIME type declaration
  const byteCharacters = atob(base64WithoutHeader);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: "application/dxf" });
}
