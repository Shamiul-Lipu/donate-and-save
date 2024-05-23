const maleImageArray = [
  "https://i.ibb.co/G7vqqFh/male1.png",
  "https://i.ibb.co/6RXpYkK/male2.png",
  "https://i.ibb.co/2qqr32h/male3.png",
  "https://i.ibb.co/Zxhyj9H/male4.png",
];

const femaleImageArray = [
  "https://i.ibb.co/ph9Pqxr/female1.png",
  "https://i.ibb.co/5TQBjnV/female2.png",
  "https://i.ibb.co/LR06zty/female3.png",
  "https://i.ibb.co/jDrr3hV/female4.png",
];

export const getRandomImageLink = (gender: string) => {
  let imageArray;

  if (gender === "male") {
    imageArray = maleImageArray;
  } else if (gender === "female") {
    imageArray = femaleImageArray;
  } else {
    throw new Error("Invalid gender specified. Please use 'male' or 'female'.");
  }

  const randomIndex = Math.floor(Math.random() * imageArray.length);
  return imageArray[randomIndex];
};
