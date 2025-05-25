"use client";

import React from "react";
import { motion } from "framer-motion";

interface StepProps {
  active?: boolean;
  completed?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Step({ active, completed, onClick, children }: StepProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex h-8 w-8 items-center justify-center rounded-full border 
        ${
          completed
            ? "bg-green-500 text-white"
            : active
            ? "bg-blue-500 text-white"
            : "bg-gray-200"
        }
        hover:opacity-80
      `}>
      {children}
    </button>
  );
}

interface StepsProps {
  children: React.ReactNode;
}

export function Steps({ children }: StepsProps) {
  return (
    <div className='relative flex items-center gap-4 px-4'>
      {/* Barra de fondo */}
      <div className='absolute inset-0 flex items-center'>
        <div className='h-0.5 w-full bg-gray-200' />
      </div>
      {/* Barra animada: la pintaremos desde el Stepper padre */}
      {children}
    </div>
  );
}
