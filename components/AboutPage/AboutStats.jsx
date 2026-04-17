 "use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./about.module.css";

export default function AboutStats({ stats }) {
  const statsData = useMemo(() => {
    if (Array.isArray(stats) && stats.length > 0) return stats;
    return [
      { id: "years", number: "12+", label: "GLORIOUS YEARS" },
      { id: "clients", number: "36+", label: "HAPPY CLIENTS" },
      { id: "projects", number: "58+", label: "PROJECTS COMPLETE" },
      { id: "advisor", number: "24+", label: "TEAM ADVISOR" },
      { id: "sales", number: "47+", label: "PRODUCTS SALE" },
    ];
  }, [stats]);

  const sectionRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const [inView, setInView] = useState(false);

  const initialValues = useMemo(
    () =>
      statsData.map((item) => ({
        id: item.id || item.label,
        value: 0,
      })),
    [statsData]
  );

  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    setValues(initialValues);
    hasAnimatedRef.current = false;
  }, [initialValues]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sectionRef.current) return;

    const node = sectionRef.current;

    const startAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      statsData.forEach((item, index) => {
        const id = item.id || item.label;
        const raw = String(item.number ?? "");
        const digits = parseInt(raw.replace(/\D/g, "")) || 0;

        const delay = index * 200;
        const duration = 1000;

        window.setTimeout(() => {
          const start = performance.now();

          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const current = Math.round(progress * digits);

            setValues((prev) =>
              prev.map((v) => (v.id === id ? { ...v, value: current } : v))
            );

            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }, delay);
      });
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting) {
            setInView(true);
            startAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.25 }
      );

      observer.observe(node);
      return () => observer.disconnect();
    }

    setInView(true);
    startAnimation();
  }, [statsData]);

  return (
    <section
      ref={sectionRef}
      className={`${styles.statsWrapper} ${inView ? styles.statsInView : ""}`}
    >
      {statsData.map((item, index) => {
        const id = item.id || item.label;
        const raw = String(item.number ?? "");
        const suffix = raw.replace(/[0-9]/g, "");
        const stored = values.find((v) => v.id === id);
        const displayNumber =
          stored && stored.value > 0
            ? `${stored.value}${suffix}`
            : item.number;

        return (
          <motion.div 
            key={id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
          >
            <div className={styles.statItemNumber}>{displayNumber}</div>
            <div className={styles.statItemLabel}>{item.label}</div>
          </motion.div>
        );
      })}
    </section>
  );
}

