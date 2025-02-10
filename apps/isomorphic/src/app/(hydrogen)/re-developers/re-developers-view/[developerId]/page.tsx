export default function Page({ params }: { params: { developerId: string } }) {
  const { developerId } = params;
  return (
    <div>
      <h1> {developerId}</h1>
      <p>Dynamic metadata is generated based on this post.</p>
    </div>
  );
}