export default function Page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  return (
    <div>
      <h1> {userId}</h1>
      <p>Dynamic metadata is generated based on this post.</p>
    </div>
  );
}
