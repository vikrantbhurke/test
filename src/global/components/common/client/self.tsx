"use client";

type SelfProps = {
  idOne: string;
  idTwo: string;
  children: React.ReactNode;
};

export default function Self({ idOne, idTwo, children }: SelfProps) {
  if (!idOne) return null;
  if (idOne !== idTwo) return null;
  if (idOne === idTwo) return children;
}
