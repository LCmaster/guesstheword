// place files you want to import through the `$lib` alias in this folder.
export function getLocalStorageOrElse(itemName: string, orElse: any) {
  return typeof window !== "undefined"
    ? localStorage.getItem(itemName) ?? orElse
    : orElse;
}

export function setLocalStorageItem(itemName: string, value: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(itemName, value);
  }
}
