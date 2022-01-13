import { useState, useMemo } from "react";
import { updateImage } from "../utils/helpers.js";

const useSelect = () => {
  const [step, setStep] = useState(1);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(null);


  useMemo(() => {
    if (selected) {
      const totVal = selected.filter((item) => item.liked === true).length;
      setTotal(totVal);
    }
  }, [selected]);

  const handleSelectedImage = (params) => {


    setSelected((prev) => {
      if (!prev) {
        return [params];
      }

      return [...prev, { image: params.image, liked: params.liked }];
    });
  };

  const editImage = (item) => {
    const params = { image: item.image, liked: !item.liked, edited: true };
    const modifiedArray = updateImage(selected, params);
    setSelected([...modifiedArray]);
  };

  const nextStep = (step) => {
    setStep(step);
  }; 
  
  // reset users selecting flow.
  const resetSelection = () => {
    nextStep(1)
    setSelected(null)

  }

  return { step, nextStep, total, selected, handleSelectedImage, editImage, resetSelection };
};

export default useSelect;
