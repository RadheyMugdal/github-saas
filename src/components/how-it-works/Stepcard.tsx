"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

type Step = {
  index: number;
  title: string;
  description: string;
  image: string;
};

interface Props {
  step: Step;
}

const StepCard = ({ step: { index, title, description, image } }: Props) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });
  const leftx = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const rightX = useTransform(scrollYProgress, [0, 1], [200, 0]);
  return (
    <div ref={ref} className="flex flex-col items-center gap-20 lg:flex-row">
      <motion.div
        style={{
          x: index % 2 == 1 ? rightX : leftx,
        }}
        className={`lg:w-1/2 ${index % 2 === 1 ? "lg:order-2" : ""}`}
      >
        <div className="mx-auto max-w-md lg:mx-0">
          <div className="mb-4 flex items-center gap-4">
            {index % 2 === 0 ? (
              <div className="flex items-center justify-center gap-2">
                <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full font-bold">
                  {index}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full font-bold">
                  {index}
                </div>
              </div>
            )}
          </div>
          <h3 className="mb-3 text-lg font-bold md:text-2xl">{title}</h3>
          <p className="md:text-md text-sm opacity-80">{description}</p>
        </div>
      </motion.div>

      <motion.div
        style={{
          x: index % 2 == 1 ? leftx : rightX,
          // opacity,
        }}
        className={`lg:w-1/2 ${index % 2 === 1 ? "lg:order-1" : ""}`}
      >
        <div
          className={`flex h-64 max-w-md items-center justify-center rounded-xl border border-slate-100 bg-slate-50`}
        >
          <Image
            src={image}
            alt={title}
            className="h-full w-full"
            width={1024}
            height={1024}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default StepCard;
