export default function Page({ params }: { params: { featuresId: string } }) {
    const { featuresId } = params;
    return (
      <div>
        <h1> {featuresId}</h1>
        <p>Dynamic metadata is generated based on this post.</p>
      </div>
    );
  }