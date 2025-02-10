export default function Page({ params }: { params: { projectsId: string } }) {
    const { projectsId } = params;
    return (
      <div>
        <h1> {projectsId}</h1>
        <p>Dynamic metadata is generated based on this post.</p>
      </div>
    );
  }