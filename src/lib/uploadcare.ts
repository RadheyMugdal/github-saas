import { uploadDirect } from "@uploadcare/upload-client";
export const uploadFile = async (
  file: File,
  setProgress: (progress: number) => void,
) => {
  const response = await uploadDirect(file, {
    publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string,
    store: "auto",
    onProgress: (info: any) => {
      setProgress(Math.ceil(info.value * 100));
    },
  });
  return response.cdnUrl;
};
