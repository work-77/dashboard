export default function Page({ params }: { params: { reservationsId: string } }) {
    const { reservationsId } = params;
    return (
      <div>
        <h1> {reservationsId}</h1>
        <p>Dynamic metadata is generated based on this post.</p>
      </div>
    );
  }
