export const getPublicIdForCloudinary = (file) => {
  if (file) {
    const splitted = file?.split("/");
    const publicCombine = `${splitted[7]}/${splitted[8]}`;
    const publicId = publicCombine.replace(".png", "");

    return publicId;
  }
  return "";
};
