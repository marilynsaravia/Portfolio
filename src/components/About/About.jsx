import React from "react";

import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>Sobre mí</h2>
      <div className={styles.content}>
        <img
          src={getImageUrl("about/memoji.png")}
          alt="Me sitting with a laptop"
          className={styles.aboutImage}
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="Cursor icon" />
            <div className={styles.aboutItemText}>
              <h3>Frontend Developer</h3>
              <p>
              Soy profesional en desarrollo frontend con experiencia en la creación de sitios web optimizados y adaptables.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="Server icon" />
            <div className={styles.aboutItemText}>
              <h3>Backend Developer</h3>
              <p>
              Tengo experiencia en el desarrollo de sistemas backend eficientes y seguros, con un enfoque en PHP y SQL
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="UI icon" />
            <div className={styles.aboutItemText}>
              <h3>UI/UX Designer</h3>
              <p>
              Tengo experiencia en el diseño de interfaces de usuario y en la creación de sistemas de diseño para mejorar la experiencia del usuario en proyectos digitales.              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
