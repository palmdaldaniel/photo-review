const updateImage = (selected, params) => {
  const tempArray = selected;

  const index = selected.findIndex(
    (image) => image.image.uuid === params.image.uuid
  );

  tempArray.splice(index, 1, { image: params.image, liked: params.liked });

  return tempArray;
};

export { updateImage };
