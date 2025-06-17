type SelfProps = {
  idOne: string;
  idTwo: string;
  children: React.ReactNode;
};

export default async function Self({ idOne, idTwo, children }: SelfProps) {
  if (!idOne) return null;
  if (idOne !== idTwo) return null;
  if (idOne === idTwo) return children;
}
