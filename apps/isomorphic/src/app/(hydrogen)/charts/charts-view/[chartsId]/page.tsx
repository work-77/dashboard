export default function Page({ params }: { params: { chartsId: string } }) {
    const { chartsId } = params;
    return (
        <div>
            <h1> {chartsId}</h1>
            <p>Dynamic metadata is generated based on this post.</p>
        </div>
    );
}
