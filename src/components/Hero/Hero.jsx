import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hola, soy Marilyn</h1>
        <p className={styles.description}>
          Técnico Superior de Desarrollo de Aplicaciones Web
        </p>
        <a href="mailto:goitiasaraviamarilyn@gmail.com" className={styles.contactBtn}>
          Contáctame
        </a>
      </div>
      <img
        src={getImageUrl("hero/me.png")}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
