const updateImage = (selected, params) => {
  const tempArray = selected;

  const index = selected.findIndex(
    (image) => image.image.uuid === params.image.uuid
  );

  tempArray.splice(index, 1, { image: params.image, liked: params.liked });

  return tempArray;
};

const formattedDate = (created, edited) => {
  const creationDate =
    created !== null &&
    created.toDate().toLocaleString("en-GB");
  const updated =
    edited !== null &&
    edited.toDate().toLocaleString("en-GB")

  return [creationDate, updated]; 
};

export { updateImage, formattedDate };
