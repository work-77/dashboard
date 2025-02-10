export default function Page({ params }: { params: { mileStonesId: string } }) {
    const { mileStonesId } = params;
    return (
      <div>
        <h1> {mileStonesId}</h1>
        <p>Dynamic metadata is generated based on this post.</p>
      </div>
    );
  }
