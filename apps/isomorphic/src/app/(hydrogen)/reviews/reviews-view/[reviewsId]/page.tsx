export default function Page({ params }: { params: { reviewsId: string } }) {
    const { reviewsId } = params;
    return (
      <div>
        <h1> {reviewsId}</h1>
        <p>Dynamic metadata is generated based on this post.</p>
      </div>
    );
  }
