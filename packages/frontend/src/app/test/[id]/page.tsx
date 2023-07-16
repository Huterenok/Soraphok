interface IdPageProps {
  params: {
    id: string;
  };
}

export default function IdPage({ params }: IdPageProps) {
  return <div>{params.id}</div>;
}
