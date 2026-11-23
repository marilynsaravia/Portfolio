export const getImageNavbar = (imageName) => {
  return new URL(`../assets/Navbar/${imageName}`, import.meta.url).href;
}

export const getImageHero = (imageName) => {
  return new URL(`../assets/Hero/${imageName}`, import.meta.url).href;
}

export const getImageSkills = (imageName) => {
  return new URL(`../assets/Skills/${imageName}`, import.meta.url).href;
}

export const getImageAbout = (imageName) => {
  return new URL(`../assets/About/${imageName}`, import.meta.url).href;
}

export const getImageExperience = (imageName) => {
  return new URL(`../assets/Experience/${imageName}`, import.meta.url).href;
}

export const getImageProjects = (imageName) => {
  return new URL(`../assets/Projects/${imageName}`, import.meta.url).href;
}

export const getImageContact = (imageName) => {
  return new URL(`../assets/Contact/${imageName}`, import.meta.url).href;
}