export default function Page({ params }: { params: { locationsId: string } }) {
    const { locationsId } = params;
    return (
        <div>
            <h1> {locationsId}</h1>
            <p>Dynamic metadata is generated based on this post.</p>
        </div>
    );
}
