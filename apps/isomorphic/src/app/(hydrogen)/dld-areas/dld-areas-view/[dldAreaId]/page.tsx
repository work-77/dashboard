export default function Page({ params }: { params: { dldAreaId: string } }) {
    const { dldAreaId } = params;
    return (
        <div>
            <h1> {dldAreaId}</h1>
            <p>Dynamic metadata is generated based on this post.</p>
        </div>
    );
}
